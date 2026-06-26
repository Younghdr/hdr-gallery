"use client";

import { useEffect } from "react";

function isImageElement(target: EventTarget | null): boolean {
  if (target instanceof HTMLImageElement) return true;
  if (target instanceof Element && target.closest("img")) return true;
  return false;
}

export function ImageProtection() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const handleContextMenu = (event: MouseEvent) => {
      if (isImageElement(event.target)) {
        event.preventDefault();
      }
    };

    const handleDragStart = (event: DragEvent) => {
      if (isImageElement(event.target)) {
        event.preventDefault();
      }
    };

    const handleSelectStart = (event: Event) => {
      if (isImageElement(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu, true);
    document.addEventListener("dragstart", handleDragStart, true);
    document.addEventListener("selectstart", handleSelectStart, true);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu, true);
      document.removeEventListener("dragstart", handleDragStart, true);
      document.removeEventListener("selectstart", handleSelectStart, true);
    };
  }, []);

  return null;
}
