import { gray, red } from "https://deno.land/std@0.224.0/fmt/colors.ts";
import { Card } from "../../types/card.ts";
import { isRed } from "./cardCheckUtils.ts";

export function colorCard(
  { card, padded }: { card: Card; padded: boolean },
): string {
  const str = `${card.rank}${card.suit}`;
  const label = padded ? str.padEnd(4) : str;
  return isRed(card.suit) ? red(label) : gray(label);
}
