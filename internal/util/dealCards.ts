import { Card } from "../../types/card.ts";

export function dealCards(deck: Card[]): { stock: Card[]; tableau: Card[][] } {
  const tableau: Card[][] = [];
  let offset = 0;

  for (let i = 0; i < 7; i++) {
    const column = deck.slice(offset, offset + i + 1).map((
      card,
      index,
      arr,
    ) => ({
      ...card,
      faceUp: index === arr.length - 1, // last card
    }));
    tableau.push(column);
    offset += i + 1;
  }

  const stock = deck.slice(offset);

  return { stock, tableau };
}
