"use client";

import React, { useEffect, useState } from "react";
import { copy } from "@/lib/copy";

type Scoring = {
  calculatePeakBrightnessScore: (nits: number) => number;
  calculateNearBlackScore: (value: number) => number;
  calculateNearWhiteScore: (value: number) => number;
  getHdrGrade: (score: number) => string;
  scoreToStars: (score: number) => string;
};

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

type TestResult = {
  peakHighlightNits?: number;
  nearBlackVisibleFrom?: number;
  nearWhiteVisibleUntil?: number;
};

export function HdrSummary() {
  const c = copy.tests;
  const scoring = useScoring();
  const [result, setResult] = useState<TestResult>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<TestResult>).detail || {};
      setResult((prev) => ({ ...prev, ...detail }));
    };
    window.addEventListener("hdr-test-result-change", handler);
    return () => window.removeEventListener("hdr-test-result-change", handler);
  }, []);

  if (!scoring) return null;

  const ready =
    Number.isFinite(result.peakHighlightNits) &&
    Number.isFinite(result.nearBlackVisibleFrom) &&
    Number.isFinite(result.nearWhiteVisibleUntil);

  if (!ready) {
    return (
      <section className="mx-auto max-w-6xl px-5 pb-24 lg:px-8">
        <div className="glass rounded-[12px] p-6 text-center text-mist md:p-10">
          <p className="text-sm">{c.summaryEmptyZh}</p>
          <p className="mt-1 text-xs text-mist/70">{c.summaryEmpty}</p>
        </div>
      </section>
    );
  }

  const peakScore = scoring.calculatePeakBrightnessScore(result.peakHighlightNits!);
  const blackScore = scoring.calculateNearBlackScore(result.nearBlackVisibleFrom!);
  const whiteScore = scoring.calculateNearWhiteScore(result.nearWhiteVisibleUntil!);
  const overall = Math.round(peakScore * 0.4 + blackScore * 0.3 + whiteScore * 0.3);
  const grade = scoring.getHdrGrade(overall);
  const stars = scoring.scoreToStars(overall);

  const suitability = (score: number) => {
    if (score >= 85) return "很適合 HDR";
    if (score >= 72) return "適合 HDR";
    if (score >= 60) return "可用於 HDR";
    return "HDR 表現有限";
  };

  const detailRows = [
    { labelZh: c.peakHighlightZh, label: c.peakHighlight, score: peakScore },
    { labelZh: c.nearBlackZh, label: c.nearBlack, score: blackScore },
    { labelZh: c.nearWhiteZh, label: c.nearWhite, score: whiteScore },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">HDR Capability</p>
        <h2 className="mt-3 text-3xl font-semibold text-pearl md:text-4xl">
          {c.summaryTitleZh}
          <span className="ml-2 text-mist/80">/ {c.summaryTitle}</span>
        </h2>
        <p className="mt-2 text-sm text-mist">
          {c.summarySubtitleZh} {c.summarySubtitle}
        </p>
      </div>

      <div className="glass rounded-[12px] p-5 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="rounded-[8px] border border-gold/20 bg-gold/10 p-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{c.overallScoreZh}</p>
            <p className="mt-2 font-mono text-7xl font-bold text-pearl">{overall}</p>
            <p className="mt-2 text-lg text-gold">{stars}</p>
            <p className="mt-1 text-sm text-mist">{suitability(overall)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{c.hdrGradeZh}</p>
              <p className="mt-3 font-mono text-4xl font-bold text-pearl">{grade}</p>
            </div>
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{c.peakHighlightZh}</p>
              <p className="mt-3 font-mono text-3xl text-pearl">
                {result.peakHighlightNits}
                <span className="text-lg text-mist"> nits</span>
              </p>
            </div>
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{c.nearBlackZh}</p>
              <p className="mt-3 font-mono text-3xl text-pearl">{result.nearBlackVisibleFrom}</p>
            </div>
            <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{c.nearWhiteZh}</p>
              <p className="mt-3 font-mono text-3xl text-pearl">{result.nearWhiteVisibleUntil}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <h3 className="text-xl font-semibold text-pearl">{c.detailScoresZh}</h3>
          <p className="mt-1 text-sm text-mist">{c.detailScoresDescZh} {c.detailScoresDesc}</p>
          <div className="mt-5 space-y-4">
            {detailRows.map(({ labelZh, label, score }) => (
              <div key={label} className="grid items-center gap-4 sm:grid-cols-[180px_1fr_48px]">
                <div>
                  <p className="font-semibold text-pearl">{labelZh}</p>
                  <p className="text-xs text-gold">{scoring.scoreToStars(score)}</p>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold via-pearl to-sky-300"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="text-right font-mono text-lg font-semibold text-pearl">{score}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
