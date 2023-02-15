---
title: Instalación
description: Instrucciones de instalación para Create T3 App
layout: ../../layouts/docs.astro
lang: es
---

Para crear una aplicación usando `create-t3-app`, ejecuta cualquiera de los siguientes tres comandos y responde las preguntas en la línea de comandos:

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

Después de que tu aplicación haya sido creada, consulta los [primeros pasos](/es/usage/first-steps) para comenzar con tu nueva aplicación.

## Uso avanzado

| Opción/Bandera    | Descripción                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `[dir]`           | Incluye un argumento de directorio con un nombre para el proyecto                         |
| `--noGit`         | Dile explícitamente a la CLI que no inicialice un nuevo repositorio de git en el proyecto |
| `-y`, `--default` | Omite la CLI y arranca una nueva aplicación t3 con todas las opciones seleccionadas       |
| `--noInstall`     | Generar proyecto sin instalar dependencias                                                |

## Uso experimental

Para nuestro CI, tenemos algunas banderas experimentales que te permiten crear cualquier aplicación sin indicaciones. Si este caso de uso se aplica a ti, puedes usar estas banderas. Ten en cuenta que estas banderas son experimentales y pueden cambiar en el futuro sin seguir las versiones de semver.

| Bandera      | Descripción                           |
| ------------ | ------------------------------------- |
| `--CI`       | Informar a la CLI que está en modo CI |
| `--trpc`     | Incluir tRPC en el proyecto           |
| `--prisma`   | Incluir Prisma en el proyecto         |
| `--nextAuth` | Incluir NextAuth.js en el proyecto    |
| `--tailwind` | Incluir Tailwind CSS en el proyecto   |

**Nota: si no proporcionas la bandera `CI`, el resto de estas banderas no tendrá efecto.**

No es necesario que se excluya explícitamente los paquetes que no deseas. Sin embargo, si prefieres ser explícito, puedes pasar `false`, ejemplo: `--nextAuth false`.

### Ejemplo

Lo siguiente sería una aplicación T3 con tRPC y Tailwind CSS.

```bash
pnpm dlx create-t3-app@latest --CI --trpc --tailwind
```
