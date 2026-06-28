"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { copy } from "@/lib/copy";

const PQ_M1 = 2610 / 16384;
const PQ_M2 = (2523 / 4096) * 128;
const PQ_C1 = 3424 / 4096;
const PQ_C2 = (2413 / 4096) * 32;
const PQ_C3 = (2392 / 4096) * 32;
export function pqEncode(nits: number) {
  const L = Math.max(0, nits) / 10000;
  const Lm = Math.pow(L, PQ_M1);
  const N = Math.pow((PQ_C1 + PQ_C2 * Lm) / (1 + PQ_C3 * Lm), PQ_M2);
  return Math.min(1, Math.max(0, N));
}

function gridClassForWindow(size: number) {
  if (size >= 100) return "grid-cols-1";
  if (size >= 25) return "grid-cols-2";
  if (size >= 10) return "grid-cols-3";
  if (size >= 5) return "grid-cols-4";
  return "grid-cols-4 sm:grid-cols-8";
}

function itemClassForWindow(size: number) {
  if (size >= 100) return "h-48 md:h-64";
  return "aspect-square";
}

function computeLayout(
  windowSize: number,
  width: number,
  height: number,
  stepCount: number,
  gap: number
) {
  if (windowSize >= 100) {
    const rows = stepCount;
    const cellH = Math.max(40, (height - gap * (rows - 1)) / rows);
    return { cols: 1, rows, cellW: width, cellH };
  }
  if (width < 520) {
    const cols = windowSize >= 10 ? 2 : 4;
    const rows = Math.ceil(stepCount / cols);
    const cellW = Math.max(40, (width - gap * (cols - 1)) / cols);
    const cellH = Math.max(40, (height - gap * (rows - 1)) / rows);
    return { cols, rows, cellW, cellH };
  }
  const targetAreaFrac = windowSize / 100;
  const containerArea = Math.max(1, width * height);
  const cellArea = targetAreaFrac * containerArea;
  let cellSize = Math.max(24, Math.sqrt(cellArea));
  let cols = Math.max(1, Math.floor((width + gap) / (cellSize + gap)));
  let rows = Math.ceil(stepCount / cols);
  while (rows * cellSize + (rows - 1) * gap > height && cellSize > 28) {
    cellSize *= 0.95;
    cols = Math.max(1, Math.floor((width + gap) / (cellSize + gap)));
    rows = Math.ceil(stepCount / cols);
  }
  return { cols, rows, cellW: cellSize, cellH: cellSize };
}

function textColorForNits(nits: number) {
  const progress = Math.min(1, Math.max(0, Math.log10(Math.max(nits, 0.01) / 100) / Math.log10(16)));
  return progress > 0.45 ? "#07090d" : "#f4f7fb";
}

type RenderColorSpace = "rec2100-pq" | "display-p3" | "srgb";

type HdrStepWedgeProps = {
  steps: number[];
  selected: number | null;
  onSelect: (nits: number) => void;
  windowSize: number;
  className?: string;
  fullscreen?: boolean;
  clipCheck?: boolean;
  labelForStep?: (nits: number) => React.ReactNode;
  ariaLabelForStep?: (nits: number) => string;
  textColorForStep?: (nits: number) => string;
  heightClassName?: string;
};

function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGL2RenderingContext, vsSource: string, fsSource: string) {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

function clipNitsFor(base: number) {
  // Use a noticeably brighter value so clipping causes the checker to disappear.
  return Math.min(10000, Math.round(base * 1.5));
}

function encodeForColorSpace(nits: number, colorSpace: RenderColorSpace) {
  return colorSpace === "rec2100-pq" ? pqEncode(nits) : 1;
}

function markerEncodeForColorSpace(nits: number, colorSpace: RenderColorSpace) {
  if (colorSpace === "rec2100-pq") return pqEncode(clipNitsFor(nits));
  return 1;
}

function getHdrOutputEnabled() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(dynamic-range: high)").matches ||
    window.matchMedia("(video-dynamic-range: high)").matches
  );
}

