# Cloudflare Setup

## Required Cloudflare Resources

- Cloudflare Pages or Workers deployment through OpenNext
- D1 database named `susnoodle`
- R2 bucket named `susnoodle-game-assets`
- Durable Object worker named `susnoodle-rooms`
- Optional Turnstile site key for write-heavy endpoints
- Optional Cloudflare Web Analytics token

## One-Time Commands

```bash
npm install
npx wrangler login
npx wrangler d1 create susnoodle
npx wrangler r2 bucket create susnoodle-game-assets
npx wrangler d1 execute susnoodle --file=migrations/0001_initial.sql
```

Copy the generated D1 `database_id` into `wrangler.jsonc`.

## Web Deploy

```bash
npm run cf:build
npm run cf:deploy
```

Set the production route to `susnoodle.com` inside Cloudflare once the domain is available.

## Realtime Worker Deploy

```bash
npx wrangler deploy --config cloudflare/wrangler.realtime.jsonc
```

The MVP Next.js API uses a local in-memory room service for development. Production realtime should route lobby websocket traffic to the Durable Object worker and store durable snapshots in D1.

## Useful Future Bindings

- `TURNSTILE_SECRET_KEY` for bot protection on room creation
- `POSTHOG_KEY` or Analytics Engine binding for event capture
- `GAME_ASSETS` for curated game-board media and share images
