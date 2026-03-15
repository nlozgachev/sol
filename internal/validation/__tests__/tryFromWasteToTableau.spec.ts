import { assert } from "@std/assert";
import { Result } from "@nlozgachev/pipelined/core";
import { tryFromWasteToFoundation } from "../tryFromWasteToFoundation.ts";
import { tryFromWasteToTableau } from "../tryFromWasteToTableau.ts";
import { MoveData } from "../../../types/card.ts";
import { TABLEAU, WASTE } from "../../constants.ts";

Deno.test("tryFromWasteToTableau | valid move", () => {
  const ctx: MoveData = {
    from: {
      pile: WASTE,
      index: "none",
    },
    to: {
      pile: TABLEAU,
      index: 0,
    },
    targetBefore: [{ faceUp: true, rank: "10", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "10", suit: "♥" },
      { faceUp: true, rank: "9", suit: "♠" },
    ],
    movingCards: [{ faceUp: true, rank: "9", suit: "♠" }],
  };

  const res = tryFromWasteToTableau(ctx);

  assert(Result.isOk(res));
});

Deno.test("tryFromWasteToTableau | invalid move by rank", () => {
  const ctx: MoveData = {
    from: {
      pile: WASTE,
      index: "none",
    },
    to: {
      pile: TABLEAU,
      index: 0,
    },
    targetBefore: [{ faceUp: true, rank: "10", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "10", suit: "♥" },
      { faceUp: true, rank: "8", suit: "♠" },
    ],
    movingCards: [{ faceUp: true, rank: "8", suit: "♥" }],
  };

  const res = tryFromWasteToTableau(ctx);

  assert(Result.isErr(res));
});

Deno.test("tryFromWasteToTableau | invalid move by suit", () => {
  const ctx: MoveData = {
    from: {
      pile: WASTE,
      index: "none",
    },
    to: {
      pile: TABLEAU,
      index: 0,
    },
    targetBefore: [{ faceUp: true, rank: "10", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "10", suit: "♥" },
      { faceUp: true, rank: "9", suit: "♦" },
    ],
    movingCards: [{ faceUp: true, rank: "8", suit: "♥" }],
  };

  const res = tryFromWasteToTableau(ctx);

  assert(Result.isErr(res));
});

Deno.test("tryFromWasteToTableau | disallow moving several cards at once", () => {
  const ctx: MoveData = {
    from: {
      pile: WASTE,
      index: "none",
    },
    to: {
      pile: TABLEAU,
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
