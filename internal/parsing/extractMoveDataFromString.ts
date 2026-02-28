import { Operation } from "../../fp-lib/types.ts";
import { err, ok } from "../../fp-lib/util.ts";
import { INVALID_COMMAND } from "../errors.ts";

export function extractMoveDataFromString(
  rawString: string,
): Operation<{ count: number; from: string; to: string }> {
  /**
   * Three groups:
   * 1. Optional count (0-9)
   * 2. Move source (t<id>, f<id>, w)
   * 3. Move destination (t<id>, f)
   */
  const stringMatchArray = rawString.match(/^(\d{0,})([wtf]\d?)([wtf]\d?)$/);
  if (stringMatchArray === null) {
    return err(INVALID_COMMAND);
  }

  const [_, countMatch, sourceMatch, destinationMatch] = stringMatchArray;

  const count = countMatch.length ? parseInt(countMatch) : 1;

  return ok({
    count,
    from: sourceMatch,
    to: destinationMatch,
  });
}
