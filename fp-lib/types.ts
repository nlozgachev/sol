import {
  COMMAND_NOT_FOUND,
  INVALID_COMMAND,
  INVALID_MOVE,
  PARSING_ERROR,
  WRONG_VALIDATOR,
} from "../internal/errors.ts";

export type Ok<T> = { ok: true; value: T };
export type Err<T> = { ok: false; err: T };

export type Either<E, A> = Ok<A> | Err<E>;

export type OperationError =
  | typeof PARSING_ERROR
  | typeof INVALID_COMMAND
  | typeof INVALID_MOVE
  | typeof WRONG_VALIDATOR
  | typeof COMMAND_NOT_FOUND;

export type Operation<A> = Either<OperationError, A>;
