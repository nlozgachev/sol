import { Err, Ok } from "./types.ts";

export function ok<T>(value: T): Ok<T> {
  return { ok: true, value };
}

export function err<T>(err: T): Err<T> {
  return { ok: false, err };
}
