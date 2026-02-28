import { assert, assertEquals } from "@std/assert";
import { COUNTER_FIXTURE, FOUNDATIONS_FIXTURE, TABLEAUS_FIXTURE } from "../../fixtures/index.ts";
import { extractMoveDataFromString } from "../parsing/extractMoveDataFromString.ts";

Deno.test("util | extractMoveDataFromString | full string", () => {
  COUNTER_FIXTURE.forEach((c) => {
    TABLEAUS_FIXTURE.forEach((t) => {
      FOUNDATIONS_FIXTURE.forEach((f) => {
        const command = `${c}${t}${f}`;

        const result = extractMoveDataFromString(command);
        assert(result.ok);

        const { from, to, count } = result.value;
        assertEquals(from, t);
        assertEquals(to, f);
        assertEquals(count, c);
      });
    });
  });
});

Deno.test("util | extractMoveDataFromString | only locations string", () => {
  TABLEAUS_FIXTURE.forEach((sourceExample) => {
    TABLEAUS_FIXTURE.forEach((destinationExample) => {
      const command = `${sourceExample}${destinationExample}`;

      const result = extractMoveDataFromString(command);

      assert(result.ok);

      const { from, to, count } = result.value;
      assertEquals(from, sourceExample);
      assertEquals(to, destinationExample);
      assertEquals(count, 1);
    });
  });
});

Deno.test("util | extractMoveDataFromString | from foundation to tableau", () => {
  FOUNDATIONS_FIXTURE.forEach((sourceExample) => {
    TABLEAUS_FIXTURE.forEach((destinationExample) => {
      const command = `${sourceExample}${destinationExample}`;

      const result = extractMoveDataFromString(command);

      assert(result.ok);

      const { from, to, count } = result.value;
      assertEquals(from, sourceExample);
      assertEquals(to, destinationExample);
      assertEquals(count, 1);
    });
  });
});

Deno.test("util | extractMoveDataFromString | from tableau to foundation", () => {
  TABLEAUS_FIXTURE.forEach((sourceExample) => {
    FOUNDATIONS_FIXTURE.forEach((destinationExample) => {
      const command = `${sourceExample}${destinationExample}`;

      const result = extractMoveDataFromString(command);

      assert(result.ok);
      const { from, to, count } = result.value;

      assertEquals(from, sourceExample);
      assertEquals(to, destinationExample);
      assertEquals(count, 1);
    });
  });
});

Deno.test("util | extractMoveDataFromString | from waste to foundation", () => {
  FOUNDATIONS_FIXTURE.forEach((destinationExample) => {
    const command = `w${destinationExample}`;

    const result = extractMoveDataFromString(command);

    assert(result.ok);

    const { from, to, count } = result.value;

    assertEquals(from, "w");
    assertEquals(to, destinationExample);
    assertEquals(count, 1);
  });
});

Deno.test("util | extractMoveDataFromString | from waste to tableau", () => {
  TABLEAUS_FIXTURE.forEach((destinationExample) => {
    const command = `w${destinationExample}`;

    const result = extractMoveDataFromString(command);

    assert(result.ok);

    const { from, to, count } = result.value;
    assertEquals(from, "w");
    assertEquals(to, destinationExample);
    assertEquals(count, 1);
  });
});

Deno.test("util | extractCommandDataFromString | errored | single digit", () => {
  const command = "1";

  const result = extractMoveDataFromString(command);
  assert(!result.ok);
});

Deno.test("util | extractCommandDataFromString | errored | only source", () => {
  const command = "t1";

  const result = extractMoveDataFromString(command);

  assert(!result.ok);
});
