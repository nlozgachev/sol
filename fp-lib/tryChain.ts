import { Result } from "@nlozgachev/pipelined/core";
import { WRONG_VALIDATOR } from "../internal/errors.ts";
import type { Operation } from "./types.ts";

export function tryChain<T>(...fns: Array<() => Operation<T>>): Operation<T> {
  let lastResult: Operation<T> | null = null;

  for (const fn of fns) {
    const res = fn();
    if (Result.isOk(res)) return res;
    if (Result.isErr(res) && res.error === WRONG_VALIDATOR) return res;
    lastResult = res;
  }

  return lastResult!;
}
