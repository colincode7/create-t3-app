---
title: Netlify
description: Déploiement sur Netlify
layout: ../../../layouts/docs.astro
lang: fr
---

Netlify est un fournisseur de déploiement alternatif dans la même veine que Vercel. Voir [`ajcwebdev/ct3a-netlify`](https://github.com/ajcwebdev/ct3a-netlify) pour un exemple de dépôt basé sur ce document.

## Pourquoi héberger sur Netlify

La sagesse conventionnelle dit que Vercel a un support Next.js supérieur parce que Vercel développe Next.js. Ils ont tout intérêt à s'assurer que la plate-forme est réglée pour des performances optimales et DX avec Next.js. Pour la majorité des cas d'utilisation, cela sera vrai et cela n'aura aucun sens de s'écarter du chemin standard.

Il existe également un sentiment commun selon lequel de nombreuses fonctionnalités de Next.js ne sont prises en charge que sur Vercel. S'il est vrai que les nouvelles fonctionnalités Next.js seront testées et prises en charge sur Vercel au moment de leurs publications, il est également vrai que d'autres fournisseurs comme Netlify [implémenteront et publieront rapidement leur prise en charge](https://www.netlify.com/blog/deploy-nextjs-13/) pour les [fonctionnalités stables de Next.js](https://docs.netlify.com/integrations/frameworks/next-js/overview/).

Il existe des avantages et des inconvénients relatifs pour chaque fournisseurs de déploiement, car aucun hébergeur ne peut avoir le meilleur support pour tous les cas d'utilisation. Par exemple, Netlify a construit son propre [environnement d'exécution Next.js personnalisé](https://github.com/netlify/next-runtime) pour les fonctions Edge de Netlify (qui s'exécutent sur Deno Deploy) et [maintient un middleware unique pour accéder et modifier les réponses HTTP](https://github.com/netlify/next-runtime#nextjs-middleware-on-netlify).

> _REMARQUE : Pour suivre l'état des fonctionnalités instables de Next 13, consultez [Utilisation du répertoire "app" de Next 13 sur Netlify](https://github.com/netlify/next-runtime/discussions/1724)._

## Configurer le projet

Il existe de nombreuses façons de configurer vos instructions de build, y compris directement via la CLI Netlify ou le tableau de bord Netlify. Bien que cela ne soit pas obligatoire, il est conseillé de créer et d'inclure un fichier [`netlify.toml`](https://docs.netlify.com/configure-builds/file-based-configuration/). Cela garantit que les versions dérivées et clonées du projet seront plus faciles à déployer et de manière reproductible.

```toml
[build]
  command = "next build"
  publish = ".next"
```

## Utilisation du tableau de bord Netlify

1. Transférez votre code vers un dépôt GitHub et inscrivez-vous à [Netlify](https://app.netlify.com/signup). Après avoir créé un compte, cliquez sur **Ajouter un nouveau site** puis sur **Importer un projet existant**.

![Nouveau projet sur Netlify](/images/netlify-01-new-project.webp)

2. Connectez votre fournisseur de dépôt.

![Importation de votre dépôt](/images/netlify-02-connect-to-git-provider.webp)

3. Sélectionnez le dépôt de votre projet.

![Sélectionnez le dépôt de votre projet.](/images/netlify-03-pick-a-repository-from-github.webp)

4. Netlify détectera si vous avez un fichier `netlify.toml` et configurera automatiquement votre commande de build et votre répertoire de publication.

![Paramètres de build de Nextjs](/images/netlify-04-configure-build-settings.webp)

5. Cliquez sur **Afficher les paramètres avancés**, puis sur **Nouvelle variable** pour ajouter vos variables d'environnement.

![Ajouter des variables d'environnement](/images/netlify-05-env-vars.webp)

1. Cliquez sur **Déployer le site**, attendez la fin de la compilation, puis, affichez votre nouveau site.

## Utilisation de la CLI Netlify

Pour déployer à partir de la ligne de commande, vous devez d'abord pousser votre projet vers un dépôt GitHub et [installer la CLI Netlify](https://docs.netlify.com/cli/get-started/). Vous pouvez installer `netlify-cli` en tant que dépendance de projet ou l'installer globalement sur votre machine avec la commande suivante :

```bash
npm i -g netlify-cli
```

Pour tester votre projet localement, exécutez la commande [`ntl dev`](https://docs.netlify.com/cli/get-started/#run-a-local-development-environment) et ouvrez [`localhost:8888 `](http://localhost:8888/) pour afficher votre application Netlify exécutée localement :

```bash
ntl dev
```

Exécutez la commande [`ntl init`](https://docs.netlify.com/cli/get-started/#continuous-deployment) pour configurer votre projet :

```bash
ntl init
```

Importez les variables d'environnement de votre projet à partir de votre fichier `.env` avec [`ntl env:import`](https://cli.netlify.com/commands/env#envimport) :

```bash
ntl env:import .env
```

Déployez votre projet avec [`ntl deploy`](https://docs.netlify.com/cli/get-started/#manual-deploys). Vous devrez passer l'indicateur `--build` pour exécuter la commande build avant le déploiement et l'indicateur `--prod` pour déployer sur l'URL principale de votre site :

```bash
ntl deploy --prod --build
```

Pour afficher un exemple d'exécution sur Netlify, visitez [ct3a.netlify.app](https://ct3a.netlify.app/).
