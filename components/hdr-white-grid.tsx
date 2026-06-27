"use client";

import React, { useEffect, useRef, useState } from "react";
import { pqEncode } from "@/components/hdr-step-wedge";

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

function whiteNits(value: number, maxNits = 1600) {
  // Reference white ~203 nits for SDR 235; 255 maps to peak highlight.
  if (value >= 235) {
    return Math.min(maxNits, Math.round(203 + ((value - 235) / (255 - 235)) * (maxNits - 203)));
  }
  return Math.max(100, Math.round(100 + ((value - 224) / (235 - 224)) * (203 - 100)));
}

type HdrWhiteGridProps = {
  values: number[];
  selected?: number;
  onSelect: (value: number) => void;
};

export function HdrWhiteGrid({ values, selected, onSelect }: HdrWhiteGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const pqLocRef = useRef<WebGLUniformLocation | null>(null);
  const vaoRef = useRef<WebGLVertexArrayObject | null>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext("webgl2", {
        colorSpace: "rec2100-pq",
        premultipliedAlpha: false,
        alpha: false,
      } as WebGLContextAttributes) as WebGL2RenderingContext | null;
    } catch {
      try {
        gl = canvas.getContext("webgl2", {
          premultipliedAlpha: false,
          alpha: false,
        }) as WebGL2RenderingContext | null;
      } catch {
        gl = null;
      }
    }
    if (!gl) return;
    if (!("drawingBufferColorSpace" in gl)) return;
    try {
      (gl as unknown as { drawingBufferColorSpace: string }).drawingBufferColorSpace = "rec2100-pq";
    } catch {
      return;
    }
    if ((gl as unknown as { drawingBufferColorSpace: string }).drawingBufferColorSpace !== "rec2100-pq") return;

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
      out vec4 outColor;
      void main() {
        outColor = vec4(u_pq, u_pq, u_pq, 1.0);
      }`
    );
    if (!program) return;

    const positionLoc = gl.getAttribLocation(program, "a_position");
    const pqLoc = gl.getUniformLocation(program, "u_pq");
    if (positionLoc < 0 || !pqLoc) return;

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
    vaoRef.current = vao;
    glRef.current = gl;
    setSupported(true);
  }, []);

  const draw = () => {
    const gl = glRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const program = programRef.current;
    const pqLoc = pqLocRef.current;
    const vao = vaoRef.current;
    if (!gl || !canvas || !container || !program || !pqLoc || !vao) return;

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

    for (let i = 0; i < values.length; i += 1) {
      const cell = cellRefs.current[i];
      if (!cell) continue;
      const cellRect = cell.getBoundingClientRect();
      const x = (cellRect.left - rect.left) * dpr;
      const y = (rect.bottom - cellRect.bottom) * dpr;
      const w = cellRect.width * dpr;
      const h = cellRect.height * dpr;
      gl.scissor(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
      gl.uniform1f(pqLoc, pqEncode(whiteNits(values[i])));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    gl.disable(gl.SCISSOR_TEST);
    gl.bindVertexArray(null);
  };

  useEffect(() => {
    if (!supported) return;
    const raf = requestAnimationFrame(draw);
    const timeout = setTimeout(draw, 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [supported, values, selected]);

  useEffect(() => {
    if (!supported) return;
    const container = containerRef.current;
    if (!container) return;
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => draw());
      ro.observe(container);
    }
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [supported]);

  return (
    <div ref={containerRef} className="relative min-w-0 rounded-[8px] border border-white/10 bg-black/12 p-2.5">
      <div className="mb-2 flex items-center justify-between px-1 font-mono text-[0.68rem] text-mist">
        <span>{values[0]}</span>
        <span>{values[values.length - 1]}</span>
      </div>
      {supported ? <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full rounded-[8px]" /> : null}
      <div className="relative z-10 grid min-w-0 grid-cols-4 gap-2">
        {values.map((value, index) => (
          <button
            key={value}
            type="button"
            ref={(node) => {
              cellRefs.current[index] = node;
            }}
            onClick={() => onSelect(value)}
            className={`relative flex aspect-[5/3] min-h-12 items-center justify-center overflow-hidden rounded-[4px] border font-mono text-xs font-black leading-none transition sm:min-h-16 sm:text-sm md:text-base ${
              selected === value
                ? "ring-2 ring-gold ring-offset-2 ring-offset-ink"
                : "hover:ring-1 hover:ring-gold/60"
            } ${supported ? "border-white/10 text-ink" : "border-white/10 text-pearl"}`}
            style={
              supported
                ? { backgroundColor: "transparent" }
                : {
                    backgroundColor: "rgb(255, 255, 255)",
                    color: `rgb(${value}, ${value}, ${value})`,
                    backgroundImage: `linear-gradient(45deg, rgb(${value},${value},${value}) 25%, rgb(255,255,255) 25%, rgb(255,255,255) 50%, rgb(${value},${value},${value}) 50%, rgb(${value},${value},${value}) 75%, rgb(255,255,255) 75%, rgb(255,255,255))`,
                    backgroundSize: "18px 18px",
                  }
            }
            aria-label={`Near White RGB ${value}`}
            title={`Near White RGB ${value}`}
          >
            <span className="relative z-10">{value}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
