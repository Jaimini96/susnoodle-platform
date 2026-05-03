# Architecture

## Platform Split

- `src/games/catalog.ts`: admin-style metadata for catalog, rules, SEO, and tutorials.
- `src/games/modules/*`: deterministic game logic and state transitions.
- `src/components/game/*`: renderers and controls only.
- `src/services/*`: API-facing services for rooms and analytics.
- `src/app/api/*`: backend endpoints for local and Cloudflare runtime.
- `cloudflare/*`: production realtime worker skeleton.
- `public/susnoodle-hero.jpg`: project-local generated hero image used by the landing page and social cards.
- `public/assets/games/*.jpg`: generated game visuals used by cards and detail pages.

## Game Contract

Every playable game follows `GameModule<State, Action>`:

- `createInitialState`
- `validateAction`
- `applyAction`
- `getAvailableActions`
- `isGameOver`
- `getResult`

This lets tutorials, analytics, multiplayer rooms, and tests work without knowing each game’s private rules.

## MVP Room Contract

The local API supports:

- Create room
- Join room by code
- Set ready state
- Host start
- Lightweight reactions

The in-memory store is intentional for local testing. Cloudflare Durable Objects are prepared for production realtime and reconnect handling.

## Sound

Sound cues are synthesized with the Web Audio API in `src/components/game/sound-provider.tsx`.

- Sound is off by default.
- Users must enable it with the header toggle.
- Cues are tied to actions such as roll, move, tap, success, miss, deal, accuse, reveal, and round transitions.
- Raja Mantri Chor Sipahi uses a soft synthesized court ambience after sound is enabled; this stays user-triggered to respect browser autoplay rules.
- No gameplay information is sound-only.
