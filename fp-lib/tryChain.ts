import { WRONG_VALIDATOR } from "../internal/errors.ts";
import { Either } from "./types.ts";
import { err } from "./util.ts";

export function tryChain<E, T>(
  ...fns: Array<() => Either<E, T>>
): Either<E, T> {
  let lastErr: E | null = null;

  for (const fn of fns) {
    const res = fn();
    if (res.ok) return res;
    if (res.err === WRONG_VALIDATOR) return res;
    lastErr = res.err;
  }

  return err(lastErr!);
}
