import { assert, assertEquals, assertNotEquals } from "@std/assert";
import { Card } from "../../types/card.ts";
import { shuffle } from "../util/shuffle.ts";
import { generateDeck } from "../util/generateDeck.ts";

Deno.test("util | shuffle", () => {
  const deck: Card[] = generateDeck();

  const shuffledDeck = shuffle(deck, () => 0);

  assertEquals(shuffledDeck.length, deck.length);
  assert(
    deck.every((card) => shuffledDeck.some((c) => c.suit === card.suit && c.rank === card.rank)),
  );

  assertNotEquals(shuffledDeck, deck);
});

Deno.test("util | shuffle | should shuffle equal decks when given the same seed", () => {
  const deck: Card[] = generateDeck();

  const createShuffledDeck = () => shuffle(deck, () => 0);
  const shuffledDeck = createShuffledDeck();
  const shuffledDeckCopy = createShuffledDeck().slice();

  assertEquals(shuffledDeck.length, deck.length);
  assert(
    shuffledDeckCopy.every((c, idx) =>
      shuffledDeck[idx].suit === c.suit && shuffledDeck[idx].rank === c.rank
    ),
  );
});
