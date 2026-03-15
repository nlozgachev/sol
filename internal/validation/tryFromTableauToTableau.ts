import { Result } from "@nlozgachev/pipelined/core";
import type { Operation } from "../../fp-lib/types.ts";
import { MoveData } from "../../types/card.ts";
import { FromTableauToTableau } from "../../types/move.ts";
import { TABLEAU } from "../constants.ts";
import { INVALID_MOVE, WRONG_VALIDATOR } from "../errors.ts";
import { isValidTableauAfterMove } from "./util/isValidTableauAfterMove.ts";

export function tryFromTableauToTableau(
  ctx: MoveData,
): Operation<FromTableauToTableau> {
  if (ctx.from.pile !== TABLEAU || ctx.to.pile !== TABLEAU) {
    return Result.err(WRONG_VALIDATOR);
  }

  if (isValidTableauAfterMove(ctx) === false) return Result.err(INVALID_MOVE);

  return Result.ok({
    movingCards: ctx.movingCards,
    targetBefore: ctx.targetBefore,
    targetAfter: ctx.targetAfter,
    from: ctx.from,
    to: ctx.to,
  });
}
