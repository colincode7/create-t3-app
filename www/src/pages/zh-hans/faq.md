---
title: 常见疑问
description: 关于 Create T3 App 的常见疑问
layout: ../../layouts/docs.astro
lang: zh-hans
---

这里罗列了一些关于 Create T3 App 的常见疑问。

## 下一步呢？我怎么通过它制作应用？

我们努力保持这个项目尽可能的简单，这样你就可以通过我们设定的脚手架来开始制作应用，而且可以在之后有需要的时候添入额外的东西。

如果你对项目中的不同技术不熟悉，请参看它们对应的文档。倘若看过文档后你依然有不明白的地方，请加入到我们的 [Discord](https://t3.gg/discord) 来寻求帮助。

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## 现在有哪些关于 T3 Stack 的学习资源可供参考？

尽管以下列出的资源已经是现有关于 T3 Stack 的最好教程了，但社区（和 [Theo](https://youtu.be/rzwaaWH0ksk?t=1436)）依然推荐你直接开始使用它，与此同时你可以在通过它构建应用的过程中来学习。

如果你考虑使用 Create T3 App，很大可能是因为你已经用到了其包含的某些库。所以何不先直接用起来，然后在构建应用的过程中去学习其他陌生的部分？

好吧，现在我们意识到这种方法不一定适用于每个人。所以，倘若你已经尝试了上述方法，却依然想要一些教学资源，或者你对自己不太自信，抑或觉得这个脚手架包含太多东西，一时难以消化，那你可以尝试参考下方一些关于 Create T3 App 的非常棒的教程：

### 文章

- [使用 Create T3 App 来创建一个全栈应用](https://www.nexxel.dev/blog/ct3a-guestbook)
- [初探 Create T3 App](https://dev.to/ajcwebdev/a-first-look-at-create-t3-app-1i8f)
- [将你的 T3 App 迁移到 Turborepo](https://www.jumr.dev/blog/t3-turbo)
- [将 Stripe 集成到你的 T3 App 中](https://blog.nickramkissoon.com/posts/integrate-stripe-t3)

### 视频

- [Jack Herrington - 使用 T3 Stack 创建一个笔记应用](https://www.youtube.com/watch?v=J1gzN1SAhyM)
- [使用 T3 Stack 创建推特克隆应用 - tRPC、Next.js、Prisma、Tailwind & Zod](https://www.youtube.com/watch?v=nzJsYJPCc80)
- [使用 T3 Stack 创建博客应用 - tRPC、TypeScript、Next.js、Prisma & Zod](https://www.youtube.com/watch?v=syEWlxVFUrY)
- [使用 T3 Stack 来创建实时聊天应用 - TypeScript、Tailwind、tRPC](https://www.youtube.com/watch?v=dXRRY37MPuk)
- [ T3 Stack - 我们是如何创建它的](https://www.youtube.com/watch?v=H-FXwnEjSsI)
- [Create T3 App 的概览（Next、Typescript、Tailwind、tRPC、Next-Auth）](https://www.youtube.com/watch?v=VJH8dsPtbeU)

## 项目中为什么会有 `.js` 格式的文件？

正如在 [T3 - 原则第三条](/zh-hans/introduction#类型安全不是可选的) 里所讲到的，我们将类型安全放在首位。不幸的是，并非所有的框架和插件都支持 TypeScript，这也就意味着有一些配置文件必须是 `.js` 格式。

我们想要强调的是，这些文件是 JavaScript 是有原因的，我们通过根据它们所使用的库的支持程度来显式声明每个文件的类型（`cjs` 或 `mjs`）。而且，项目中所有的 `js` 文件也会使用编译器（tsconfig）中的 checkJs 选项进行类型检查。

## 我正努力为我的应用添加多语言功能。有我能够借鉴的吗？

我们已经决定 `create-t3-app` 默认不支持多语言功能，因为这是一个非常 opinionated 的话题，有很多不同的方法来实现它。

然而，如果你觉得实现它很困难，想参考一些项目的话，这里有一个 [参考仓库](https://github.com/juliusmarminge/t3-i18n)，展示了如何可以通过 [next-i18next](https://github.com/i18next/next-i18next) 为 T3 App 提供多语言支持。

## 为什么我们还用 `/pages` 而不是 Next.js 13 新推出的 `/app`？

正如在 [T3-原则第二条](/zh-hans/introduction#负责任地尝鲜) 里提到的，我们热爱新技术，但是也看重稳定性，项目的整个路由不是很容易迁移，而你却在此使用风险较高的新技术，[这不是一个明智的选择](https://youtu.be/mnwUbtieOuI?t=1662)。`/app` 目前只是 [对未来特性的一瞥而已](https://youtu.be/rnsC-12PVlM?t=818)，它还未做好准备被用于生产环境；这项 API 还处于 beta 阶段，可以预见接下来还会有破坏性的改变。

你可以访问 [beta 版 Next.js 文档](https://beta.nextjs.org/docs/app-directory-roadmap#supported-and-planned-features) 来查看 `/app` 目录所支持的、计划支持的和目前正在实施的特性列表。
