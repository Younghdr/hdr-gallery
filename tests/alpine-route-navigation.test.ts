import assert from "node:assert/strict";
import test from "node:test";

import {
  clampRouteStep,
  getRouteWheelAction,
  routeProgressForFrame,
  shouldCaptureRouteInput,
} from "../lib/alpine-route-navigation.ts";
import {roundProjectedPoint} from "../lib/alpine-route-geometry.ts";

test("releases upward scrolling at the first stop", () => {
  assert.equal(getRouteWheelAction(-80, 0, 12, false), "release");
});

test("moves exactly one stop for interior wheel input", () => {
  assert.equal(getRouteWheelAction(80, 4, 12, false), "next");
  assert.equal(getRouteWheelAction(-80, 4, 12, false), "previous");
});

test("ignores wheel noise inside the dead zone", () => {
  assert.equal(getRouteWheelAction(8, 4, 12, false), "none");
});

test("completes at the final stop and releases after completion", () => {
  assert.equal(getRouteWheelAction(80, 12, 12, false), "complete");
  assert.equal(getRouteWheelAction(80, 12, 12, true), "release");
});

test("clamps direct navigation to the route boundaries", () => {
  assert.equal(clampRouteStep(-1, 12), 0);
  assert.equal(clampRouteStep(7, 12), 7);
  assert.equal(clampRouteStep(13, 12), 12);
});

test("lands exactly on each waypoint progress at its target frame", () => {
  const progress = [0, 0.2, 0.55, 1];

  assert.equal(routeProgressForFrame(0, 24, progress), 0);
  assert.equal(routeProgressForFrame(24, 24, progress), 0.2);
  assert.equal(routeProgressForFrame(48, 24, progress), 0.55);
});

test("interpolates route drawing between adjacent waypoint frames", () => {
  const progress = [0, 0.2, 0.6];

  assert.equal(routeProgressForFrame(36, 24, progress), 0.4);
  assert.equal(routeProgressForFrame(999, 24, progress), 0.6);
});

test("normalizes projected coordinates for stable server hydration", () => {
  assert.deepEqual(
    roundProjectedPoint([1073.157175420473, 878.2397281706417]),
    [1073.157, 878.24],
  );
});

test("keeps route input captured until the active transition finishes", () => {
  assert.equal(shouldCaptureRouteInput(-1, 0, false, true), true);
  assert.equal(shouldCaptureRouteInput(1, 12, true, true), true);
  assert.equal(shouldCaptureRouteInput(-1, 0, false, false), false);
  assert.equal(shouldCaptureRouteInput(1, 12, true, false), false);
});
