import { Either } from "./types.ts";

/**
 * Applies a function to the value of an `Either` if it is a success.
 *
 * If the `Either` is a failure, it returns the `Either` as is.
 */
export function chain<E, A, B>(fn: (value: A) => Either<E, B>) {
  return (r: Either<E, A>): Either<E, B> => (r.ok ? fn(r.value) : r);
}
