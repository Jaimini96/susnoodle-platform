export function hashSeed(seed = "susnoodle") {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function seededNumber(seed: string, step: number) {
  let value = hashSeed(`${seed}:${step}`);
  value += 0x6d2b79f5;
  value = Math.imul(value ^ (value >>> 15), value | 1);
  value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
  return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
}

export function seededPick<T>(items: T[], seed: string, step: number): T {
  return items[Math.floor(seededNumber(seed, step) * items.length)] ?? items[0];
}

export function shuffleWithSeed<T>(items: T[], seed: string) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const target = Math.floor(seededNumber(seed, index) * (index + 1));
    [copy[index], copy[target]] = [copy[target], copy[index]];
  }
  return copy;
}
