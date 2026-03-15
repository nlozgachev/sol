import type { Result } from "@nlozgachev/pipelined/core";
import {
  COMMAND_NOT_FOUND,
  INVALID_COMMAND,
  INVALID_MOVE,
  PARSING_ERROR,
  WRONG_VALIDATOR,
} from "../internal/errors.ts";

export type OperationError =
  | typeof PARSING_ERROR
  | typeof INVALID_COMMAND
  | typeof INVALID_MOVE
  | typeof WRONG_VALIDATOR
  | typeof COMMAND_NOT_FOUND;

export type Operation<A> = Result<OperationError, A>;
