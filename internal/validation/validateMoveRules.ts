import { Result } from "@nlozgachev/pipelined/core";
import { pipe } from "@nlozgachev/pipelined/composition";
import type { Operation } from "../../fp-lib/types.ts";
import { CommandMoveInjectedIndex } from "../../types/command.ts";
import { GameState } from "../../types/game.ts";
import { ValidMove } from "../../types/move.ts";
import { INVALID_MOVE } from "../errors.ts";
import { extractMoveData } from "../parsing/extractMoveData.ts";
import { tryFromFoundationToTableau } from "./tryFromFoundationToTableau.ts";
import { tryFromTableauToFoundation } from "./tryFromTableauToFoundation.ts";
import { tryFromTableauToTableau } from "./tryFromTableauToTableau.ts";
import { tryFromWasteToFoundation } from "./tryFromWasteToFoundation.ts";
import { tryFromWasteToTableau } from "./tryFromWasteToTableau.ts";

export function validateMoveRules(game: GameState) {
  return (ctx: CommandMoveInjectedIndex) =>
    pipe(extractMoveData(game)(ctx), (moveData) =>
      pipe(
        tryFromTableauToFoundation(moveData),
        Result.recoverUnless(INVALID_MOVE, () => tryFromTableauToTableau(moveData)),
        Result.recoverUnless(INVALID_MOVE, () => tryFromWasteToTableau(moveData)),
        Result.recoverUnless(INVALID_MOVE, () => tryFromWasteToFoundation(moveData)),
        Result.recoverUnless(INVALID_MOVE, () => tryFromFoundationToTableau(moveData)),
      ));
}
