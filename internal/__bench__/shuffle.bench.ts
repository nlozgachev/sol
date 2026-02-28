import { generateDeck } from "../util/generateDeck.ts";
import { secureRandom } from "../util/secureRandom.ts";
import { shuffle } from "../util/shuffle.ts";

Deno.bench("shuffle", () => {
  shuffle(generateDeck(), secureRandom);
});
