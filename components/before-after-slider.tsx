"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "SDR",
  afterLabel = "HDR",
  alt = "HDR comparison",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
}) {
  const [split, setSplit] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateSplit = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = (x / rect.width) * 100;
      setSplit(percent);
    },
    [],
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    setIsDragging(true);
    updateSplit(e.clientX);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    updateSplit(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as Element).releasePointerCapture?.(e.pointerId);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: PointerEvent) => updateSplit(e.clientX);
    const onUp = () => setIsDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [isDragging, updateSplit]);

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="relative w-full cursor-ew-resize select-none overflow-hidden rounded-[8px] bg-ink"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ touchAction: "none" }}
      >
        {/* SDR (before) - full width */}
        <img
          src={beforeSrc}
          alt={`${alt} ${beforeLabel}`}
          className="block w-full"
          draggable={false}
        />

        {/* HDR (after) - clipped by split */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        >
          <img
            src={afterSrc}
            alt={`${alt} ${afterLabel}`}
            className="block w-full max-w-none"
            draggable={false}
          />
        </div>

        {/* Divider line + handle */}
        <div
          className="absolute top-0 bottom-0 z-10 w-0.5 bg-white/80 shadow-lg"
          style={{ left: `${split}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-xl md:p-2">
            <svg className="h-6 w-6 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 z-10 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
          {beforeLabel}
        </span>
        <span className="absolute top-3 right-3 z-10 rounded bg-black/60 px-2 py-1 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
          {afterLabel}
        </span>
      </div>

      <p className="mt-2 text-center text-xs text-mist">
        ?? HDR ????????????
      </p>
    </div>
  );
}
