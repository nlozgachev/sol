import { recover } from "../../fp-lib/recover.ts";
import { pipe } from "../../fp-lib/pipe.ts";
import { Operation } from "../../fp-lib/types.ts";
import { err, ok } from "../../fp-lib/util.ts";
import {
  CardDestination,
  CardSource,
  FoundationLocation,
  FoundationLocationUnknownIndex,
  TableauLocation,
  WasteLocation,
} from "../../types/move.ts";
import { FOUNDATION, TABLEAU, WASTE } from "../constants.ts";
import { PARSING_ERROR } from "../errors.ts";

const MATCH_MAPPING = {
  WASTE: /^w$/,
  FOUNDATION: /^f$/,
  FOUNDATION_INDEXED: /^f([1-4])$/,
  TABLEAU: /^t([1-7])$/,
} as const;

export function matchCardSourceString(raw: string): Operation<CardSource> {
  return pipe(
    raw,
    matchWaste,
    recover(() => matchFromFoundation(raw)),
    recover(() => matchTableau(raw)),
  );
}

export function matchCardDestinationString(
  raw: string,
): Operation<CardDestination> {
  return pipe(
    raw,
    matchTableau,
    recover(() => matchToFoundation(raw)),
  );
}

function matchWaste(raw: string): Operation<WasteLocation> {
  return MATCH_MAPPING.WASTE.test(raw) ? ok({ pile: WASTE, index: "none" }) : err(PARSING_ERROR);
}

function matchToFoundation(
  raw: string,
): Operation<FoundationLocationUnknownIndex> {
  return MATCH_MAPPING.FOUNDATION.test(raw)
    ? ok({ pile: FOUNDATION, index: "auto" })
    : err(PARSING_ERROR);
}

function matchFromFoundation(raw: string): Operation<FoundationLocation> {
  const match = raw.match(MATCH_MAPPING.FOUNDATION_INDEXED);
  if (!match) return err(PARSING_ERROR);

  const [, idx] = match;
  return ok({ pile: FOUNDATION, index: parseInt(idx) - 1 });
}

function matchTableau(raw: string): Operation<TableauLocation> {
  const match = raw.match(MATCH_MAPPING.TABLEAU);
  if (!match) return err(PARSING_ERROR);

  const [, idx] = match;
  return ok({ pile: TABLEAU, index: parseInt(idx) - 1 });
}
