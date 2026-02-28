import { MoveData } from "../../../types/card.ts";
import { isValidTableauSequence } from "../util/isValidTableauSequence.ts";

export function isValidTableauAfterMove(ctx: MoveData): boolean {
  if (ctx.targetBefore.length === 0 && ctx.movingCards[0].rank !== "K") {
    return false; // check column start scenario
  }
  return isValidTableauSequence(ctx.targetAfter);
}
