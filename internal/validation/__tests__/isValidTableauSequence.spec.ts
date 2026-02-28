import { assert } from "@std/assert/assert";
import { Card } from "../../../types/card.ts";
import { isValidTableauSequence } from "../util/isValidTableauSequence.ts";

Deno.test("isValidTableauSequence | valid", () => {
  const cards: Card[] = [
    { suit: "♥", rank: "J", faceUp: true },
    { suit: "♠", rank: "10", faceUp: true },
  ];
  const res = isValidTableauSequence(cards);
  assert(res);
});

Deno.test("isValidTableauSequence | invalid by rank", () => {
  const cards: Card[] = [
    { suit: "♥", rank: "J", faceUp: true },
    { suit: "♠", rank: "9", faceUp: true },
  ];
  const res = isValidTableauSequence(cards);
  assert(!res);
});

Deno.test("isValidTableauSequence | invalid by sequence", () => {
  const cards: Card[] = [
    { suit: "♠", rank: "10", faceUp: true },
    { suit: "♥", rank: "J", faceUp: true },
  ];
  const res = isValidTableauSequence(cards);
  assert(!res);
});

Deno.test("isValidTableauSequence | invalid by suit", () => {
  const cards: Card[] = [
    { suit: "♥", rank: "J", faceUp: true },
    { suit: "♦", rank: "10", faceUp: true },
  ];
  const res = isValidTableauSequence(cards);
  assert(!res);
});
