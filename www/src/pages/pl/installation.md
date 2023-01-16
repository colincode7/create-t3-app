---
title: Instalacja
description: Instrukcje instalacji dla Create T3 App.
layout: ../../layouts/docs.astro
lang: pl
---

Aby zacząć używać szablonu `create-t3-app`, uruchom którąkolwiek z poniższych trzech komend i odpowiedz na pytania w konsoli:

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

Po tym, jak szablon aplikacji zostanie utworzony, sprawdź [pierwsze kroki](/pl/usage/first-steps) aby zacząć budować swoją nową aplikację.

## Zaawansowane użycie

| Opcja/Flaga       | Opis                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------ |
| `[dir]`           | Argument z nazwą dla projektu                                                        |
| `--noGit`         | Wyraźnie poinformuj narzędzie, aby nie inicjalizować nowego repozytorium w projekcie |
| `-y`, `--default` | Pomiń CLI i stwórz nową aplikację z wszystkimi wybranymi opcjami                     |
| `--noInstall`     | Wygeneruj projekt bez instalowania zależności (npm)                                  |

## Eksperymentalne użycie

Z powodu naszej integracji CI, posiadamy eksperymentalne flagi pozwalające skorzystać z szablonu bez żadnych informacji w konsoli. Jeżeli przemawia do Ciebie któraś z poniższych opcji, możesz z jakiejś flagi skorzystać. Pamiętaj, że są to opcje eksperymentalne - mogą się one zmienić bez względu na system wersji semver.

| Flaga        | Opis                                        |
| ------------ | ------------------------------------------- |
| `--CI`       | Poinformuj narzędzie, że jesteś w trybie CI |
| `--trpc`     | Zawrzyj tRPC w projekcie                    |
| `--prisma`   | Zawrzyj Prisma w projekcie                  |
| `--nextAuth` | Zawrzyj NextAuth.js w projekcie             |
| `--tailwind` | Zawrzyj Tailwind CSS w projekcie            |

**Uwaga: Jeżeli nie podasz flagi `CI`, pozostałe flagi nie zostaną użyte.**

Nie musisz wyraźnie wskazywać paczek, z których nie chcesz korzystać. Jeżeli jednak wolisz jasno wskazać czego używasz, możesz podać wartość `false` - np. `--nextAuth false`.

### Przykład

Poniższy przykład stworzy aplikację T3 z bibliotekami tRPC oraz Tailwind CSS.

```bash
pnpm dlx create-t3-app@latest --CI --trpc --tailwind
```
