export type RouteWheelAction =
  | "previous"
  | "next"
  | "complete"
  | "release"
  | "none";

const WHEEL_DEAD_ZONE = 12;

export function getRouteWheelAction(
  deltaY: number,
  activeIndex: number,
  lastIndex: number,
  completed: boolean,
): RouteWheelAction {
  if (Math.abs(deltaY) < WHEEL_DEAD_ZONE) return "none";

  if (deltaY < 0) {
    return activeIndex <= 0 ? "release" : "previous";
  }

  if (completed) return "release";
  return activeIndex >= lastIndex ? "complete" : "next";
}

export function clampRouteStep(index: number, lastIndex: number): number {
  return Math.min(lastIndex, Math.max(0, index));
}

export function shouldCaptureRouteInput(
  direction: -1 | 1,
  activeIndex: number,
  completed: boolean,
  animating: boolean,
): boolean {
  if (animating) return true;
  if (direction < 0 && activeIndex <= 0) return false;
  if (direction > 0 && completed) return false;
  return true;
}

export function routeProgressForFrame(
  frame: number,
  framesPerStop: number,
  waypointProgress: readonly number[],
): number {
  if (waypointProgress.length === 0) return 0;

  const segment = Math.max(0, frame / framesPerStop);
  const fromIndex = Math.min(
    waypointProgress.length - 1,
    Math.floor(segment),
  );
  const toIndex = Math.min(waypointProgress.length - 1, fromIndex + 1);
  const localProgress = Math.min(1, segment - fromIndex);

  return (
    waypointProgress[fromIndex] +
    (waypointProgress[toIndex] - waypointProgress[fromIndex]) * localProgress
  );
}
