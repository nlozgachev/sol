import { pipe } from "@nlozgachev/pipelined/composition";
import { ApplyMoveCtx, Card } from "../types/card.ts";
import { GameState } from "../types/game.ts";
import { getPile } from "./getPile.ts";
import { setPile } from "./setPile.ts";

export function applyMove({ game, move }: ApplyMoveCtx): GameState {
  const { movingCards, from, to, targetAfter } = move;

  const updatedSourcePile = pipe(
    getPile({ game, pileLocation: from }),
    (fromPile) => removeCards(fromPile, movingCards.length),
    maybeAutoFlip,
  );

  return pipe(
    game,
    (g) => setPile({ game: g, pileLocation: from, updatedPile: updatedSourcePile }),
    (g) => setPile({ game: g, pileLocation: to, updatedPile: targetAfter }),
  );
}

function maybeAutoFlip(pile: Card[]): Card[] {
  if (pile.length === 0) return pile;

  const last = pile[pile.length - 1];
  if (last.faceUp) return pile;

  return [...pile.slice(0, -1), { ...last, faceUp: true }];
}

function removeCards(pile: Card[], count: number): Card[] {
  return pile.slice(0, -count);
}
function addCards(pile: Card[], cards: Card[]): Card[] {
  return pile.concat(cards);
}
