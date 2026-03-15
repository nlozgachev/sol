import { assert } from "@std/assert";
import { Result } from "@nlozgachev/pipelined/core";
import { MoveData } from "../../../types/card.ts";
import { FOUNDATION, TABLEAU } from "../../constants.ts";
import { tryFromTableauToFoundation } from "../tryFromTableauToFoundation.ts";

Deno.test("tryFromTableauToFoundation | valid starting move", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: TABLEAU,
    },
    to: {
      index: 1,
      pile: FOUNDATION,
    },
    targetBefore: [],
    targetAfter: [{ faceUp: true, rank: "A", suit: "♥" }],
    movingCards: [{ faceUp: true, rank: "A", suit: "♥" }],
  };

  const res = tryFromTableauToFoundation(ctx);

  assert(Result.isOk(res));
});

Deno.test("tryFromTableauToFoundation | invalid starting move", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: TABLEAU,
    },
    to: {
      index: 1,
      pile: FOUNDATION,
    },
    targetBefore: [],
    targetAfter: [{ faceUp: true, rank: "K", suit: "♥" }],
    movingCards: [{ faceUp: true, rank: "K", suit: "♥" }],
  };

  const res = tryFromTableauToFoundation(ctx);

  assert(Result.isErr(res));
});

Deno.test("tryFromTableauToFoundation | valid additional move", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: TABLEAU,
    },
    to: {
      index: 1,
      pile: FOUNDATION,
    },
    targetBefore: [{ faceUp: true, rank: "A", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "A", suit: "♥" },
      { faceUp: true, rank: "2", suit: "♥" },
    ],
    movingCards: [{ faceUp: true, rank: "2", suit: "♥" }],
  };

  const res = tryFromTableauToFoundation(ctx);

  assert(Result.isOk(res));
});

Deno.test("tryFromTableauToFoundation | invalid additional move by rank", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: TABLEAU,
    },
    to: {
      index: 1,
      pile: FOUNDATION,
    },
    targetBefore: [{ faceUp: true, rank: "A", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "A", suit: "♥" },
      { faceUp: true, rank: "3", suit: "♥" },
    ],
    movingCards: [{ faceUp: true, rank: "3", suit: "♥" }],
  };

  const res = tryFromTableauToFoundation(ctx);

  assert(Result.isErr(res));
});

Deno.test("tryFromTableauToFoundation | invalid additional move by suit", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: TABLEAU,
    },
    to: {
      index: 1,
      pile: FOUNDATION,
    },
    targetBefore: [{ faceUp: true, rank: "A", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "A", suit: "♥" },
      { faceUp: true, rank: "2", suit: "♠" },
    ],
    movingCards: [{ faceUp: true, rank: "2", suit: "♠" }],
  };

  const res = tryFromTableauToFoundation(ctx);

  assert(Result.isErr(res));
});

Deno.test("tryFromTableauToFoundation | disallow several moving cards", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: TABLEAU,
    },
    to: {
      index: 1,
      pile: FOUNDATION,
    },
    targetBefore: [{ faceUp: true, rank: "A", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "A", suit: "♥" },
      { faceUp: true, rank: "2", suit: "♠" },
    ],
    movingCards: [
      { faceUp: true, rank: "2", suit: "♠" },
      { faceUp: true, rank: "3", suit: "♠" },
    ],
  };

  const res = tryFromTableauToFoundation(ctx);

  assert(Result.isErr(res));
});
