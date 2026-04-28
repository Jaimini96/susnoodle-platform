import { expect, test } from "@playwright/test";

test("home, catalog, and a playable game render", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Old Indian games/i })).toBeVisible();
  await page.getByRole("link", { name: /View Catalog/i }).click();
  await expect(page.getByRole("heading", { name: /Pick a table/i })).toBeVisible();
  await page.getByRole("link", { name: /^Play$/ }).first().click();
  await expect(page.getByRole("button", { name: /Practice/i })).toBeVisible();
});

test("room API works from the browser", async ({ request }) => {
  const created = await request.post("/api/rooms", {
    data: { gameSlug: "raja-mantri-chor-sipahi", hostName: "Asha" }
  });
  expect(created.ok()).toBeTruthy();
  const body = await created.json();
  expect(body.room.code).toHaveLength(6);

  const joined = await request.post(`/api/rooms/${body.room.code}`, {
    data: { action: "join", playerName: "Kabir" }
  });
  expect(joined.ok()).toBeTruthy();
  const joinedBody = await joined.json();
  expect(joinedBody.room.players).toHaveLength(2);
});
