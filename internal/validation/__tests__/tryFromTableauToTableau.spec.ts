import { assert } from "@std/assert";
import { MoveData } from "../../../types/card.ts";
import { TABLEAU } from "../../constants.ts";
import { INVALID_MOVE } from "../../errors.ts";
import { tryFromTableauToTableau } from "../tryFromTableauToTableau.ts";

Deno.test("tryFromTableauToTableau | valid regular move", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: TABLEAU,
    },
    to: {
      index: 1,
      pile: TABLEAU,
    },
    targetBefore: [{ faceUp: true, rank: "10", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "10", suit: "♥" },
      { faceUp: true, rank: "9", suit: "♠" },
      { faceUp: true, rank: "8", suit: "♥" },
      { faceUp: true, rank: "7", suit: "♠" },
    ],
    movingCards: [
      { faceUp: true, rank: "9", suit: "♠" },
      { faceUp: true, rank: "8", suit: "♥" },
      { faceUp: true, rank: "7", suit: "♠" },
    ],
  };

  const res = tryFromTableauToTableau(ctx);

  assert(res.ok);
});

Deno.test("tryFromTableauToTableau | invalid regular move", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: TABLEAU,
    },
    to: {
      index: 1,
      pile: TABLEAU,
    },
    targetBefore: [{ faceUp: true, rank: "K", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "K", suit: "♥" },
      { faceUp: true, rank: "J", suit: "♠" },
      { faceUp: true, rank: "10", suit: "♥" },
    ],
    movingCards: [{ faceUp: true, rank: "J", suit: "♠" }],
  };

  const res = tryFromTableauToTableau(ctx);

  assert(!res.ok);
  assert(res.err === INVALID_MOVE);
});

Deno.test("tryFromTableauToTableau | valid column starting move", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: TABLEAU,
    },
    to: {
      index: 1,
      pile: TABLEAU,
    },
    targetBefore: [],
    targetAfter: [
      { faceUp: true, rank: "K", suit: "♥" },
      { faceUp: true, rank: "Q", suit: "♠" },
      { faceUp: true, rank: "J", suit: "♦" },
    ],
    movingCards: [
      { faceUp: true, rank: "K", suit: "♥" },
      { faceUp: true, rank: "Q", suit: "♠" },
      { faceUp: true, rank: "J", suit: "♦" },
    ],
  };

  const res = tryFromTableauToTableau(ctx);

  assert(res.ok);
});

Deno.test("tryFromTableauToTableau | invalid column starting move", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: TABLEAU,
    },
    to: {
      index: 1,
      pile: TABLEAU,
    },
    targetBefore: [],
    targetAfter: [
      { faceUp: true, rank: "Q", suit: "♠" },
      { faceUp: true, rank: "J", suit: "♦" },
    ],
    movingCards: [
      { faceUp: true, rank: "Q", suit: "♠" },
      { faceUp: true, rank: "J", suit: "♦" },
    ],
  };

  const res = tryFromTableauToTableau(ctx);

  assert(!res.ok);
});
