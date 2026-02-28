import { ALL_RANKS, ALL_SUITS } from "../internal/constants.ts";
import { GameState } from "./game.ts";
import { ValidMove } from "./move.ts";

export type Suit = (typeof ALL_SUITS)[number];
export type Rank = (typeof ALL_RANKS)[number];

export type Card = {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
};

export type WithMovingCards = {
  movingCards: Card[];
};
export type WithTargetStates = {
  targetAfter: Card[];
  targetBefore: Card[];
};

export type MoveData =
  & Pick<ValidMove, "from" | "to">
  & WithMovingCards
  & WithTargetStates;

export type ApplyMoveCtx = {
  game: GameState;
  move: MoveData;
};
