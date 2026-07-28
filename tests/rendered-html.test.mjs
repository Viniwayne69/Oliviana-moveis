import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("project source contains Oliviana product copy and no starter markers", async () => {
  const page = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const buildEntry = await readFile(new URL("../dist/server/index.js", import.meta.url), "utf8");
  assert.match(page, /Oliviana Imóveis/);
  assert.match(layout, /Oliviana Imóveis/);
  assert.ok(buildEntry.length > 0);
  assert.doesNotMatch(`${page}\n${layout}`, /codex-preview|react-loading-skeleton|SkeletonPreview/);
});