function tryWebGl2Context(canvas: HTMLCanvasElement, colorSpace?: RenderColorSpace) {
  try {
    return canvas.getContext("webgl2", {
      ...(colorSpace ? { colorSpace } : {}),
      premultipliedAlpha: false,
      alpha: false,
    } as WebGLContextAttributes) as WebGL2RenderingContext | null;
  } catch {
    return null;
  }
}

function getWebGl2Context(canvas: HTMLCanvasElement) {
  const attempts: RenderColorSpace[] = ["rec2100-pq", "display-p3"];

  for (const colorSpace of attempts) {
    const gl = tryWebGl2Context(canvas, colorSpace);
    if (!gl) continue;
    if (!("drawingBufferColorSpace" in gl)) {
      if (colorSpace === "display-p3") return { gl, colorSpace: "srgb" as RenderColorSpace };
      continue;
    }
    try {
      (gl as unknown as { drawingBufferColorSpace: string }).drawingBufferColorSpace = colorSpace;
    } catch {
      continue;
    }
    if ((gl as unknown as { drawingBufferColorSpace: string }).drawingBufferColorSpace === colorSpace) {
      return { gl, colorSpace };
    }
  }

  const gl = tryWebGl2Context(canvas);
  return gl ? { gl, colorSpace: "srgb" as RenderColorSpace } : null;
}

