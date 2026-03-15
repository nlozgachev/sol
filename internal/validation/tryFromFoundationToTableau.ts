import { Result } from "@nlozgachev/pipelined/core";
import type { Operation } from "../../fp-lib/types.ts";
import { MoveData } from "../../types/card.ts";
import { FromFoundationToTableau } from "../../types/move.ts";
import { FOUNDATION, TABLEAU } from "../constants.ts";
import { INVALID_MOVE, WRONG_VALIDATOR } from "../errors.ts";
import { isValidTableauAfterMove } from "./util/isValidTableauAfterMove.ts";

export function tryFromFoundationToTableau(
  ctx: MoveData,
): Operation<FromFoundationToTableau> {
  if (ctx.from.pile !== FOUNDATION || ctx.to.pile !== TABLEAU) {
    return Result.err(WRONG_VALIDATOR);
  }
  if (ctx.movingCards.length !== 1) return Result.err(INVALID_MOVE);
  if (isValidTableauAfterMove(ctx) === false) return Result.err(INVALID_MOVE);

  return Result.ok({
    movingCards: ctx.movingCards,
    targetBefore: ctx.targetBefore,
    targetAfter: ctx.targetAfter,
    from: ctx.from,
    to: ctx.to,
  });
}
