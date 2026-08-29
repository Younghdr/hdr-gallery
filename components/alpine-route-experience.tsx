"use client";

import {Player, type PlayerRef} from "@remotion/player";
import {
  type WheelEvent as ReactWheelEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ALPINE_ROUTE_DURATION,
  ALPINE_ROUTE_FPS,
  ALPINE_ROUTE_HEIGHT,
  ALPINE_ROUTE_WIDTH,
  AlpineRouteMotion,
  COMPLETE_FRAME,
  frameForStop,
} from "@/components/alpine-route-motion";
import {
  clampRouteStep,
  getRouteWheelAction,
  shouldCaptureRouteInput,
} from "@/lib/alpine-route-navigation";
import {
  alpineCountryNames,
  alpineRouteStops,
} from "@/lib/alpine-route-stops";

const SEEK_DURATION_MS = 720;
const WHEEL_STEP_THRESHOLD = 44;

function easeInOutCubic(value: number): number {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export function AlpineRouteExperience() {
  const playerRef = useRef<PlayerRef>(null);
  const stageRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const animatingRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const touchStartYRef = useRef(0);
  const activeStepRef = useRef(0);
  const completedRef = useRef(false);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const lastStep = alpineRouteStops.length - 1;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    },
    [],
  );

  const seekToFrame = useCallback(
    (targetFrame: number, onFinish?: () => void) => {
      const player = playerRef.current;
      if (!player) return;

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const fromFrame = player.getCurrentFrame();
      if (reducedMotion || fromFrame === targetFrame) {
        player.seekTo(targetFrame);
        animatingRef.current = false;
        onFinish?.();
        return;
      }

      const startedAt = performance.now();
      animatingRef.current = true;

      const tick = (now: number) => {
        const elapsed = Math.min(1, (now - startedAt) / SEEK_DURATION_MS);
        const eased = easeInOutCubic(elapsed);
        player.seekTo(Math.round(fromFrame + (targetFrame - fromFrame) * eased));

        if (elapsed < 1) {
          animationFrameRef.current = requestAnimationFrame(tick);
          return;
        }

        animationFrameRef.current = null;
        animatingRef.current = false;
        onFinish?.();
      };

      animationFrameRef.current = requestAnimationFrame(tick);
    },
    [reducedMotion],
  );

  const moveToStep = useCallback(
    (nextStep: number) => {
      if (animatingRef.current) return;
      const clamped = clampRouteStep(nextStep, lastStep);
      completedRef.current = false;
      setCompleted(false);
      activeStepRef.current = clamped;
      setActiveStep(clamped);
      seekToFrame(frameForStop(clamped));
    },
    [lastStep, seekToFrame],
  );

  const scrollToNextChapter = useCallback(() => {
    document.querySelector("#latest")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [reducedMotion]);

  const completeRoute = useCallback(
    (leaveAfterCompletion = true) => {
      if (animatingRef.current) return;
      completedRef.current = true;
      setCompleted(true);
      seekToFrame(COMPLETE_FRAME, () => {
        if (leaveAfterCompletion) scrollToNextChapter();
      });
    },
    [scrollToNextChapter, seekToFrame],
  );

  const handleStepAction = useCallback(
    (direction: -1 | 1) => {
      const action = getRouteWheelAction(
        direction * WHEEL_STEP_THRESHOLD,
        activeStepRef.current,
        lastStep,
        completedRef.current,
      );

      if (action === "previous") moveToStep(activeStepRef.current - 1);
      if (action === "next") moveToStep(activeStepRef.current + 1);
      if (action === "complete") completeRoute();
    },
    [completeRoute, lastStep, moveToStep],
  );

  const handleWheel = (event: ReactWheelEvent<HTMLElement>) => {
    const direction = event.deltaY > 0 ? 1 : -1;
    const shouldCapture = shouldCaptureRouteInput(
      direction,
      activeStepRef.current,
      completedRef.current,
      animatingRef.current,
    );
    if (!shouldCapture) return;

    event.preventDefault();
    if (animatingRef.current) return;

    wheelDeltaRef.current += event.deltaY;
    if (Math.abs(wheelDeltaRef.current) < WHEEL_STEP_THRESHOLD) return;

    const stepDirection = wheelDeltaRef.current > 0 ? 1 : -1;
    wheelDeltaRef.current = 0;
    handleStepAction(stepDirection);
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? 0;
    };
    const handleTouchMove = (event: TouchEvent) => {
      const currentY = event.touches[0]?.clientY ?? touchStartYRef.current;
      const delta = touchStartYRef.current - currentY;
      const direction = delta > 0 ? 1 : -1;
      if (
        Math.abs(delta) > 6 &&
        shouldCaptureRouteInput(
          direction,
          activeStepRef.current,
          completedRef.current,
          animatingRef.current,
        )
      ) {
        event.preventDefault();
      }
    };
    const handleTouchEnd = (event: TouchEvent) => {
      const endY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
      const delta = touchStartYRef.current - endY;
      if (Math.abs(delta) >= 46) handleStepAction(delta > 0 ? 1 : -1);
    };

    stage.addEventListener("touchstart", handleTouchStart, {passive: true});
    stage.addEventListener("touchmove", handleTouchMove, {passive: false});
    stage.addEventListener("touchend", handleTouchEnd, {passive: true});
    return () => {
      stage.removeEventListener("touchstart", handleTouchStart);
      stage.removeEventListener("touchmove", handleTouchMove);
      stage.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleStepAction]);

  const selected = alpineRouteStops[activeStep];
  const nextStop = alpineRouteStops[activeStep + 1];

  return (
    <section
      ref={stageRef}
      className={`alpine-route-experience${completed ? " is-complete" : ""}`}
      aria-label="德國、法國與瑞士逐站行程動畫"
      onWheel={handleWheel}
    >
      <div className="alpine-route-player">
        <Player
          ref={playerRef}
          component={AlpineRouteMotion}
          durationInFrames={ALPINE_ROUTE_DURATION}
          compositionWidth={ALPINE_ROUTE_WIDTH}
          compositionHeight={ALPINE_ROUTE_HEIGHT}
          fps={ALPINE_ROUTE_FPS}
          controls={false}
          autoPlay={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          allowFullscreen={false}
          style={{width: "100%", height: "100%"}}
        />
      </div>

      <button
        type="button"
        className="alpine-route-skip"
        onClick={() => completeRoute()}
      >
        跳過路線 <span aria-hidden="true">↓</span>
      </button>

      <article className="alpine-route-mobile-card" aria-live="polite">
        <p>
          WAYPOINT {String(activeStep + 1).padStart(2, "0")} · {selected.country}
        </p>
        <strong>{selected.labelEn}</strong>
        <h3>
          {selected.label} · {alpineCountryNames[selected.country]}
        </h3>
        <span>{selected.note}</span>
      </article>

      <nav className="alpine-route-controls" aria-label="行程站點控制">
        <button
          type="button"
          onClick={() => moveToStep(activeStep - 1)}
          disabled={activeStep === 0}
        >
          <span aria-hidden="true">←</span> 上一站
        </button>
        <p aria-live="polite">
          <b>{String(activeStep + 1).padStart(2, "0")}</b>
          <span>/ {String(alpineRouteStops.length).padStart(2, "0")}</span>
          <small>{selected.label}</small>
        </p>
        <button
          type="button"
          className="is-primary"
          onClick={() =>
            nextStop ? moveToStep(activeStep + 1) : completeRoute()
          }
        >
          {nextStop ? `下一站 · ${nextStop.label}` : "完成路線"}{" "}
          <span aria-hidden="true">↓</span>
        </button>
      </nav>
    </section>
  );
}