export function HdrStepWedge({
  steps,
  selected,
  onSelect,
  windowSize,
  className = "",
  fullscreen = false,
  clipCheck = false,
  labelForStep,
  ariaLabelForStep,
  textColorForStep,
  heightClassName,
}: HdrStepWedgeProps) {
  const c = copy.peakBrightness;
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const pqLocRef = useRef<WebGLUniformLocation | null>(null);
  const clipPqLocRef = useRef<WebGLUniformLocation | null>(null);
  const checkerSizeLocRef = useRef<WebGLUniformLocation | null>(null);
  const vaoRef = useRef<WebGLVertexArrayObject | null>(null);
  const colorSpaceRef = useRef<RenderColorSpace>("srgb");
  const [supported, setSupported] = useState<boolean | null>(null);
  const [hdrOutputEnabled, setHdrOutputEnabled] = useState(false);
  const [containerSize, setContainerSize] = useState<{ width: number; height: number } | null>(null);
  const effectiveColorSpace: RenderColorSpace =
    hdrOutputEnabled && colorSpaceRef.current === "rec2100-pq" ? "rec2100-pq" : "srgb";

  const gridStyle: React.CSSProperties | undefined = useMemo(() => {
    if (!containerSize) return undefined;
    const layout = computeLayout(windowSize, containerSize.width, containerSize.height, steps.length, 8);
    return {
      gridTemplateColumns: `repeat(${layout.cols}, ${layout.cellW}px)`,
      gridTemplateRows: `repeat(${layout.rows}, ${layout.cellH}px)`,
      justifyContent: "center",
      alignContent: "center",
    };
  }, [containerSize, windowSize, steps.length]);

  // Measure the container so we can size grid cells to the requested window area.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      const rect = container.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };
    measure();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(container);
    }
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Initialize WebGL2 HDR canvas.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = getWebGl2Context(canvas);
    if (!context) {
      setSupported(false);
      return;
    }
    const { gl, colorSpace } = context;
    colorSpaceRef.current = colorSpace;

    const program = createProgram(
      gl,
      `#version 300 es
      in vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }`,
      `#version 300 es
      precision mediump float;
      uniform float u_pq;
      uniform float u_clipPq;
      uniform float u_checkerSize;
      out vec4 outColor;
      void main() {
        float v = u_pq;
        if (u_clipPq >= 0.0 && u_checkerSize > 0.0) {
          vec2 c = floor(gl_FragCoord.xy / u_checkerSize);
          float checker = mod(c.x + c.y, 2.0);
          v = mix(u_pq, u_clipPq, checker);
        }
        outColor = vec4(v, v, v, 1.0);
      }`
    );
    if (!program) {
      setSupported(false);
      return;
    }

    const positionLoc = gl.getAttribLocation(program, "a_position");
    const pqLoc = gl.getUniformLocation(program, "u_pq");
    const clipPqLoc = gl.getUniformLocation(program, "u_clipPq");
    const checkerSizeLoc = gl.getUniformLocation(program, "u_checkerSize");
    if (positionLoc < 0 || !pqLoc || !clipPqLoc || !checkerSizeLoc) {
      setSupported(false);
      return;
    }

    const vao = gl.createVertexArray();
    const vbo = gl.createBuffer();
    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    programRef.current = program;
    pqLocRef.current = pqLoc;
    clipPqLocRef.current = clipPqLoc;
    checkerSizeLocRef.current = checkerSizeLoc;
    vaoRef.current = vao;
    glRef.current = gl;
    setSupported(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dynamicRangeQuery = window.matchMedia("(dynamic-range: high)");
    const videoDynamicRangeQuery = window.matchMedia("(video-dynamic-range: high)");
    const update = () => setHdrOutputEnabled(getHdrOutputEnabled());

    update();
    dynamicRangeQuery.addEventListener("change", update);
    videoDynamicRangeQuery.addEventListener("change", update);
    return () => {
      dynamicRangeQuery.removeEventListener("change", update);
      videoDynamicRangeQuery.removeEventListener("change", update);
    };
  }, []);

  const draw = () => {
    const gl = glRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const program = programRef.current;
    const pqLoc = pqLocRef.current;
    const clipPqLoc = clipPqLocRef.current;
    const checkerSizeLoc = checkerSizeLocRef.current;
    const vao = vaoRef.current;
    if (!gl || !canvas || !container || !program || !pqLoc || !clipPqLoc || !checkerSizeLoc || !vao) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    gl.bindVertexArray(vao);
    gl.enable(gl.SCISSOR_TEST);

    for (let i = 0; i < steps.length; i += 1) {
      const cell = cellRefs.current[i];
      if (!cell) continue;
      const cellRect = cell.getBoundingClientRect();
      const x = (cellRect.left - rect.left) * dpr;
      const y = (rect.bottom - cellRect.bottom) * dpr;
      const w = cellRect.width * dpr;
      const h = cellRect.height * dpr;

      // Base patch.
      gl.scissor(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
      gl.uniform1f(pqLoc, encodeForColorSpace(steps[i], effectiveColorSpace));
      gl.uniform1f(clipPqLoc, -1);
      gl.uniform1f(checkerSizeLoc, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Optional HDR highlight-clip checker marker.
      if (clipCheck && effectiveColorSpace === "rec2100-pq") {
        const markerCss = Math.max(16, Math.min(cellRect.width, cellRect.height) * 0.25);
        const marginCss = 4;
        if (markerCss + marginCss * 2 <= Math.min(cellRect.width, cellRect.height)) {
        const mx = (cellRect.left - rect.left + cellRect.width - markerCss - marginCss) * dpr;
        const my = (rect.bottom - cellRect.bottom + cellRect.height - markerCss - marginCss) * dpr;
        const mw = markerCss * dpr;
        const mh = markerCss * dpr;
        gl.scissor(Math.round(mx), Math.round(my), Math.round(mw), Math.round(mh));
        gl.uniform1f(pqLoc, encodeForColorSpace(steps[i], effectiveColorSpace));
        gl.uniform1f(clipPqLoc, markerEncodeForColorSpace(steps[i], effectiveColorSpace));
        gl.uniform1f(checkerSizeLoc, Math.max(2, 4 * dpr));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
      }
    }

    gl.disable(gl.SCISSOR_TEST);
    gl.bindVertexArray(null);
  };

  useEffect(() => {
    if (supported !== true) return;
    // Defer drawing to the next frame so the DOM cells have finished layout.
    const raf = requestAnimationFrame(draw);
    const timeout = setTimeout(draw, 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [supported, steps, windowSize, selected, containerSize, clipCheck, effectiveColorSpace, fullscreen]);

  useEffect(() => {
    if (supported !== true) return;
    const container = containerRef.current;
    if (!container) return;

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => draw());
      ro.observe(container);
    }

    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);

    // Redraw once fonts have settled to ensure cell positions are final.
    const fontPromise =
      typeof document !== "undefined" && "fonts" in document
        ? (document as unknown as { fonts: { ready: Promise<unknown> } }).fonts.ready
            .then(() => draw())
            .catch(() => undefined)
        : undefined;

    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [supported]);

  if (supported === false) {
    return (
      <div>
        <div className="mb-3 rounded-[8px] border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-pearl">
          <p className="font-semibold text-amber-300">
            {c.hdrFallbackTitleZh} / {c.hdrFallbackTitle}
          </p>
          <p className="mt-1 text-mist/90">
            {c.hdrFallbackDescZh} {c.hdrFallbackDesc}
          </p>
        </div>
        <div className={`grid min-w-0 gap-2 ${gridClassForWindow(windowSize)}`}>
          {steps.map((nits) => {
          const isSelected = selected === nits;
          const progress = Math.min(1, Math.max(0, Math.log10(Math.max(nits, 0.01) / 100) / Math.log10(16)));
          const lightness = Math.round((0.42 + 0.5 * progress) * 100);
          const glow = Math.round(progress * 28);
          const glowAlpha = 0.18 + progress * 0.55;
          return (
            <button
              key={nits}
              type="button"
              onClick={() => onSelect(nits)}
              className={`relative flex items-center justify-center overflow-hidden rounded-[8px] border font-mono text-sm font-black transition hover:scale-[1.02] md:text-base ${
                isSelected
                  ? "border-gold ring-2 ring-gold ring-offset-2 ring-offset-ink"
                  : "border-white/10 hover:border-white/25"
              } ${itemClassForWindow(windowSize)}`}
              style={{
                background: `radial-gradient(circle at 30% 30%, hsl(0 0% ${lightness + 8}%), hsl(0 0% ${lightness}%))`,
                boxShadow: `0 0 ${glow}px rgba(247, 207, 105, ${glowAlpha})`,
                color: textColorForStep?.(nits) || textColorForNits(nits),
              }}
              aria-pressed={isSelected}
              aria-label={ariaLabelForStep?.(nits) || `${nits} nits`}
            >
              <span className="relative z-10">{labelForStep?.(nits) || nits}</span>
              {isSelected ? <span className="absolute right-2 top-2 text-xs">✓</span> : null}
            </button>
          );
        })}
      </div>
      </div>
    );
  }

  if (supported === true && clipCheck && effectiveColorSpace !== "rec2100-pq") {
    return (
      <div className={`${heightClassName || "min-h-[16rem] md:min-h-[24rem]"} flex items-center justify-center rounded-[8px] border border-amber-400/30 bg-black/50 p-6 text-center`}>
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">
            HDR peak test unavailable
          </p>
          <h4 className="mt-3 text-2xl font-semibold text-pearl">
            SDR mode detected
          </h4>
          <p className="mt-3 text-sm leading-7 text-mist">
            This peak brightness test requires HDR output. In SDR mode, the browser cannot render or verify HDR nits, so the peak highlight checker is disabled.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative min-w-0 ${heightClassName || "min-h-[16rem] md:min-h-[24rem]"} overflow-hidden ${
        fullscreen ? "" : "rounded-[8px]"
      } ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
      <div
        className={`relative grid h-full min-w-0 gap-2 ${gridClassForWindow(windowSize)}`}
        style={gridStyle}
      >
        {steps.map((nits, index) => {
          const isSelected = selected === nits;
          return (
            <button
              key={nits}
              ref={(node) => {
                cellRefs.current[index] = node;
              }}
              type="button"
              onClick={() => onSelect(nits)}
              className={`relative flex w-full items-center justify-center overflow-hidden rounded-[8px] border font-mono text-sm font-black transition hover:scale-[1.02] md:text-base ${
                isSelected
                  ? "border-gold ring-2 ring-gold ring-offset-2 ring-offset-ink"
                  : "border-white/10 hover:border-white/25"
              }`}
              style={{ color: textColorForStep?.(nits) || textColorForNits(nits), backgroundColor: "transparent" }}
              aria-pressed={isSelected}
              aria-label={ariaLabelForStep?.(nits) || `${nits} nits`}
            >
              <span className="relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                {labelForStep?.(nits) || nits}
              </span>
              {isSelected ? <span className="absolute right-2 top-2 text-xs">✓</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
