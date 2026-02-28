import { assert } from "@std/assert";
import { MoveData } from "../../../types/card.ts";
import { FOUNDATION, TABLEAU } from "../../constants.ts";
import { tryFromFoundationToTableau } from "../tryFromFoundationToTableau.ts";

Deno.test("tryFromFoundationToTableau | valid move", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: FOUNDATION,
    },
    to: {
      index: 0,
      pile: TABLEAU,
    },
    targetBefore: [{ faceUp: true, rank: "3", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "3", suit: "♥" },
      { faceUp: true, rank: "2", suit: "♠" },
    ],
    movingCards: [{ faceUp: true, rank: "2", suit: "♠" }],
  };

  const res = tryFromFoundationToTableau(ctx);

  assert(res.ok);
});

Deno.test("tryFromFoundationToTableau | invalid move by rank", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: FOUNDATION,
    },
    to: {
      index: 0,
      pile: TABLEAU,
    },
    targetBefore: [{ faceUp: true, rank: "3", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "3", suit: "♥" },
      { faceUp: true, rank: "4", suit: "♠" },
    ],
    movingCards: [{ faceUp: true, rank: "4", suit: "♠" }],
  };

  const res = tryFromFoundationToTableau(ctx);

  assert(!res.ok);
});

Deno.test("tryFromFoundationToTableau | invalid move by suit", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: FOUNDATION,
    },
    to: {
      index: 0,
      pile: TABLEAU,
    },
    targetBefore: [{ faceUp: true, rank: "3", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "3", suit: "♥" },
      { faceUp: true, rank: "2", suit: "♥" },
    ],
    movingCards: [{ faceUp: true, rank: "2", suit: "♥" }],
  };

  const res = tryFromFoundationToTableau(ctx);

  assert(!res.ok);
});

Deno.test("tryFromFoundationToTableau | disallow moving several cards", () => {
  const ctx: MoveData = {
    from: {
      index: 0,
      pile: FOUNDATION,
    },
    to: {
      index: 0,
      pile: TABLEAU,
    },
    targetBefore: [{ faceUp: true, rank: "4", suit: "♥" }],
    targetAfter: [
      { faceUp: true, rank: "4", suit: "♥" },
      { faceUp: true, rank: "3", suit: "♠" },
      { faceUp: true, rank: "2", suit: "♥" },
    ],
    movingCards: [
      { faceUp: true, rank: "3", suit: "♠" },
      { faceUp: true, rank: "2", suit: "♥" },
    ],
  };

  const res = tryFromFoundationToTableau(ctx);

  assert(!res.ok);
});
