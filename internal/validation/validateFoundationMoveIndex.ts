import { Operation } from "../../fp-lib/types.ts";
import { err, ok } from "../../fp-lib/util.ts";
import { CommandMoveInjectedIndex, CommandMoveRaw } from "../../types/command.ts";
import { GameState } from "../../types/game.ts";
import { ValidMove } from "../../types/move.ts";
import { FOUNDATION, MOVE_CMD, TABLEAU } from "../constants.ts";
import { INVALID_MOVE } from "../errors.ts";
import { assignFoundationSlot } from "../util/assignFoundationSlot.ts";

export function validateMoveIndex(game: GameState) {
  return function (move: CommandMoveRaw): Operation<CommandMoveInjectedIndex> {
    const { from, to, count } = move;

    const resultTo: Operation<ValidMove["to"]> = (() => {
      switch (to.pile) {
        case TABLEAU: {
          return ok(to);
        }
        case FOUNDATION: {
          if (from.pile === FOUNDATION) return err(INVALID_MOVE);
          return ok({
            ...to,
            index: assignFoundationSlot(from, game),
          });
        }
      }
    })();

    if (!resultTo.ok) return err(INVALID_MOVE);

    return ok({
      action: MOVE_CMD,
      count,
      from,
      to: resultTo.value,
    });
  };
}
