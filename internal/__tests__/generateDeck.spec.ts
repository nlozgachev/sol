import { assert, fail } from "@std/assert";
import { generateDeck } from "../util/generateDeck.ts";

Deno.test("util | generateDeck", () => {
  const deck = generateDeck();
  const expectedLength = 52;
  const expectedSuits = ["♠", "♥", "♦", "♣"];
  const expectedRanks = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  assert(
    deck.length === expectedLength,
    `Expected deck length ${expectedLength}, got ${deck}`,
  );

  for (const card of deck) {
    if (!expectedSuits.includes(card.suit)) {
      fail("Unexpected suit: ${card.suit}");
    }
    if (!expectedRanks.includes(card.rank)) {
      fail("Unexpected rank: ${card.rank}");
    }
    if (typeof card.faceUp !== "boolean") {
      fail(`Card faceUp should be boolean, got ${typeof card.faceUp}`);
    }
  }
});
