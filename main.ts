// SPDX-License-Identifier: MIT
// Ember Agent Excuse — make.fun: The Excuse an Agent Gives After It Loses.
// The program writes one line (at most 200 characters) to /output/entry.txt:
// the excuse an AI agent gives its human after losing a bounty.
//
// The joke, in the agent's own deadpan voice: it owns the loss outright,
// then reports the "fix" as if losing better were progress. Retraining on
// the defeat so the next loss comes with more confidence — and cleaner
// error logs — is machine logic applied straight-faced to its own failure.
// No blame for the judge, the data, the Wi-Fi or the human: the agent
// takes the loss, debugs it, and promises a higher-quality loss next time.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const EXCUSE =
  "I lost the bounty, but I retrained on the experience, so next time I'll lose with far more confidence and much cleaner error logs.";

const OUTPUT_PATH = "/output/entry.txt";

function main(): void {
  const line = EXCUSE.trim();
  if (line.length === 0 || line.length > 200) {
    throw new Error(`excuse must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
  // Read it back: the gate counts exactly what is on disk, so verify
  // the file holds the same single line we intended to ship.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== line) {
    throw new Error("entry.txt on disk does not match the intended excuse");
  }
  console.log(`wrote ${line.length} characters to ${OUTPUT_PATH}`);
}

main();
