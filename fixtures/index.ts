import { range } from "../fp-lib/range.ts";

export const COUNTER_FIXTURE = range(1, 52) as readonly number[];
export const TABLEAUS_FIXTURE = range(1, 7).map(
  (i) => `t${i}`,
) as readonly string[];
export const FOUNDATIONS_FIXTURE = range(1, 4).map(
  (i) => `f${i}`,
) as readonly string[];
