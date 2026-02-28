import { ALL_RANKS } from "../constants.ts";
import { Rank } from "../../types/card.ts";

export function rankToIndex(rank: Rank): number {
  return ALL_RANKS.indexOf(rank);
}

export function isRed(suit: string): boolean {
  return suit === "♥" || suit === "♦";
}

export function isOppositeColor(suit1: string, suit2: string): boolean {
  return isRed(suit1) !== isRed(suit2);
}
