import { beforeEach, describe, expect, it } from "vitest";
import { clearRoomsForTests, createRoom, getRoom, joinRoom, setPlayerReady, startRoom } from "@/services/rooms";

describe("room service", () => {
  beforeEach(() => clearRoomsForTests());

  it("creates and joins a guest room", () => {
    const room = createRoom({ gameSlug: "raja-mantri-chor-sipahi", hostName: "Asha" });
    const joined = joinRoom({ code: room.code, playerName: "Kabir" });

    expect(getRoom(room.code)?.players).toHaveLength(2);
    expect(joined.players[1].name).toBe("Kabir");
  });

  it("requires every player to be ready before host start", () => {
    const room = createRoom({ gameSlug: "ashta-chamma", hostName: "Asha" });
    const joined = joinRoom({ code: room.code, playerName: "Kabir" });
    expect(() => startRoom(room.code, room.hostId)).toThrow("All players must be ready.");

    const guest = joined.players[1];
    const ready = setPlayerReady(room.code, guest.id, true);
    const started = startRoom(room.code, ready.hostId);

    expect(started.status).toBe("playing");
  });
});
