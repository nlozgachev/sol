import { pipe } from "../../fp-lib/pipe.ts";
import { recoverUnless } from "../../fp-lib/recoverUnlsess.ts";
import { Operation } from "../../fp-lib/types.ts";
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
  return (ctx: CommandMoveInjectedIndex): Operation<ValidMove> =>
    pipe(extractMoveData(game)(ctx), (moveData) =>
      pipe(
        tryFromTableauToFoundation(moveData),
        recoverUnless(INVALID_MOVE, () => tryFromTableauToTableau(moveData)),
        recoverUnless(INVALID_MOVE, () => tryFromWasteToTableau(moveData)),
        recoverUnless(INVALID_MOVE, () => tryFromWasteToFoundation(moveData)),
        recoverUnless(INVALID_MOVE, () => tryFromFoundationToTableau(moveData)),
      ));
}
