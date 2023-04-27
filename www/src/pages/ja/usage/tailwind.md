---
title: Tailwind CSS
description: Tailwind CSSの使い方
layout: ../../../layouts/docs.astro
lang: ja
---

## Tailwind CSS とは何ですか？

Tailwind CSS は、通常の CSS では必要になるコンテキスト切り替え無しで、カスタムデザインを構築するための小さな[ユーティリティファースト](https://tailwindcss.com/docs/utility-first) CSS フレームワークです。純粋な CSS フレームワークであり、あらかじめ構築されたコンポーネントやロジックを提供しません。また、Material UI のようなコンポーネントライブラリと比較して、[全く異なる一連の利点](https://www.youtube.com/watch?v=CQuTF-bkOgc)を提供します。

これにより、以下の例のように、CSS が驚くほど簡単に、素早く書けるようになります：

従来の CSS の場合：

1. CSS を（多くの場合別ファイルで）書く。

```css
.my-class {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  padding: 1rem;
}
```

2. CSS をコンポーネントにインポートする

```jsx
import "./my-class.css";
```

3. HTML にクラス名を追加する

```html
<div class="my-class">...</div>
```

Tailwind で同じことをするとこうなります：

1. HTML にクラス名を書く、以上。

```html
<div
  class="flex flex-col items-center justify-center rounded border border-gray-200 bg-white p-4"
>
  ...
</div>
```

Tailwind CSS は React Components と併用することで、UI を素早く構築するのに究極の威力を発揮します。

Tailwind CSS には美しい組込みのデザインシステムが備わっており、厳選されたカラーパレット、均一なデザインを実現する width/height や padding/margin などのスタイルのサイズのパターン、レスポンシブなレイアウトを作成するためのメディアブレークポイントなどがすぐに使える状態で提供されています。このデザインシステムはカスタマイズや拡張を行うことができ、プロジェクトが必要とするスタイルのツールボックスを正確に作成することができます。

<div class="embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/T-Zv73yZ_QI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Tru Narla better known as [mewtru](https://twitter.com/trunarla) gave an amazing talk on [building a design system using Tailwind CSS](https://www.youtube.com/watch?v=T-Zv73yZ_QI).

[mewtru](https://twitter.com/trunarla)として知られる Tru Narla は、[Tailwind CSS を使ったデザインシステムの構築](https://www.youtube.com/watch?v=T-Zv73yZ_QI)について素晴らしい講演をしました。

## 使用方法

Tailwind の書き味を向上させるために、Tailwind 用のエディタプラグインがインストールされていることを確認してください。

### 拡張機能およびプラグイン

- [VSCode 拡張](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [JetBrains 拡張](https://www.jetbrains.com/help/webstorm/tailwind-css.html#ws_css_tailwind_install)
- [Neovim LSP](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md#tailwindcss)

### 書式設定

Tailwind CSS のクラス名は、少し乱雑になりやすいので、クラス名のフォーマッタは必需品です。[Tailwind CSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) は、出力される css バンドルとクラス名が一致するように、クラス名を[推奨順序](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted)でソートします。CLI で Tailwind を選択すると、これをインストール・設定します。

### 条件付きでクラスを適用する

三項演算子を使った条件分岐を伴うクラス名の追加は、非常に面倒で読みにくいものになります。以下のパッケージは、条件付きロジックを使用する際に、クラス名を整理するのに役立ちます。

- [clsx](https://github.com/lukeed/clsx)
- [classnames](https://github.com/JedWatson/classnames)

## お役立ち情報

| リソース                        | リンク                                                   |
| ------------------------------- | -------------------------------------------------------- |
| Tailwind ドキュメント           | https://tailwindcss.com/docs/editor-setup/               |
| Tailwind チートシート           | https://nerdcave.com/tailwind-cheat-sheet/               |
| awesome-tailwindcss             | https://github.com/aniftyco/awesome-tailwindcss/         |
| Tailwind コミュニティ           | https://github.com/tailwindlabs/tailwindcss/discussions/ |
| Tailwind Discord サーバー       | https://tailwindcss.com/discord/                         |
| TailwindLabs Youtube チャンネル | https://www.youtube.com/tailwindlabs/                    |
| Tailwind プレイグラウンド       | https://play.tailwindcss.com/                            |
