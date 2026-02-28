import { Either } from "./types.ts";

export function recover<E, A, B>(fallback: () => Either<E, B>) {
  return (r: Either<E, A>): Either<E, A | B> => (r.ok ? r : fallback());
}
