import { FOUNDATION, TABLEAU, WASTE } from "../internal/constants.ts";
import { Card } from "../types/card.ts";
import { GameState } from "../types/game.ts";
import { CardSource } from "../types/move.ts";

export function getPile(
  { game, pileLocation }: { game: GameState; pileLocation: CardSource },
): Card[] {
  switch (pileLocation.pile) {
    case TABLEAU:
      return game.tableau[pileLocation.index];
    case FOUNDATION:
      return game.foundation[pileLocation.index];
    case WASTE:
      return game.waste;
  }
}
