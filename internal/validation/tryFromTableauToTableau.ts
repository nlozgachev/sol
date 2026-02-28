import { Operation } from "../../fp-lib/types.ts";
import { err, ok } from "../../fp-lib/util.ts";
import { MoveData } from "../../types/card.ts";
import { FromTableauToTableau } from "../../types/move.ts";
import { TABLEAU } from "../constants.ts";
import { INVALID_MOVE, WRONG_VALIDATOR } from "../errors.ts";
import { isValidTableauAfterMove } from "./util/isValidTableauAfterMove.ts";

export function tryFromTableauToTableau(
  ctx: MoveData,
): Operation<FromTableauToTableau> {
  if (ctx.from.pile !== TABLEAU || ctx.to.pile !== TABLEAU) {
    return err(WRONG_VALIDATOR);
  }

  if (isValidTableauAfterMove(ctx) === false) return err(INVALID_MOVE);

  return ok({
    movingCards: ctx.movingCards,
    targetBefore: ctx.targetBefore,
    targetAfter: ctx.targetAfter,
    from: ctx.from,
    to: ctx.to,
  });
}
