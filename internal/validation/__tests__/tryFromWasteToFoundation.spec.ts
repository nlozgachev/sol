import { assert } from "@std/assert";
import { Result } from "@nlozgachev/pipelined/core";
import { MoveData } from "../../../types/card.ts";
import { FOUNDATION, WASTE } from "../../constants.ts";
import { tryFromWasteToFoundation } from "../tryFromWasteToFoundation.ts";

Deno.test("tryFromWasteToFoundation | valid move", () => {
  const ctx: MoveData = {
    from: {
      pile: WASTE,
      index: "none",
    },
    to: {
      pile: FOUNDATION,
      index: 0,
    },
    targetBefore: [{ faceUp: true, rank: "A", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "A", suit: "♥" },
      { faceUp: true, rank: "2", suit: "♥" },
    ],
    movingCards: [{ faceUp: true, rank: "2", suit: "♥" }],
  };

  const res = tryFromWasteToFoundation(ctx);

  assert(Result.isOk(res));
});

Deno.test("tryFromWasteToFoundation | invalid move", () => {
  const ctx: MoveData = {
    from: {
      pile: WASTE,
      index: "none",
    },
    to: {
      pile: FOUNDATION,
      index: 0,
    },
    targetBefore: [{ faceUp: true, rank: "A", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "A", suit: "♥" },
      { faceUp: true, rank: "2", suit: "♠" },
    ],
    movingCards: [{ faceUp: true, rank: "2", suit: "♥" }],
  };

  const res = tryFromWasteToFoundation(ctx);

  assert(Result.isErr(res));
});

Deno.test("tryFromWasteToFoundation | valid foundation start", () => {
  const ctx: MoveData = {
    from: {
      pile: WASTE,
      index: "none",
    },
    to: {
      pile: FOUNDATION,
      index: 0,
    },
    targetBefore: [],
    targetAfter: [
      { faceUp: true, rank: "A", suit: "♥" },
      { faceUp: true, rank: "2", suit: "♥" },
    ],
    movingCards: [{ faceUp: true, rank: "2", suit: "♥" }],
  };

  const res = tryFromWasteToFoundation(ctx);

  assert(Result.isOk(res));
});

Deno.test("tryFromWasteToFoundation | valid foundation move", () => {
  const ctx: MoveData = {
    from: {
      pile: WASTE,
      index: "none",
    },
    to: {
      pile: FOUNDATION,
      index: 0,
    },
    targetBefore: [],
    targetAfter: [{ faceUp: true, rank: "A", suit: "♥" }],
    movingCards: [{ faceUp: true, rank: "A", suit: "♥" }],
  };

  const res = tryFromWasteToFoundation(ctx);

  assert(Result.isOk(res));
});

Deno.test("tryFromWasteToFoundation | invalid foundation start", () => {
  const ctx: MoveData = {
    from: {
      pile: WASTE,
      index: "none",
    },
    to: {
      pile: FOUNDATION,
      index: 0,
    },
    targetBefore: [],
    targetAfter: [{ faceUp: true, rank: "K", suit: "♥" }],
    movingCards: [{ faceUp: true, rank: "K", suit: "♥" }],
  };

  const res = tryFromWasteToFoundation(ctx);

  assert(Result.isErr(res));
});

Deno.test("tryFromWasteToFoundation | disallow moving several cards at once", () => {
  const ctx: MoveData = {
    from: {
      pile: WASTE,
      index: "none",
    },
    to: {
      pile: FOUNDATION,
      index: 0,
    },
    targetBefore: [],
    targetAfter: [
      { faceUp: true, rank: "A", suit: "♥" },
      { faceUp: true, rank: "2", suit: "♥" },
      { faceUp: true, rank: "3", suit: "♥" },
    ],
    movingCards: [
      { faceUp: true, rank: "2", suit: "♥" },
      { faceUp: true, rank: "3", suit: "♥" },
    ],
  };

  const res = tryFromWasteToFoundation(ctx);

  assert(Result.isErr(res));
});
