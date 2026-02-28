import { FOUNDATION, TABLEAU, WASTE } from "../internal/constants.ts";
import { Card } from "../types/card.ts";
import { GameState } from "../types/game.ts";
import { AllCardLocations } from "../types/move.ts";

export function setPile({
  game,
  pileLocation,
  updatedPile,
}: {
  game: GameState;
  pileLocation: AllCardLocations;
  updatedPile: Card[];
}): GameState {
  switch (pileLocation.pile) {
    case TABLEAU:
      return {
        ...game,
        tableau: game.tableau.map((
          col,
          i,
        ) => (i === pileLocation.index ? updatedPile : col)),
      };

    case FOUNDATION:
      return {
        ...game,
        foundation: game.foundation.map((
          col,
          i,
        ) => (i === pileLocation.index ? updatedPile : col)),
      };

    case WASTE:
      return {
        ...game,
        waste: updatedPile,
      };
  }
}
