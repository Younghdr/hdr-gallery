"use client";

import React, { useEffect, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import { HdrStepWedge } from "@/components/hdr-step-wedge";

type Scoring = {
  calculatePeakBrightnessScore: (nits: number) => number;
  calculateSustainedWhiteScore: (nits: number) => number;
  getHdrGrade: (score: number) => string;
  scoreToStars: (score: number) => string;
};

const NIT_STEPS = [100, 200, 400, 600, 800, 1000, 1200, 1600];
const PEAK_WINDOWS = [1, 5, 10];

function windowButtonLabel(size: number) {
  const c = copy.peakBrightness;
  const zh =
    size === 1
      ? c.window1
      : size === 5
        ? c.window5
        : size === 10
          ? c.window10
          : size === 25
            ? c.window25
            : c.window100;
  const en = size === 100 ? "Full White" : `${size}% window`;
  return `${zh} / ${en}`;
}

function useScoring() {
  const [scoring, setScoring] = useState<Scoring | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const win = window as unknown as { HDRScoring?: Scoring };
    if (win.HDRScoring) {
      setScoring(win.HDRScoring);
      return;
    }
    const id = setInterval(() => {
      if (win.HDRScoring) {
        setScoring(win.HDRScoring);
        clearInterval(id);
      }
    }, 100);
    return () => clearInterval(id);
  }, []);

  return scoring;
}

function useFullscreen(ref: React.RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handler = () => {
      setActive(document.fullscreenElement === ref.current);
    };
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, [ref]);

  const toggle = async () => {
    if (!ref.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await ref.current.requestFullscreen();
    }
  };

  return { active, toggle };
}

