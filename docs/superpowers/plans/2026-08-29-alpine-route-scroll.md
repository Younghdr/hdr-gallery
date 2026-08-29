# Alpine Route Scroll Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Leaflet route map on the Germany–France–Switzerland page with a scroll-stepped D3 map rendered in a control-free Remotion Player and choreographed with GSAP.

**Architecture:** A pure navigation module determines whether wheel input moves to a previous/next stop, completes the route, or releases normal page scrolling. A Remotion composition owns all visual time and uses D3 only for geometry; the host React component seeks the Player between deterministic stop frames and handles page interaction.

**Tech Stack:** Next.js 15, React 19, TypeScript, D3 7.9.0, Remotion 4.0.518, `@remotion/player` 4.0.518, `@remotion/gsap` 4.0.518, GSAP 3.15.0, Node test runner.

**Spec:** `docs/superpowers/plans/2026-08-29-alpine-route-scroll-design.md`

## Global Constraints

- All user-facing Chinese copy must use Traditional Chinese.
- All `remotion` and `@remotion/*` packages must use exact version `4.0.518`.
- D3 computes data, projection, and SVG geometry; React owns the DOM.
- Remotion owns time; GSAP timelines are driven only through `useGsapTimeline()`.
- No D3 transitions, CSS keyframes, wall-clock GSAP playback, random values, live location, hotel location, or fetch during rendering.
- Preserve unrelated working-tree changes and commit only files belonging to this feature.

---

### Task 1: Route navigation state machine

**Files:**
- Create: `lib/alpine-route-navigation.ts`
- Test: `tests/alpine-route-navigation.test.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: `RouteWheelAction`, `getRouteWheelAction(deltaY, activeIndex, lastIndex, completed)`, `clampRouteStep(index, lastIndex)`.

- [ ] **Step 1: Write the failing test**

```ts
import assert from "node:assert/strict";
import test from "node:test";
import {getRouteWheelAction} from "../lib/alpine-route-navigation.ts";

test("releases upward scrolling at the first stop", () => {
  assert.equal(getRouteWheelAction(-80, 0, 12, false), "release");
});

test("moves exactly one stop for interior wheel input", () => {
  assert.equal(getRouteWheelAction(80, 4, 12, false), "next");
  assert.equal(getRouteWheelAction(-80, 4, 12, false), "previous");
});

