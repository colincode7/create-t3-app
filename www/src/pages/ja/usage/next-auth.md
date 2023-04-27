---
title: NextAuth.js
description: NextAuth.jsの使い方
layout: ../../../layouts/docs.astro
lang: ja
---

Next.js アプリケーションが認証システムを必要とするとき、NextAuth.js は、自分で構築する手間をかけずに、複雑なセキュリティを導入できる優れたソリューションです。NextAuth.js には OAuth 認証をすばやく追加するための豊富なプロバイダーの一覧が付属しており、多くのデータベースや ORM のためのアダプターを提供しています。

## コンテクストプロバイダー

アプリケーションのエントリーポイントでは、アプリケーションが [SessionProvider](https://next-auth.js.org/getting-started/client#sessionprovider)でラップされていることがわかります：

```tsx:pages/_app.tsx
<SessionProvider session={session}>
  <Component {...pageProps} />
</SessionProvider>
```

このコンテキストプロバイダーによって、アプリケーションはセッションデータを props として渡すことなく、アプリケーションのどこからでもアクセスできるようになります：

```tsx:pages/users/[id].tsx
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  if (!session) {
    // Handle unauthenticated state, e.g. render a SignIn component
    return <SignIn />;
  }

  return <p>Welcome {session.user.name}!</p>;
};
```

## サーバーサイドでセッションを取得する

時には、サーバー上でセッションを要求したいこともあるかもしれません。そのためには、`create-t3-app`が提供するヘルパー関数 `getServerAuthSession` を使ってセッションをプリフェッチし、`getServerSideProps` を使ってクライアントに渡します：

```tsx:pages/users/[id].tsx
import { getServerAuthSession } from "../server/auth";
import { type GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  return {
    props: { session },
  };
};

const User = () => {
  const { data: session } = useSession();
  // NOTE: `session` wont have a loading state since it's already prefetched on the server

  ...
}
```

## セッションに `user.id` を含める

Create T3 App は、NextAuth.js の設定にある[session callback](https://next-auth.js.org/configuration/callbacks#session-callback)を利用して、ユーザー ID を`session`オブジェクトに含めるように設定します。

```ts:server/auth.ts
callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
```

これは、`session`オブジェクトにアクセスしたときに `user.id` が型付けされることを確認するために型宣言ファイルと組合せて使用されます。詳細については NextAuth.js のドキュメントにある [`Module Augmentation`](https://next-auth.js.org/getting-started/typescript#module-augmentation) を参照ください。

```ts:server/auth.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}
```

同じパターンを使って、`role`フィールドのような他のデータを`session`オブジェクトに追加することができますが、**クライアントに機密データを保存するために使用してはなりません**。

## tRPC との併用

NextAuth.js を tRPC で利用する場合、[ミドルウェア](https://trpc.io/docs/v10/middlewares) を使って、再利用可能で保護されたプロシージャを作成することができます。これにより、認証されたユーザーのみがアクセスできるプロシージャを作成することができます。`create-t3-app`は、認証されたプロシージャの中でセッションオブジェクトに簡単にアクセスできるように、すべてセットアップしてくれます。

これは、2 段階のプロセスで行われます：

1. [`getServerSession`](https://next-auth.js.org/configuration/nextjs#getServerSession) 関数を使用して、リクエストヘッダーからセッションを取得します。通常の `getSession`の代わりに`getServerSession` を使用する利点は、サーバーサイドのみの関数であるため、不要なフェッチ呼び出しが発生しないことです。`create-t3-app`は、この特殊な API を抽象化するヘルパー関数を作成するので、セッションにアクセスするたびに、NextAuth.js のオプションと`getServerSession` 関数の両方をインポートする必要がありません。

```ts:server/auth.ts
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
```

このヘルパー関数を使って、セッションを取得し、tRPC コンテキストに渡すことができます：

```ts:server/api/trpc.ts
import { getServerAuthSession } from "../auth";

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({
    session,
  });
};
```

2. ユーザーが認証されているかどうかをチェックする tRPC ミドルウェアを作成します。そして、そのミドルウェアを `protectedProcedure` で使用します。これらのプロシージャの呼び出し元はすべて認証されていなければなりません。そうでなければ、エラーが投げられるので、クライアントで適切にエラー処理を行えます。

```ts:server/api/trpc.ts
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);
```

セッションオブジェクトは、ユーザーの軽くて最小限の表現であり、いくつかのフィールドしか含んでいません。`protectedProcedures`を使用するとユーザー id にアクセスでき、データベースからさらにデータを取得するのに使用できます。

```ts:server/api/routers/user.ts
const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),
});
```

## Prisma との併用法

NextAuth.js を Prisma と共に動作させるには、多くの[初期設定](https://authjs.dev/reference/adapter/prisma/)が必要ですが、`create-t3-app` はこのすべてを処理します。`create-t3-app` の実行において Prisma と NextAuth.js の両方を選択すると、必要なモデルがすべて設定された、完全に動作する認証システムを手に入れることができます。初期構成として生成されたアプリケーションには、Discord OAuth プロバイダがあらかじめ設定されています。これを使っているのは一番簡単に始められるからで、`.env`にトークンを設定するだけで準備完了です。しかし、[NextAuth.js ドキュメント](https://next-auth.js.org/providers/) に従えば、簡単に他のプロバイダを追加することもできます。なお、プロバイダによっては、特定のモデルに余分のフィールドを追加しなければならない場合があります。利用したいプロバイダのドキュメントを読んで、必要なフィールドがすべて揃っていることを確認することをお勧めします。

### モデルに新しいフィールドを追加する

`User`、`Account`、`Session`、`VerificationToken`のいずれかのモデルに新しいフィールドを追加する場合（ほとんどの場合、変更する必要があるのは`User`モデルのみです）、[Prisma アダプター](https://next-auth.js.org/adapters/prisma) が新しいユーザーのサインアップやログイン時に自動的にこれらのモデル上にフィールドを作成することを念頭に置いておく必要があります。したがって、これらのモデルに新しいフィールドを追加する場合は、デフォルト値を指定する必要があります。

例えば、`User`モデルに `role` を追加したい場合、`role` フィールドにデフォルト値を指定する必要があります。これは `User` モデルの `role` フィールドに `@default` 値を追加することで実現できます：

```diff:prisma/schema.prisma
+ enum Role {
+   USER
+   ADMIN
+ }

  model User {
    ...
+   role Role @default(USER)
  }
```

## Next.js ミドルウェアを使った利用法

NextAuth.js を Next.js ミドルウェアで利用する場合、認証に [JWT セッション戦略](https://next-auth.js.org/configuration/nextjs#caveats)を利用する必要があります。これは、ミドルウェアが JWT である場合にのみ、セッションクッキーにアクセスすることができるためです。デフォルトでは、Create T3 App は、データベースアダプターとして Prisma と組み合わせて、**default**データベースストラテジーを使用するように構成されています。

## デフォルトの DiscordProvider を設定する

1. [Discord Developer Portal の Application セクション](https://discord.com/developers/applications)に向かい「New Application」をクリックします。
2. 設定メニューの 「OAuth2 ⇒ General」に行きます

- Client ID をコピーして、`.env`の`DISCORD_CLIENT_ID`に貼り付けます。
- Client Secret の下にある 「Reset Secret」をクリックし、その文字列を`.env`の`DISCORD_CLIENT_SECRET`にコピーしてください。このシークレット情報は二度と表示されないことと、リセットすると既存のシークレット情報は失効してしまうことについて注意してください。
- 「Add Redirect」をクリックし、`<app url>/api/auth/callback/discord` を貼り付ける(ローカル開発サーバの場合の例：<code class="break-all">http://localhost:3000/api/auth/callback/discord</code>)
- 変更を保存します
- 開発用と本番用で同じ Discord Application を使用できますが、推奨はしません。また、開発時には[プロバイダをモックする](https://github.com/trpc/trpc/blob/main/examples/next-prisma-websockets-starter/src/pages/api/auth/%5B...nextauth%5D.ts)こと検討するのもよいでしょう。

## お役立ち情報

| リソース                                  | リンク                                  |
| ----------------------------------------- | --------------------------------------- |
| NextAuth.js ドキュメント                  | https://next-auth.js.org/               |
| NextAuth.js GitHub                        | https://github.com/nextauthjs/next-auth |
| tRPC キッチンシンク - NextAuth と併用して | https://kitchen-sink.trpc.io/next-auth  |
