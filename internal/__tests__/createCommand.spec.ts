import { assert, assertEquals, fail } from "@std/assert";
import { Result } from "@nlozgachev/pipelined/core";
import { DRAW_CMD, QUIT_CMD, UNDO_CMD } from ".././constants.ts";
import { parseCommand } from "../parsing/parseCommand.ts";
import { initGame } from "../util/initGame.ts";

const testGame = initGame();

Deno.test("util | createCommand | quit", () => {
  const command = ":q";
  const result = parseCommand({ raw: command, game: testGame });

  assert(Result.isOk(result));

  if (result.value.action !== QUIT_CMD) {
    throw new Error(
      `Expected command operation to be ${QUIT_CMD.toString()}, got ${String(result.value.action)}`,
    );
  }
});

Deno.test("util | createCommand | undo", () => {
  const command = ":u";
  const result = parseCommand({ raw: command, game: testGame });

  assert(Result.isOk(result));

  assertEquals(result.value.action, UNDO_CMD);
});
Deno.test("util | createCommand | single draw", () => {
  const command = "d";
  const result = parseCommand({ raw: command, game: testGame });

  assert(Result.isOk(result));

  assertEquals(result.value.action, DRAW_CMD);
  /* type guard  */
  if (result.value.action === DRAW_CMD) {
    assertEquals(result.value.count, 1);
  }
});

Deno.test("util | createCommand | multiple draw", () => {
  const command = "3d";
  const result = parseCommand({ raw: command, game: testGame });

  assert(Result.isOk(result));
  if (result.value.action !== DRAW_CMD) {
    fail();
  }
  assertEquals(result.value.count, 3);
});
