# SusNoodle Project Tracker

Last updated: 2026-04-29

## Live Links

- Local app: `http://localhost:3000`
- GitHub repo: `https://github.com/Jaimini96/susnoodle-platform`
- Cloudflare web worker: `https://susnoodle-web.ajaimini2.workers.dev`
- Cloudflare realtime worker: `https://susnoodle-rooms.ajaimini2.workers.dev`

## Done

- Greenfield Next.js 16 / React 19 / TypeScript app created.
- Tailwind CSS 4 design system added with dark graphite, antique brass, warm ivory, peacock, maroon, and emerald accents.
- Premium landing page built with generated hero artwork.
- Game catalog built from metadata instead of hardcoded page copy.
- 18-game SEO-aware catalog created with regional alternate names and roadmap statuses.
- 6 playable modules implemented:
  - Raja Mantri Chor Sipahi
  - Ashta Chamma / Chowka Bara
  - Damroo
  - Moksha Patam
  - Pallankuzhi / Ali Guli Mane
  - Gilli Danda
- Reusable `GameModule<State, Action>` contract added in `src/games/types.ts`.
- Game logic separated into `src/games/modules/*` instead of frontend-only business logic.
- Game detail pages include rules, tutorial, cultural note, SEO metadata, structured data, and playable practice UI.
- Rules drawer and tutorial panel implemented.
- Guest room API added with create, join, ready, start, and reaction service functions.
- Realtime Durable Object worker created and deployed.
- Room console now attempts websocket sync with the deployed realtime worker when a room is created or joined.
- User-triggered Web Audio cues added with a global mute toggle.
- Generated raster assets added:
  - `public/susnoodle-hero.jpg`
  - `public/assets/games/*.jpg`
- SEO basics added:
  - metadata titles and descriptions
  - canonical URLs
  - Open Graph image
  - `sitemap.xml`
  - `robots.txt`
  - game structured data
- Cloudflare OpenNext deployment configured.
- Cloudflare D1 database `susnoodle` created in APAC.
- Cloudflare R2 bucket `susnoodle-game-assets` created.
- Initial D1 migration applied.
- GitHub repository created and initial project pushed.
- GitHub Actions CI workflow added.
- Local testing added:
  - Vitest unit tests
  - Playwright desktop/mobile smoke tests
  - room API smoke coverage
- Documentation added:
  - `README.md`
  - `docs/ADDING_GAMES.md`
  - `docs/ARCHITECTURE.md`
  - `docs/CLOUDFLARE.md`

## Verified

- `npm run typecheck`
- `npm run lint`
- `npm run test:unit`
- `npm run build`
- `npm run test:e2e`
- `npm run cf:build`
- `npm audit --audit-level=moderate`

## Pending: Needs User Action

1. Rotate/revoke any GitHub token pasted into chat.
2. Confirm whether `susnoodle-platform` should remain public or be changed to private.
3. Connect `susnoodle.com` and `www.susnoodle.com` to the Cloudflare worker from the Cloudflare dashboard.
4. Add Google Search Console property and submit `https://susnoodle.com/sitemap.xml` after the domain is live.
5. Decide analytics provider: Cloudflare Web Analytics, Plausible, or PostHog.

## Pending: Can Be Built Next

1. Persist room state to D1 instead of only using in-memory local API state.
2. Make the Durable Object room worker authoritative for production multiplayer.
3. Add reconnect and presence recovery in the room UI.
4. Add Turnstile protection to room creation and other write endpoints.
5. Add production analytics event forwarding.
6. Add stronger tutorial flows per game, including “why did this happen?” explanations.
7. Add accessible keyboard controls for every playable board action.
8. Add low-bandwidth asset mode and image loading tests.
9. Add admin/config editor for game metadata.
10. Add proper regional rule variant support per game.
11. Add more playable games from the roadmap:
    - Chaupar / Pachisi
    - Kanche / Marbles
    - Navakankari
    - Teen Patti social mode without real-money mechanics
    - Seep / Sweep
    - Court Piece / Rang

## Immediate Recommended Next Steps

1. Push the latest CI/realtime/tracker commit to GitHub.
2. Connect `susnoodle.com` to `susnoodle-web` in Cloudflare.
3. Add production environment variable:
   - `NEXT_PUBLIC_ROOM_WORKER_URL=https://susnoodle-rooms.ajaimini2.workers.dev`
4. Promote the Durable Object room worker from sync preview to authoritative multiplayer state.
5. Add Turnstile and analytics before inviting external testers.

## Risk Notes

- Several traditional games have regional rule differences. Keep variants explicit and avoid claiming one definitive rule set.
- Current production web deployment is on a workers.dev URL until custom domain routing is added.
- Current room API is still local/API-driven for creation and joining; the websocket worker is connected but not yet the full source of truth.
- GitHub token management should move to normal `gh auth login` or SSH after rotating the exposed token.
