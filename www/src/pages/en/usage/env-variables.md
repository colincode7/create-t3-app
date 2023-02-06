---
title: Environment Variables
description: Getting started with Create T3 App
layout: ../../../layouts/docs.astro
lang: en
---

Create T3 App uses [Zod](https://github.com/colinhacks/zod) for validating your environment variables at runtime _and_ buildtime by providing some additional logic in `src/env.mjs`.

## env.mjs

_TLDR; If you want to add a new environment variable, you must add it to both your `.env` as well as define the validator in `src/env.mjs`._

This file is split into two parts - the schema and object destructuring as well as the validation logic. The validation logic should not need to be touched.

```ts:env.mjs
const server = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]),
});

const client = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
});

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};
```

### Server Schema

Define your server-side environment variables schema here.

Make sure you do not prefix keys here with `NEXT_PUBLIC` in order not to leak important secrets to the client.

### Client Schema

Define your client-side environment variables schema here.

To expose them to the client you need to prefix them with `NEXT_PUBLIC`. Validation will fail if you don't to help you detect invalid configuration.

### processEnv Object

Destruct the `process.env` here.

We need a JavaScript object that we can parse our Zod-schemas with and due to the way Next.js handles environment variables, you can't destruct `process.env` like a regular object, so we need to do it manually.

TypeScript will help you make sure that you have destructed all the keys from both schemas.

```ts
// ❌ This doesn't work, we need to destruct it manually
const schema = z.object({
  NEXT_PUBLIC_WS_KEY: z.string(),
});

const validated = schema.parse(process.env);
```

### Validation Logic

_For the interested reader:_

<details>
<summary>Advanced: Validation logic</summary>

Depending on the environment (server or client) we validate either both or just the client schema. This means that even though the server environment variables will be undefined, they won't trigger the validation to fail - meaning we can have a single entrypoint for our environment variables.

```ts:env.mjs
const isServer = typeof window === "undefined";

const merged = server.merge(client);
const parsed = isServer
  ? merged.safeParse(processEnv)  // <-- on server, validate all
  : client.safeParse(processEnv); // <-- on client, validate only client

if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(parsed.error.format()),
  );
  throw new Error("Invalid environment variables");
}
```

Then, we use a proxy object to throw errors if you try to access a server-side environment variable on the client.

```ts:env.mjs
// proxy allows us to remap the getters
export const env = new Proxy(parsed.data, {
  get(target, prop) {
    if (typeof prop !== "string") return undefined;
    // on the client we only allow NEXT_PUBLIC_ variables
    if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
      throw new Error(
        "❌ Attempted to access serverside environment variable on the client",
      );
    return target[prop]; // <-- otherwise, return the value
  },
});
```

</details>

## Using Environment Variables

When you want to use your environment variables, you can import them from `env.mjs` and use them as you would normally do. If you import this on the client and try accessing a server-side environment variable, you will get a runtime error.

```ts:pages/api/hello.ts
import { env } from "../../env.mjs";

// `env` is fully typesafe and provides autocompletion
const dbUrl = env.DATABASE_URL;
```

```ts:pages/index.tsx
import { env } from "../env.mjs";

// ❌ This will throw a runtime error
const dbUrl = env.DATABASE_URL;

// ✅ This is fine
const wsKey = env.NEXT_PUBLIC_WS_KEY;
```

## .env.example

Since the default `.env` file is not committed to version control, we have also included a `.env.example` file, in which you can optionally keep a copy of your `.env` file with any secrets removed. This is not required, but we recommend keeping the example up to date to make it as easy as possible for contributors to get started with their environment.

Some frameworks and build tools, like Next.js, suggest that you store secrets in a `.env.local` file and commit `.env` files to your project. This is not recommended, as it could make it easy to accidentally commit secrets to your project. Instead, we recommend that you store secrets in `.env`, keep your `.env` file in your `.gitignore` and only commit `.env.example` files to your project.

## Adding Environment Variables

To ensure your build never completes without the environment variables the project needs, you will need to add new environment variables in **two** locations:

📄 `.env`: Enter your environment variable like you would normally do in a `.env` file, i.e. `KEY=VALUE`

📄 `env.mjs`: Add the appropriate validation logic for the environment variable by defining a Zod schema, e.g. `KEY: z.string()`, and destruct the environment variable from `process.env` in the `processEnv` object, e.g. `KEY: process.env.KEY`.

Optionally, you can also keep `.env.example` updated:

📄 `.env.example`: Enter your environment variable, but be sure to not include the value if it is secret, i.e. `KEY=VALUE` or `KEY=`

### Example

_I want to add my Twitter API Token as a server-side environment variable_

1. Add the environment variable to `.env`:

```
TWITTER_API_TOKEN=1234567890
```

2. Add the environment variable to `env.mjs`:

```ts
export const server = z.object({
  // ...
  TWITTER_API_TOKEN: z.string(),
});

export const processEnv = {
  // ...
  TWITTER_API_TOKEN: process.env.TWITTER_API_TOKEN,
};
```

_**NOTE:** An empty string is still a string, so `z.string()` will accept an empty string as a valid value. If you want to make sure that the environment variable is not empty, you can use `z.string().min(1)`._

3. _Optional:_ Add the environment variable to `.env.example`, but don't include the token

```
TWITTER_API_TOKEN=
```
