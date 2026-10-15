# Feature toggles — one app, many frameworks

A learning monorepo: the same small "feature toggles" app (list, create and edit flags) is built with
several front-end frameworks against one shared API, so the idioms of each framework can be compared side by side.

| Package                        | What                               | Stack                                                                   | Dev URL               |
| ------------------------------ | ---------------------------------- | ----------------------------------------------------------------------- | --------------------- |
| [`apps/express`](apps/express) | REST + GraphQL API                 | Express 5, Mongoose 9, GraphQL Yoga + graphql-compose-mongoose          | http://localhost:8080 |
| [`apps/angular`](apps/angular) | Front-end                          | Angular 22: standalone, zoneless, signals, `httpResource`, Signal Forms | http://localhost:4200 |
| [`apps/react`](apps/react)     | Front-end                          | React 19, React Router 8 (data mode + loaders), Formik, Vite            | http://localhost:3000 |
| [`apps/vue`](apps/vue)         | Front-end                          | Vue 3.5 `<script setup>`, Vue Router 5, Vite                            | http://localhost:8383 |
| [`apps/svelte`](apps/svelte)   | Front-end                          | Svelte 5 (runes), SvelteKit 3 in SPA mode                               | http://localhost:5173 |
| [`libs/helpers`](libs/helpers) | Shared TS: models, validation, API | TypeScript, axios                                                       | —                     |
| [`libs/styles`](libs/styles)   | Shared look & feel                 | Tailwind CSS v4 theme + `ft-*` component classes                        | —                     |

Validation (`validateFeature`), value casting and the JSON preview live in `@feature-toggles/helpers`,
so every app — and the API — applies exactly the same rules.

## Requirements

- Node.js ≥ 24
- pnpm 12 (`corepack enable` picks up the version pinned in `package.json`)
- Docker, for the local MongoDB (or any MongoDB you point `DB_URI` at)

## Getting started

```sh
pnpm install
cp apps/express/.env.example apps/express/.env
pnpm db:up        # MongoDB 8 in Docker on :27017
pnpm dev          # API + all four front-ends (Turborepo)
```

Or run a single front-end together with the API it needs:

```sh
pnpm dev:angular   # or dev:react, dev:vue, dev:svelte
pnpm dev:api       # API only
```

GraphiQL is served at http://localhost:8080/graphql/features.

## Scripts

All run through [Turborepo](https://turborepo.com), which builds `libs/helpers` first and caches results:

| Command          | Does                                                         |
| ---------------- | ------------------------------------------------------------ |
| `pnpm dev`       | Start everything in watch mode                               |
| `pnpm build`     | Production builds                                            |
| `pnpm test`      | Vitest in every package (API tests use an in-memory MongoDB) |
| `pnpm lint`      | ESLint (one flat config at the repo root)                    |
| `pnpm typecheck` | `tsc` / `vue-tsc` / `svelte-check`                           |
| `pnpm format`    | Prettier                                                     |
