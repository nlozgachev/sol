import { Result } from "@nlozgachev/pipelined/core";
import type { Operation } from "../../fp-lib/types.ts";
import { Card } from "../../types/card.ts";
import { GameState } from "../../types/game.ts";
import { rankToIndex } from "./cardCheckUtils.ts";
import { WASTE } from "../constants.ts";
import { INVALID_MOVE } from "../errors.ts";
import { ValidMove } from "../../types/move.ts";

export function assignFoundationSlot(
  from: ValidMove["from"],
  game: GameState,
): number {
  const card = from.pile === WASTE
    ? game.waste.at(-1)
    : game.tableau[from.index].filter((c) => c.faceUp).at(-1);

  if (!card) return 0;

  for (let i = 0; i < game.foundation.length; i++) {
    const pile = game.foundation[i];

    if (
      (pile.length === 0 && card.rank === "A") ||
      (pile.length > 0 &&
        pile.at(-1)!.suit === card.suit &&
        rankToIndex(card.rank) === rankToIndex(pile.at(-1)!.rank) + 1)
    ) {
      return i;
    }
  }

  return 0;
}

export function assignFoundationSlot_refactored({
  card,
  foundations,
}: {
  card: Card;
  foundations: GameState["foundation"];
}): Operation<GameState["foundation"]> {
  const index = foundations.findIndex(
    (pile) =>
      (pile.length === 0 && card.rank === "A") ||
      (pile.length > 0 &&
        pile.at(-1)!.suit === card.suit &&
        rankToIndex(card.rank) === rankToIndex(pile.at(-1)!.rank) + 1),
  );

  if (index === -1) return Result.err(INVALID_MOVE);

  const updated = foundations.map((
    pile,
    i,
  ) => (i === index ? [...pile, card] : pile));

  return Result.ok(updated);
}
