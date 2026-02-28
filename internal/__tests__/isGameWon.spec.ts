import { assert } from "@std/assert";
import { GameState } from "../../types/game.ts";
import { isGameWon } from "../util/isGameWon.ts";

Deno.test("util | isGameWon", () => {
  const game: GameState = {
    stock: [],
    tableau: [
      [
        { suit: "♥", rank: "A", faceUp: true },
        { suit: "♥", rank: "2", faceUp: true },
        { suit: "♥", rank: "3", faceUp: true },
        { suit: "♥", rank: "4", faceUp: true },
      ],
      [
        { suit: "♦", rank: "A", faceUp: true },
        { suit: "♦", rank: "2", faceUp: true },
      ],
    ],
    waste: [],
    foundation: [],
  };

  const resultWon = isGameWon(game);
  assert(resultWon, "Expected game to be won");

  game.tableau[0][0].faceUp = false;
  const resultNotWon = isGameWon(game);
  assert(!resultNotWon, "Expected game to not be won");
});
