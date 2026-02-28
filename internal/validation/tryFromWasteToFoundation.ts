import { Operation } from "../../fp-lib/types.ts";
import { err, ok } from "../../fp-lib/util.ts";
import { MoveData } from "../../types/card.ts";
import { FromWasteToFoundation } from "../../types/move.ts";
import { FOUNDATION, WASTE } from "../constants.ts";
import { INVALID_MOVE, WRONG_VALIDATOR } from "../errors.ts";
import { isValidFoundationAfterMove } from "./util/isValidFoundationAfterMove.ts";

export function tryFromWasteToFoundation(
  ctx: MoveData,
): Operation<FromWasteToFoundation> {
  if (ctx.from.pile !== WASTE || ctx.to.pile !== FOUNDATION) {
    return err(WRONG_VALIDATOR);
  }
  if (ctx.movingCards.length !== 1) return err(INVALID_MOVE);
  if (isValidFoundationAfterMove(ctx) === false) return err(INVALID_MOVE);

  return ok({
    movingCards: ctx.movingCards,
    targetBefore: ctx.targetBefore,
    targetAfter: ctx.targetAfter,
    from: ctx.from,
    to: ctx.to,
  });
}
