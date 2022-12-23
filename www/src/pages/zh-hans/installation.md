---
title: 安装
description: 创建 T3 应用程序的安装说明
layout: ../../layouts/docs.astro
lang: zh-hans
---

要使用 `create-t3-app` 创建一个应用程序，请运行以下任意一个命令，并回答命令提示符的问题：

### npm

```bash
npm create t3-app@latest
```

### yarn

```bash
yarn create t3-app
```

### pnpm

```bash
pnpm create t3-app@latest
```

在你的应用程序被创建后，请查看 [第一步](/zh-hans/usage/first-steps) 以开始你的新应用。

## 高级用法

| 选项 / 标识       | 说明                                       |
| ----------------- | ------------------------------------------ |
| `[dir]`           | 添加一个带有项目名称的目录参数             |
| `--noGit`         | 显式告诉 CLI 不在项目中初始化新的 git 仓库 |
| `-y`, `--default` | 跳过 CLI 并选中所有选项来初始化新的 t3-app |
| `--noInstall`     | 创建项目，但不自动安装依赖包               |

## 实验性用法

我们的 CI 有一些实验性的标识，允许你可以无需问答式地直接创建应用程序。如果这种用例适用于你，你可以使用这些标识。请注意，这些标识是实验性的，将来可能会在不遵循 semver 版本的情况下改变。

| 标识         | 描述                      |
| ------------ | ------------------------- |
| `--CI`       | 让 CLI 知道你在 CI 模式中 |
| `--trpc`     | 添加 tRPC 到项目          |
| `--prisma`   | 添加 Prisma 到项目        |
| `--nextAuth` | 添加 NextAuth.js 到项目   |
| `--tailwind` | 添加 Tailwind CSS 到项目  |

**注意：如果你没有提供 `CI` 标识，那么其余的这些标识将无法生效。**

你不需要明确地选择不要的依赖包。然而如果你想这样做，你可以在包名后加个 `false`，例如 `--nextAuth false`。

### 示例

下面的命令将使用 tRPC 和 Tailwind CSS 创建一个 T3 应用程序。

```bash
pnpm dlx create-t3-app@latest --CI --trpc --tailwind
```
