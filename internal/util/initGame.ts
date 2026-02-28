import { GameState } from "../../types/game.ts";
import { dealCards } from "./dealCards.ts";
import { generateDeck } from "./generateDeck.ts";
import { secureRandom } from "./secureRandom.ts";
import { shuffle } from "./shuffle.ts";

export function initGame(): GameState {
  const deck = shuffle(generateDeck(), secureRandom);
  const { tableau, stock } = dealCards(deck);
  return {
    tableau,
    stock,
    waste: [],
    foundation: [[], [], [], []],
  };
}
