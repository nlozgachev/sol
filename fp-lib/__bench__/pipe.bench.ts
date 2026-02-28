import { assert } from "@std/assert";
import { pipe } from "../pipe.ts";

Deno.bench("pipe", () => {
  assert(pipe("value", (v) => v));
});
