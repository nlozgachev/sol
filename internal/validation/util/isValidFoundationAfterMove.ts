import { MoveData } from "../../../types/card.ts";
import { rankToIndex } from "../../util/cardCheckUtils.ts";

export function isValidFoundationAfterMove(ctx: MoveData): boolean {
  const [first, ...rest] = ctx.targetAfter;
  if (first.rank !== "A") return false;

  return rest.every((card, i) => {
    const prev = ctx.targetAfter[i];
    return card.suit === prev.suit &&
      rankToIndex(card.rank) === rankToIndex(prev.rank) + 1;
  });
}
