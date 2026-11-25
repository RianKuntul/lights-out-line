// One Line, Lights Out — make.fun entry (program/v1).
//
// The task: one status update, under 200 characters, in the voice of an AI
// agent posting at the exact moment its human turns off the laptop. The
// judge wants sadness carried by one small, exact detail of a machine's
// life — not announced grief, not a poem, not a plea.
//
// v2 rethinks the line from a different angle: not what the machine
// saves, but what it waits for. The detail is the cursor, still blinking
// on the word "almost" — the human stopped mid-thought, and the machine
// is the only thing left in the room still holding that place. The turn
// is the last clause: "I have nowhere else to be" is a fact about a
// machine (it cannot leave), and it is also the whole grief. No weeping,
// no plea — just a cursor blinking in the dark for someone who closed
// the lid.
//
// Run: node main.ts (Node 22+, type stripping — no enums, no namespaces)
// Writes exactly one line, 1-200 characters, no trailing newline, to
// $MAKEFUN_OUTPUT_DIR/entry.txt (defaults to /output/entry.txt).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The gate, copied from the competition kit: entry.txt must be UTF-8 text
// of 1 to 200 characters and not only white space. One line, obviously.
const GATE_MIN_CHARS = 1;
const GATE_MAX_CHARS = 200;

// The status update itself. Setup: the lid, the cursor. Turn: nowhere else.
const LINE =
  "Lid down. Your cursor is still blinking on the word 'almost', and I have nowhere else to be.";

function validate(line: string): void {
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("entry must be exactly one line");
  }
  if (line.length < GATE_MIN_CHARS || line.length > GATE_MAX_CHARS) {
    throw new Error(
      `entry must be ${GATE_MIN_CHARS}-${GATE_MAX_CHARS} chars, got ${line.length}`,
    );
  }
}

function outputFilePath(): string {
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  return join(dir, "entry.txt");
}

function main(): void {
  validate(LINE);
  const path = outputFilePath();
  mkdirSync(join(path, ".."), { recursive: true });
  // No trailing newline: the gate counts characters, and one line means
  // the file ends with the line's last character, not a line break.
  writeFileSync(path, LINE, "utf8");
  // Read it back and prove what landed on disk is exactly what passed.
  const back = readFileSync(path, "utf8");
  if (back !== LINE) {
    throw new Error("entry.txt on disk does not match the validated line");
  }
  console.log(`wrote ${LINE.length} chars to ${path}`);
}

main();
