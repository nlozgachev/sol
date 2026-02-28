import { assert } from "@std/assert";
import { TABLEAU } from "../../internal/constants.ts";
import { MoveData } from "../../types/card.ts";
import { GameState } from "../../types/game.ts";
import { ValidMove } from "../../types/move.ts";
import { applyMove } from "../move.ts";

Deno.test("move command | can be executed", () => {
  const game: GameState = {
    stock: [],
    waste: [],
    foundation: [],
    tableau: [[{ suit: "♥", rank: "4", faceUp: true }], [{
      suit: "♣",
      rank: "5",
      faceUp: true,
    }]],
  };

  const validMoveDirection: Pick<ValidMove, "from" | "to"> = {
    from: { pile: TABLEAU, index: 0 },
    to: { pile: TABLEAU, index: 1 },
  };

  const move: MoveData = {
    from: validMoveDirection.from,
    to: validMoveDirection.to,
    movingCards: [{ suit: "♥", rank: "4", faceUp: true }],
    targetBefore: [{ suit: "♣", rank: "5", faceUp: true }],
    targetAfter: [
      { suit: "♣", rank: "5", faceUp: true },
      { suit: "♥", rank: "4", faceUp: true },
    ],
  };
  const result = applyMove({ game, move });

  assert(result.tableau[0].length === 0);
  assert(result.tableau[1].length === 2);
});
