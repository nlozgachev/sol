import { assert } from "@std/assert";
import { range } from "../range.ts";

Deno.bench("range | 1-1000", () => {
  assert(range(1, 1000).length === 1000);
});

Deno.bench("range | 1-10000", () => {
  assert(range(1, 10000).length === 10000);
});

Deno.bench("range | 1-100000", () => {
  assert(range(1, 100000).length === 100000);
});
