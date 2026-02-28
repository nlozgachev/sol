import { assert } from "@std/assert";
import { recover } from "../recover.ts";
import { err, ok } from "../util.ts";

Deno.bench("recover", () => {
  assert(recover(() => ok("value"))(err("error")).ok);
});
