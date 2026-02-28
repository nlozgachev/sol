import { chain } from "../../fp-lib/chain.ts";
import { pipe } from "../../fp-lib/pipe.ts";
import { tryChain } from "../../fp-lib/tryChain.ts";
import { Operation } from "../../fp-lib/types.ts";
import { err, ok } from "../../fp-lib/util.ts";
import { CommandMove, CommandMoveRaw, CommandParsed } from "../../types/command.ts";
import { GameState } from "../../types/game.ts";
import { ValidMove } from "../../types/move.ts";
import { DRAW_CMD, MOVE_CMD, QUIT_CMD, UNDO_CMD } from "../constants.ts";
import { COMMAND_NOT_FOUND, INVALID_COMMAND, PARSING_ERROR } from "../errors.ts";
import { validateMoveIndex } from "../validation/validateFoundationMoveIndex.ts";
import { validateMoveRules } from "../validation/validateMoveRules.ts";
import { extractMoveDataFromString } from "./extractMoveDataFromString.ts";
import { matchCardDestinationString, matchCardSourceString } from "./matchCardString.ts";

type ParseCommandCtx = { raw: string; game: GameState };

export function parseCommand(ctx: ParseCommandCtx): Operation<CommandParsed> {
  return pipe(ctx, checkNonEmpty, chain(findCommand));
}

function findCommand({ raw, game }: ParseCommandCtx): Operation<CommandParsed> {
  return tryChain(
    () => tryColonCmd(raw),
    () => tryDrawCmd(raw),
    () => tryMoveCmd({ raw, game }),
  );
}

function checkNonEmpty(ctx: ParseCommandCtx): Operation<ParseCommandCtx> {
  return ctx.raw.length > 0 ? ok(ctx) : err(INVALID_COMMAND);
}

function tryColonCmd(str: string): Operation<CommandParsed> {
  if (str === ":q") return ok({ action: QUIT_CMD });
  if (str === ":u") return ok({ action: UNDO_CMD });
  return err(COMMAND_NOT_FOUND);
}

function tryDrawCmd(rawString: string): Operation<CommandParsed> {
  const stringMatchArray = rawString.match(/^(\d{0,})(d)$/);

  if (stringMatchArray === null) return err(COMMAND_NOT_FOUND);

  const [_, countMatch] = stringMatchArray;
  return ok({
    action: DRAW_CMD,
    count: countMatch.length ? parseInt(countMatch) : 1,
  });
}

function createCommandMoveRaw(raw: string): Operation<CommandMoveRaw> {
  const moveData = extractMoveDataFromString(raw);

  if (!moveData.ok) return err(moveData.err);

  const { count, from, to } = moveData.value;

  const parsedFrom = matchCardSourceString(from);
  const parsedTo = matchCardDestinationString(to);

  if (!parsedFrom.ok || !parsedTo.ok) return err(PARSING_ERROR);

  return ok({
    action: MOVE_CMD,
    count,
    from: parsedFrom.value,
    to: parsedTo.value,
  });
}

function tryMoveCmd({ raw, game }: ParseCommandCtx): Operation<CommandMove> {
  return pipe(
    createCommandMoveRaw(raw),
    chain(validateMoveIndex(game)),
    chain(validateMoveRules(game)),
    chain(convertToCommandMove),
  );
}

function convertToCommandMove(ctx: ValidMove): Operation<CommandMove> {
  return ok({
    ...ctx,
    action: MOVE_CMD,
  });
}
