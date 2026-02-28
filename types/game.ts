import { Card } from "./card.ts";

export type GameState = {
  stock: Card[];
  waste: Card[];
  foundation: Card[][];
  tableau: Card[][];
};

export type GameCtx = {
  state: GameState;
  archive: GameState[];
};
