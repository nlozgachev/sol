import { Result } from "@nlozgachev/pipelined/core";
import type { Operation } from "../../fp-lib/types.ts";
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
          return Result.ok(to);
        }
        case FOUNDATION: {
          if (from.pile === FOUNDATION) return Result.err(INVALID_MOVE);
          return Result.ok({
            ...to,
            index: assignFoundationSlot(from, game),
          });
        }
      }
    })();

    if (Result.isErr(resultTo)) return Result.err(INVALID_MOVE);

    return Result.ok({
      action: MOVE_CMD,
      count,
      from,
      to: resultTo.value,
    });
  };
}
