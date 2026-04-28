# Adding a New Game

SusNoodle games are metadata-first and engine-driven. Add the game once, then let catalog pages, detail pages, rules, SEO, tutorials, room setup, and tests use the same source of truth.

## 1. Add Metadata

Edit `src/games/catalog.ts` and add a `GameMetadata` entry:

- Use a stable `slug`.
- Include regional names in `alternateNames`.
- Keep `shortDescription` specific to the mechanic.
- Mark launch readiness with `status`.
- Add rules, tutorial steps, cultural note, SEO title, and meta description.
- Avoid unverified historical claims. Say “variant” or “roadmap” when appropriate.

## 2. Add the Game Module

Create `src/games/modules/<slug>.ts` and implement:

```ts
export const myGameModule: GameModule<MyState, MyAction> = {
  metadata,
  createInitialState(config) {},
  validateAction(state, action) {},
  applyAction(state, action) {},
  getAvailableActions(state, playerId) {},
  isGameOver(state) {},
  getResult(state) {}
};
```

Rules belong here, not inside React components. Components should dispatch actions and render state.

## 3. Register the Module

Add it to `src/games/modules/index.ts`.

If the game is playable, add the slug to `PlayableSlug` in `src/games/types.ts` and wire a renderer in `src/components/game/playable-experience.tsx`.

## 4. Write Focused Tests

Add unit tests for:

- Initial state
- Legal and illegal actions
- A representative full turn
- Game-over result
- Edge cases such as capture, exact finish, skipped turn, or timeout

Use `npm run test:unit`.

## 5. Add Multiplayer Carefully

For friend rooms, keep the room contract generic:

- Room creation and joining stay in `src/services/rooms.ts`.
- Realtime sync should flow through Durable Objects.
- Do not make login mandatory for room joining.
- Persist room snapshots once the production D1 binding is connected.

## 6. UI Quality Bar

- Every preview must show a real mechanic from the game.
- Do not use generic stock icons as the game’s visual identity.
- Add labels alongside color states.
- Keep tap targets large on mobile.
- Respect `prefers-reduced-motion`.
- Keep copy short and concrete.
