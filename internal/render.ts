import { GameState } from "../types/game.ts";
import { colorCard } from "./util/colorCard.ts";

export function render(game: GameState, cmd: string, message: string): void {
  console.clear();

  // Foundation
  console.log(
    "  " + game.foundation.map((_, index) => `f${index + 1}`).join("  "),
  );
  const foundationLine = game.foundation
    .map((pile) => {
      const upperCard = pile.at(-1);
      return upperCard ? colorCard({ card: upperCard, padded: false }) : "__"; // Use colorCard for empty piles too
    })
    .join("  ");
  console.log("  " + foundationLine);
  console.log("");

  // Stock and Waste
  const stockStr = game.stock.length ? "[##]" : "[  ]";
  const wasteCard = game.waste.at(-1);
  const wasteStr = wasteCard ? `{${colorCard({ card: wasteCard, padded: false })}}` : "{__}";

  console.log(`  ${stockStr} ${wasteStr}`);

  console.log("");

  console.log(
    "  " + game.tableau.map((_, index) => `t${index + 1}`).join("  "),
  );

  const maxLen = Math.max(...game.tableau.map((col) => col.length));
  for (let row = 0; row < maxLen; row++) {
    const line = game.tableau
      .map((col) => {
        const card = col[row];
        if (!card) return "".padEnd(4);
        return card.faceUp ? colorCard({ card, padded: true }) : "##".padEnd(4);
      })
      .join("");
    console.log("  " + line);
  }

  if (message) console.log(message);
  console.log(cmd);
}
