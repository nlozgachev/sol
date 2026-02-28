import { GameState } from "../../types/game.ts";

export function isGameWon(game: GameState): boolean {
  return game.tableau.every((col) => col.every((c) => c.faceUp));
}
