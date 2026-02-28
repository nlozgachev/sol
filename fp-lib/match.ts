import { Either } from "./types.ts";

export function match<E, A, B>(
  r: Either<E, A>,
  cases: { ok: (a: A) => B; err: (e: E) => B },
): B {
  return r.ok ? cases.ok(r.value) : cases.err(r.err);
}
