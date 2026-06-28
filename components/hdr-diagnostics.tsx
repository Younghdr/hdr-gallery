"use client";

import React, { useEffect, useState } from "react";

type HdrStatus = "hdr" | "css-only" | "none";

type HdrDiagnostics = {
  status: HdrStatus;
  cssRec2100Pq: boolean;
  cssDisplayP3: boolean;
  dynamicRangeHigh: boolean;
  videoDynamicRangeHigh: boolean;
  colorGamutP3: boolean;
  colorGamutRec2020: boolean;
  webglHdr: boolean;
  webglColorSpace: "rec2100-pq" | "display-p3" | "srgb" | "none";
};

function detectWebglColorSpace(): HdrDiagnostics["webglColorSpace"] {
  if (typeof document === "undefined") return "none";
  const canvas = document.createElement("canvas");

  for (const colorSpace of ["rec2100-pq", "display-p3"] as const) {
    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl2", {
        colorSpace,
        premultipliedAlpha: false,
        alpha: false,
      } as WebGLContextAttributes) as WebGL2RenderingContext | null;
    } catch {
      gl = null;
    }
    if (!gl || !("drawingBufferColorSpace" in gl)) continue;
    try {
      (gl as unknown as { drawingBufferColorSpace: string }).drawingBufferColorSpace = colorSpace;
    } catch {
      continue;
    }
    if ((gl as unknown as { drawingBufferColorSpace: string }).drawingBufferColorSpace === colorSpace) {
      return colorSpace;
    }
  }

  try {
    return canvas.getContext("webgl2") ? "srgb" : "none";
  } catch {
    return "none";
  }
}

function useHdrDiagnostics(): HdrDiagnostics | null {
  const [diagnostics, setDiagnostics] = useState<HdrDiagnostics | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof CSS === "undefined") {
      setDiagnostics({
        status: "none",
        cssRec2100Pq: false,
        cssDisplayP3: false,
        dynamicRangeHigh: false,
        videoDynamicRangeHigh: false,
        colorGamutP3: false,
        colorGamutRec2020: false,
        webglHdr: false,
        webglColorSpace: "none",
      });
      return;
    }

    const cssRec2100Pq = CSS.supports("color: color(rec2100-pq 1 1 1)");
    const cssDisplayP3 = CSS.supports("color: color(display-p3 1 1 1)");
    const dynamicRangeHigh = window.matchMedia("(dynamic-range: high)").matches;
    const videoDynamicRangeHigh = window.matchMedia("(video-dynamic-range: high)").matches;
    const colorGamutP3 = window.matchMedia("(color-gamut: p3)").matches;
    const colorGamutRec2020 = window.matchMedia("(color-gamut: rec2020)").matches;
    const webglColorSpace = detectWebglColorSpace();
    const webglHdr = webglColorSpace === "rec2100-pq";

    let status: HdrStatus;
    if (webglHdr || (cssRec2100Pq && (dynamicRangeHigh || videoDynamicRangeHigh))) {
      status = "hdr";
    } else if (cssRec2100Pq) {
      status = "css-only";
    } else {
      status = "none";
    }

    setDiagnostics({
      status,
      cssRec2100Pq,
      cssDisplayP3,
      dynamicRangeHigh,
      videoDynamicRangeHigh,
      colorGamutP3,
      colorGamutRec2020,
      webglHdr,
      webglColorSpace,
    });
  }, []);

  return diagnostics;
}

export function HdrDiagnostics() {
  const diagnostics = useHdrDiagnostics();

  if (!diagnostics) return null;
  const hdrOutputEnabled = diagnostics.dynamicRangeHigh || diagnostics.videoDynamicRangeHigh;
  const colorGamutName = hdrOutputEnabled && (diagnostics.cssDisplayP3 || diagnostics.colorGamutP3) ? "Display P3" : "sRGB";
  const webglRenderingName =
    diagnostics.webglColorSpace === "rec2100-pq"
      ? "WebGL PQ HDR"
      : diagnostics.webglColorSpace === "display-p3"
        ? "WebGL Display P3"
        : diagnostics.webglColorSpace === "srgb"
          ? "WebGL SDR"
          : "WebGL unavailable";
  const requiredChecks: { group: string; name: string; supported: boolean; enabledLabel?: boolean }[] = [
    { group: "Display Environment", name: "HDR Output", supported: hdrOutputEnabled, enabledLabel: true },
    { group: "Rendering", name: webglRenderingName, supported: diagnostics.webglColorSpace !== "none" },
    { group: "Color Gamut", name: colorGamutName, supported: colorGamutName === "Display P3" },
    { group: "Dynamic Range", name: "HDR", supported: diagnostics.dynamicRangeHigh || diagnostics.videoDynamicRangeHigh },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 pb-10 lg:px-8">
      <div className="grid gap-0 rounded-[8px] border border-gold/30 bg-gold/10 p-5 text-sm leading-6 text-pearl">
        {requiredChecks.map(({ group, name, supported, enabledLabel }, index) => (
          <React.Fragment key={`${group}-${name}`}>
            {index > 0 ? <div className="my-4 border-t border-white/12" /> : null}
            <div
              className="grid gap-3 sm:grid-cols-[minmax(12rem,0.8fr)_minmax(0,1fr)_auto] sm:items-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{group}</p>
              <p className="text-lg font-semibold text-pearl">{name}</p>
              <p className={`text-base font-bold ${supported ? "text-emerald-200" : "text-mist"}`}>
                {enabledLabel ? (supported ? "🟢 Enabled" : "Disabled") : supported ? "✓" : "–"}
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