test("completes at the final stop and releases after completion", () => {
  assert.equal(getRouteWheelAction(80, 12, 12, false), "complete");
  assert.equal(getRouteWheelAction(80, 12, 12, true), "release");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --experimental-strip-types --test tests/alpine-route-navigation.test.ts`
Expected: FAIL because `lib/alpine-route-navigation.ts` does not exist.

- [ ] **Step 3: Write minimal implementation**

Implement a 12px dead zone, boundary release behavior, and one of `previous`, `next`, `complete`, `release`, or `none` for each wheel input.

- [ ] **Step 4: Run test to verify it passes**

Run: `node --experimental-strip-types --test tests/alpine-route-navigation.test.ts`
Expected: all navigation tests PASS.

### Task 2: Deterministic D3 Remotion composition

**Files:**
- Create: `components/alpine-route-motion.tsx`
- Create: `lib/alpine-route-stops.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `ALPINE_ROUTE_FPS`, `ALPINE_ROUTE_WIDTH`, `ALPINE_ROUTE_HEIGHT`, `FRAMES_PER_STOP`, `COMPLETE_FRAME`, `frameForStop(index)`, and `AlpineRouteMotion`.
- Consumes: exact stop coordinates and Traditional Chinese notes from the existing map.

- [ ] **Step 1: Install the Player at the exact Remotion version**

Run: `npm install --save-exact @remotion/player@4.0.518`
Expected: `remotion`, `@remotion/gsap`, and `@remotion/player` all resolve to `4.0.518`.

- [ ] **Step 2: Add shared route data**

Move the 13 city-level stops, country labels, ISO numeric IDs, and closed return coordinate into `lib/alpine-route-stops.ts` without changing values.

- [ ] **Step 3: Build the composition**

Use `geoMercator().fitExtent()`, `geoPath()`, and `line()` inside memoized calculations. Render country paths, normalized `pathLength={1}` route strokes, station circles, current train marker, and 13 GSAP-controlled information articles as declarative SVG/React elements.

- [ ] **Step 4: Verify TypeScript**

Run: `npm run lint`
Expected: exit 0 with no TypeScript errors.

### Task 3: Website interaction wrapper

**Files:**
- Create: `components/alpine-route-experience.tsx`
- Modify: `app/travel/germany-switzerland-france/page.tsx`

**Interfaces:**
- Consumes: `AlpineRouteMotion`, stop data, frame constants, and route navigation functions.
- Produces: `AlpineRouteExperience`, replacing `<AlpineRouteMap />` in the route section.

- [ ] **Step 1: Add the control-free Player**

Render `<Player controls={false} autoPlay={false}>` with a ref, responsive 16:9 sizing, no click-to-play affordance, and a fixed `durationInFrames` ending at `COMPLETE_FRAME`.

- [ ] **Step 2: Add deterministic seeking**

Animate `seekTo()` from the stored current frame to the target stop frame over 720ms using `requestAnimationFrame`; switch immediately for reduced-motion users.

- [ ] **Step 3: Add page interaction**

Use `getRouteWheelAction()` for wheel input, a single transition lock, directional touch gestures, previous/next buttons, `01 / 13` progress, and a skip control that scrolls to `#latest` after completing the route.

- [ ] **Step 4: Replace the existing map component**

Import and render `AlpineRouteExperience` in `app/travel/germany-switzerland-france/page.tsx`; leave the old Leaflet component file available until verification confirms no other imports use it.

### Task 4: Editorial responsive styling

**Files:**
- Modify: `app/travel/germany-switzerland-france/alpine.css`

**Interfaces:**
- Consumes: class names emitted by `AlpineRouteExperience` and `AlpineRouteMotion`.

- [ ] **Step 1: Replace waypoint-map styles**

Add scoped styles for the 16:9 Player, dark cartographic surfaces, country hierarchy, route halo, active stop, information rail, skip control, and bottom navigation.

- [ ] **Step 2: Add mobile behavior**

At 720px and below, keep all controls visible, reduce metadata density, stack the progress rail, and preserve readable Traditional Chinese labels without oversized headings.

- [ ] **Step 3: Add focus and reduced-motion treatment**

Keep native focus visibility, add a clear focus-within outline around the experience, and remove smooth page scrolling under `prefers-reduced-motion`.

### Task 5: Verification and GitHub publication

**Files:**
- Verify all files changed by Tasks 1–4.

**Interfaces:**
- Produces: a tested GitHub Pages build on the repository's configured `origin`.

- [ ] **Step 1: Run navigation tests**

Run: `node --experimental-strip-types --test tests/alpine-route-navigation.test.ts`
Expected: all tests PASS.

- [ ] **Step 2: Run static verification**

Run: `npm run lint`
Expected: exit 0.

- [ ] **Step 3: Build the GitHub Pages output**

Run: `npm run build:github`
Expected: Next.js static export completes with the Germany–France–Switzerland page generated.

- [ ] **Step 4: Inspect the page**

Open the local build or development page, verify desktop and mobile layouts, exercise one-step navigation, boundary release, next labels, and skip behavior, and confirm the browser console has no errors.

- [ ] **Step 5: Commit only scoped files**

Stage the dependency files, route data/navigation modules, new components, page/CSS changes, tests, and these plan files. Do not stage unrelated untracked photos, previews, or temporary directories.

- [ ] **Step 6: Publish**

Push the resulting commit to `origin/main`, then report the commit hash and GitHub Pages build status available from the repository workflow.
