"use client";

import { useEffect, useRef } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { AutorotatePlugin } from "@photo-sphere-viewer/autorotate-plugin";
import "@photo-sphere-viewer/core/index.css";

type PanoramaViewerProps = {
  src: string;
  caption: string;
};

export function PanoramaViewer({ src, caption }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: src,
      caption,
      defaultYaw: "5deg",
      defaultPitch: "-3deg",
      defaultZoomLvl: 35,
      mousewheelCtrlKey: true,
      touchmoveTwoFingers: true,
      plugins: [[AutorotatePlugin, {
        autostartDelay: 2500,
        autostartOnIdle: true,
        autorotateSpeed: "0.65rpm",
        autorotatePitch: "-3deg",
        autorotateZoomLvl: 35,
      }]],
      navbar: ["autorotate", "zoom", "move", "caption", "fullscreen"],
    });

    return () => viewer.destroy();
  }, [caption, src]);

  return <div ref={containerRef} className="travel-panorama-viewer" aria-label={`${caption} 360 度全景`} />;
}
