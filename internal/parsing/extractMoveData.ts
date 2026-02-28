import { getPile } from "../../cmd/getPile.ts";
import { MoveData } from "../../types/card.ts";
import { CommandMoveInjectedIndex } from "../../types/command.ts";
import { GameState } from "../../types/game.ts";

export function extractMoveData(game: GameState) {
  return (move: CommandMoveInjectedIndex): MoveData => {
    const fromPile = getPile({ game, pileLocation: move.from });
    const movingCards = fromPile.slice(-move.count).filter((c) => c.faceUp);
    const targetBefore = getPile({ game, pileLocation: move.to });
    const targetAfter = targetBefore.concat(movingCards);
    return {
      from: move.from,
      to: move.to,
      movingCards,
      targetBefore,
      targetAfter,
    };
  };
}
