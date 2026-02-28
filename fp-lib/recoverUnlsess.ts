import { Either } from "./types.ts";

export function recoverUnless<E, A, B>(
  blockedErr: E,
  fallback: () => Either<E, B>,
) {
  return (
    r: Either<E, A>,
  ): Either<E, A | B> => (!r.ok && r.err !== blockedErr ? fallback() : r);
}
