import { assert } from "@std/assert";
import { chain } from "../chain.ts";
import { ok } from "../util.ts";

Deno.bench("chain", () => {
  assert(chain(() => ok("value"))(ok("value_2")).ok);
});
