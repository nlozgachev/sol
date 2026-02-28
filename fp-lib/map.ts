import { Either } from "./types.ts";
import { ok } from "./util.ts";

/**
 * Applies a function to the value of an `Either` if it is a success. If the `Either` is a failure, it returns the `Either` as is.
 */
export function map<E, A, B>(r: Either<E, A>, f: (a: A) => B): Either<E, B> {
  return r.ok ? ok(f(r.value)) : r;
}