function WindowToggle({
  options,
  value,
  onChange,
}: {
  options: number[];
  value: number;
  onChange: (value: number) => void;
}) {
  const c = copy.peakBrightness;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {c.windowSizeLabelZh} / {c.windowSizeLabel}
      </span>
      {options.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => onChange(size)}
          className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
            size === value
              ? "bg-gold text-ink"
              : "border border-white/15 bg-white/8 text-pearl hover:bg-white/14"
          }`}
        >
          {windowButtonLabel(size)}
        </button>
      ))}
    </div>
  );
}

function ResultCard({ peakNits }: { peakNits: number | null }) {
  const c = copy.peakBrightness;
  const scoring = useScoring();

  let grade = "--";
  let stars = "☆☆☆☆☆";

  if (scoring && peakNits) {
    const peakScore = scoring.calculatePeakBrightnessScore(peakNits);
    grade = scoring.getHdrGrade(peakScore);
    stars = scoring.scoreToStars(peakScore);
  }

  return (
    <section className="mx-auto max-w-3xl px-5 pb-24 lg:px-8">
      <div className="glass rounded-[12px] p-6 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
          {c.resultTitle}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-pearl md:text-4xl">
          {c.resultTitleZh}
        </h2>

        <div className="mt-8 rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
            {c.peakLabelZh}
          </p>
          <p className="mt-2 font-mono text-3xl text-pearl">
            {peakNits ?? "--"}{" "}
            <span className="text-lg text-mist">{c.nitsLabel}</span>
          </p>
          <p className="mt-1 text-sm text-mist">{c.peakLabel}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[8px] border border-gold/30 bg-gold/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {c.gradeLabelZh}
            </p>
            <p className="mt-2 font-mono text-5xl font-bold text-pearl">
              {peakNits ? grade : "--"}
            </p>
            <p className="mt-1 text-sm text-mist">{c.gradeLabel}</p>
          </div>
          <div className="rounded-[8px] border border-gold/30 bg-gold/10 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {c.starsLabelZh}
            </p>
            <p className="mt-2 font-mono text-4xl text-pearl">
              {peakNits ? stars : "--"}
            </p>
            <p className="mt-1 text-sm text-mist">{c.starsLabel}</p>
          </div>
        </div>

        <div className="mt-6 rounded-[8px] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-mist">
          {c.noteZh} {c.note}
        </div>
      </div>
    </section>
  );
}

function TestSection({
  titleZh,
  title,
  subtitleZh,
  subtitle,
  windows,
  windowSize,
  onWindowChange,
  selectedNits,
  onSelectNits,
  ctaFullscreen,
  ctaExitFullscreen,
}: {
  titleZh: string;
  title: string;
  subtitleZh: string;
  subtitle: string;
  windows: number[];
  windowSize: number;
  onWindowChange: (size: number) => void;
  selectedNits: number | null;
  onSelectNits: (nits: number) => void;
  ctaFullscreen: string;
  ctaExitFullscreen: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { active, toggle } = useFullscreen(ref);
  const c = copy.peakBrightness;

  const selectedIndex = NIT_STEPS.indexOf(selectedNits ?? -1);
  const previousStep = selectedIndex > 0 ? NIT_STEPS[selectedIndex - 1] : null;

  const controls = (
    <>
      <WindowToggle
        options={windows}
        value={windowSize}
        onChange={onWindowChange}
      />
      <button
        type="button"
        onClick={() => void toggle()}
        className="inline-flex items-center justify-center rounded-[8px] border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold text-pearl transition hover:bg-white/14"
      >
        {active ? ctaExitFullscreen : ctaFullscreen}
      </button>
    </>
  );

  const titleBlock = (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {title}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-pearl md:text-3xl">
        {titleZh}
      </h3>
      <p className={`${active ? "hidden sm:block" : "block"} mt-2 max-w-2xl text-sm leading-7 text-mist`}>
        {subtitleZh}
      </p>
      <p className={`${active ? "hidden md:block" : "block"} mt-1 max-w-2xl text-sm leading-7 text-mist/80`}>
        {subtitle}
      </p>
      <p className={`${active ? "hidden sm:block" : "block"} mt-2 text-xs text-mist/60`}>
        {c.fullscreenNoteZh} / {c.fullscreenNote}
      </p>
      <p className={`${active ? "hidden sm:block" : "block"} mt-1 text-xs text-gold/90`}>
        {c.clipGuideZh} {c.clipGuide}
      </p>
    </div>
  );

  const hintBlock = selectedNits !== null ? (
    <p className="text-sm text-gold">
      {c.clipRangeHintZh(selectedNits, previousStep)} {c.clipRangeHint(selectedNits, previousStep)}
    </p>
  ) : (
    <p className="text-sm text-mist/70">
      {c.clipGuideZh} {c.clipGuide}
    </p>
  );

  if (active) {
    return (
      <section
        ref={ref}
        className="fixed inset-0 z-50 h-[100dvh] w-screen overflow-hidden bg-ink"
      >
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex max-h-[34dvh] flex-col gap-3 overflow-y-auto bg-gradient-to-b from-ink/95 to-transparent p-3 md:max-h-none md:flex-row md:items-start md:justify-between md:p-6">
          <div className="pointer-events-auto">{titleBlock}</div>
          <div className="pointer-events-auto flex flex-col items-start gap-2 md:items-end md:gap-3">
            {controls}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-14 top-[8.5rem] sm:top-[10rem] md:inset-0">
          <HdrStepWedge
            steps={NIT_STEPS}
            selected={selectedNits}
            onSelect={onSelectNits}
            windowSize={windowSize}
            fullscreen
            clipCheck
            className="h-full w-full"
          />
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-ink/90 to-transparent p-3 md:p-6">
          <div className="pointer-events-auto mx-auto max-w-3xl text-center">
            {hintBlock}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="mx-auto max-w-6xl px-5 pb-16 lg:px-8"
    >
      <div className="glass overflow-hidden rounded-[12px] p-5 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          {titleBlock}
          <div className="flex flex-col items-start gap-3 md:items-end">
            {controls}
          </div>
        </div>

        <div className="mt-8 rounded-[8px] border border-white/10 bg-black/30 p-2.5 sm:p-4 md:p-6">
          <HdrStepWedge
            steps={NIT_STEPS}
            selected={selectedNits}
            onSelect={onSelectNits}
            windowSize={windowSize}
            clipCheck
            heightClassName="min-h-[18rem] sm:min-h-[20rem] md:min-h-[24rem]"
          />
        </div>
        {hintBlock}
      </div>
    </section>
  );
}

export function PeakBrightnessTest() {
  const c = copy.peakBrightness;
  const [peakWindow, setPeakWindow] = useState(5);
  const [peakNits, setPeakNits] = useState<number | null>(null);
  const handlePeakNitsChange = (nits: number) => {
    setPeakNits(nits);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("hdr-test-result-change", {
          detail: { peakHighlightNits: nits },
        })
      );
    }
  };

  return (
    <>
      <TestSection
        titleZh={c.peakSectionTitleZh}
        title={c.peakSectionTitle}
        subtitleZh={c.peakSectionSubtitleZh}
        subtitle={c.peakSectionSubtitle}
        windows={PEAK_WINDOWS}
        windowSize={peakWindow}
        onWindowChange={setPeakWindow}
        selectedNits={peakNits}
        onSelectNits={handlePeakNitsChange}
        ctaFullscreen={c.fullscreen}
        ctaExitFullscreen={c.exitFullscreen}
      />

      <ResultCard peakNits={peakNits} />
    </>
  );
}
