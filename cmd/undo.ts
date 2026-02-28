import { GameCtx } from "../types/game.ts";

export function undo(ctx: GameCtx): GameCtx {
  const prevGameState = ctx.archive.at(-2);
  if (prevGameState === undefined || ctx.archive.length === 1) return ctx;

  return {
    archive: ctx.archive.slice(0, -1),
    state: prevGameState,
  };
}
