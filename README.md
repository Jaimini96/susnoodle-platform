# SusNoodle

Premium, mobile-first web platform for old Indian traditional games. The current build includes an expanded SEO catalog and 6 playable modules:

- Raja Mantri Chor Sipahi
- Ashta Chamma / Chowka Bara
- Damroo
- Moksha Patam
- Pallankuzhi / Ali Guli Mane
- Gilli Danda

## Stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS 4 design system
- Shared game engine contract in `src/games/types.ts`
- API-backed room service in `src/services/rooms.ts`
- Cloudflare-ready OpenNext config, D1 migration, R2 binding, and Durable Object room worker skeleton
- Vitest unit tests and Playwright smoke tests
- Generated hero artwork in `public/susnoodle-hero.jpg` and game visuals in `public/assets/games/`
- User-triggered Web Audio cues with a global mute toggle

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Test Commands

```bash
npm run typecheck
npm run lint
npm run test:unit
npm run build
npm run test:e2e
```

`npm run test:all` runs typecheck, lint, unit tests, and production build.

## Cloudflare

The web app deploys through OpenNext for Cloudflare:

```bash
npm run cf:build
npm run cf:preview
npm run cf:deploy
```

Before deploy, replace `database_id` in `wrangler.jsonc`, create the D1 database and R2 bucket, then apply `migrations/0001_initial.sql`.

The realtime room worker is in `cloudflare/realtime-worker.ts` with its own `cloudflare/wrangler.realtime.jsonc`.

## Adding Games

Read `docs/ADDING_GAMES.md`. New games should add metadata first, then a module that satisfies `GameModule<State, Action>`, then a renderer only if the game is playable.
