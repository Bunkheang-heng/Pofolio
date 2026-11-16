import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveSlideIndex, wrapSlideIndex } from "./presentation.js";

test("strategy navigation loops in either direction, including repeated keyboard steps", () => {
  assert.equal(wrapSlideIndex(7, 7), 0);
  assert.equal(wrapSlideIndex(-1, 7), 6);
  assert.equal(wrapSlideIndex(-15, 7), 6);
  assert.equal(wrapSlideIndex(14, 7), 0);
  assert.equal(wrapSlideIndex(5, 0), 0);
});

test("section links resolve both a slide and its nested heading", () => {
  const slides = [
    { id: "trading-home", anchors: ["trading-hero-title"] },
    { id: "strategy-supply-demand", anchors: ["strategy-title-supply-demand"] },
  ];
  assert.equal(resolveSlideIndex("#strategy-supply-demand", slides), 1);
  assert.equal(resolveSlideIndex("#strategy-title-supply-demand", slides), 1);
  assert.equal(resolveSlideIndex("#trading%2Dhome", slides), 0);
  assert.equal(resolveSlideIndex("#not-a-slide", slides), -1);
  assert.equal(resolveSlideIndex("#broken%E0%A4%A", slides), -1);
});
