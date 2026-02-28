import { DRAW_CMD, MOVE_CMD, QUIT_CMD, UNDO_CMD } from "../internal/constants.ts";
import {
  CardDestination,
  CardDestinationInjectedIndex,
  CardSource,
  ValidMove,
  WithCmdAction,
  WithCount,
} from "./move.ts";

export type CommandUndo = WithCmdAction<typeof UNDO_CMD>;
export type CommandQuit = WithCmdAction<typeof QUIT_CMD>;
export type CommandDraw = WithCmdAction<typeof DRAW_CMD> & WithCount;

export type CommandMoveRaw = WithCount & {
  from: CardSource;
  to: CardDestination;
};

export type CommandMoveInjectedIndex = WithCount & {
  from: CardSource;
  to: CardDestinationInjectedIndex;
};

export type CommandMove = ValidMove & {
  action: typeof MOVE_CMD;
};

export type CommandParsed =
  | CommandQuit
  | CommandUndo
  | CommandDraw
  | CommandMove;
