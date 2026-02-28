import { ALL_RANKS, ALL_SUITS } from "../constants.ts";
import { Card } from "../../types/card.ts";

export function generateDeck(): Card[] {
  return ALL_SUITS.flatMap((suit) => ALL_RANKS.map((rank) => ({ suit, rank, faceUp: false })));
}
