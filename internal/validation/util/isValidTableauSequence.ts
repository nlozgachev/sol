import { Card } from "../../../types/card.ts";
import { isOppositeColor, rankToIndex } from "../../util/cardCheckUtils.ts";

export function isValidTableauSequence(cards: Card[]): boolean {
  const faceUpCards = cards.filter((c) => c.faceUp);
  const lastIndex = faceUpCards.length - 1;

  return faceUpCards.every((card, i) => {
    if (i === lastIndex) return true; // nothing to compare with
    const next = faceUpCards[i + 1];
    return isOppositeColor(card.suit, next.suit) &&
      rankToIndex(card.rank) === rankToIndex(next.rank) + 1;
  });
}
