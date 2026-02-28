import { draw } from "../../cmd/draw.ts";
import { applyMove } from "../../cmd/move.ts";
import { undo } from "../../cmd/undo.ts";
import { CommandParsed } from "../../types/command.ts";
import { GameCtx } from "../../types/game.ts";
import { DRAW_CMD, MOVE_CMD, QUIT_CMD, UNDO_CMD } from "../constants.ts";

type ExecuteCommandCtx = {
  command: CommandParsed;
  game: GameCtx;
};

export function executeCommand(ctx: ExecuteCommandCtx): GameCtx {
  const {
    command,
    game: { archive, state },
  } = ctx;

  switch (command.action) {
    case QUIT_CMD: {
      console.log("Bye!");
      Deno.exit(0);
      break;
    }
    case UNDO_CMD: {
      return undo({ archive, state });
    }

    case DRAW_CMD: {
      const updated = draw(command.count, state);
      return {
        archive,
        state: updated,
      };
    }

    case MOVE_CMD: {
      const updated = applyMove({ game: state, move: command });
      return {
        archive,
        state: updated,
      };
    }
  }
}
