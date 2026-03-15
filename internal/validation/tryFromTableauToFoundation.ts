import { Result } from "@nlozgachev/pipelined/core";
import type { Operation } from "../../fp-lib/types.ts";
import { MoveData } from "../../types/card.ts";
import { FromTableauToFoundation } from "../../types/move.ts";
import { FOUNDATION, TABLEAU } from "../constants.ts";
import { INVALID_MOVE, WRONG_VALIDATOR } from "../errors.ts";
import { isValidFoundationAfterMove } from "./util/isValidFoundationAfterMove.ts";

export function tryFromTableauToFoundation(
  ctx: MoveData,
): Operation<FromTableauToFoundation> {
  if (ctx.from.pile !== TABLEAU || ctx.to.pile !== FOUNDATION) {
    return Result.err(WRONG_VALIDATOR);
  }
  if (ctx.movingCards.length !== 1) return Result.err(INVALID_MOVE);
  if (isValidFoundationAfterMove(ctx) === false) return Result.err(INVALID_MOVE);

  return Result.ok({
    movingCards: ctx.movingCards,
    targetBefore: ctx.targetBefore,
    targetAfter: ctx.targetAfter,
    from: ctx.from,
    to: ctx.to,
  });
}
