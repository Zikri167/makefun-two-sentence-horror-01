// Two-Sentence Horror — make.fun entry
// Writes exactly two sentences (1-400 chars) to /output/entry.txt.
// Deterministic, offline, stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY =
  "I keep my husband's slippers by the back door, where he left them the morning he never came home, because throwing them away feels like losing him twice. This morning they were warm, and the mud on their soles had not yet dried.";

function validate(text: string): void {
  if (text.length < 1 || text.length > 400) {
    throw new Error(`story must be 1-400 characters, got ${text.length}`);
  }
  if (text.trim() !== text || /\s/.test(text) && text.includes("\n")) {
    throw new Error("story must be a single line of text");
  }
  if (text.includes("\n")) {
    throw new Error("story must not contain newlines");
  }
  const periods = (text.match(/\./g) ?? []).length;
  if (periods !== 2) {
    throw new Error(`story must contain exactly 2 periods, got ${periods}`);
  }
}

function main(): void {
  validate(STORY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), STORY, "utf8");
}

main();
