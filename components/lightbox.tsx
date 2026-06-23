"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PhotoItem } from "@/lib/site-data";
import { BeforeAfterSlider } from "./before-after-slider";

function photoPath(photo: PhotoItem) {
  const src = photo.fullSrc || photo.src;
  if (/^https?:\/\//.test(src)) return src;
  const normalized = src.startsWith("/") ? src : `/${src}`;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (basePath && normalized.startsWith(`${basePath}/`)) return normalized;
  return `${basePath}${normalized}`;
}

export function Lightbox({
  photos,
  index,
  isOpen,
  onClose,
  onChangeIndex,
}: {
  photos: PhotoItem[];
  index: number;
  isOpen: boolean;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}) {
  const current = photos[index];

  const goNext = useCallback(() => {
    onChangeIndex((index + 1) % photos.length);
  }, [index, photos.length, onChangeIndex]);

  const goPrev = useCallback(() => {
    onChangeIndex((index - 1 + photos.length) % photos.length);
  }, [index, photos.length, onChangeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      {isOpen && current ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-10 rounded-full p-2 text-pearl transition hover:bg-white/10"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-pearl transition hover:bg-white/20"
                aria-label="Previous"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-pearl transition hover:bg-white/20"
                aria-label="Next"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="max-h-[92vh] max-w-[96vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {current.sdrSrc ? (
              <BeforeAfterSlider
                beforeSrc={photoPath({ ...current, src: current.sdrSrc, fullSrc: current.sdrSrc })}
                afterSrc={photoPath(current)}
                alt={current.title || "HDR Photo"}
              />
            ) : (
              <img
                src={photoPath(current)}
                alt={current.title || "HDR Photo"}
                className="max-h-[88vh] max-w-[96vw] rounded-[8px] object-contain shadow-2xl"
              />
            )}
            {(current.title || current.description) && (
              <div className="mt-4 text-center">
                {current.title ? <h3 className="text-lg font-semibold text-pearl">{current.title}</h3> : null}
                {current.description ? <p className="mt-1 text-sm text-mist">{current.description}</p> : null}
              </div>
            )}
          </motion.div>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-mist">
            {index + 1} / {photos.length}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
