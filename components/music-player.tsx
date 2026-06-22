"use client";

import { useRef, useState } from "react";
import { trackEvent } from "@/components/analytics";

const musicSrc = process.env.NEXT_PUBLIC_MUSIC_SRC || "";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  if (!musicSrc) return null;

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setPlaying(true);
      trackEvent("music_play", {
        music_src: musicSrc,
      });
    } else {
      audio.pause();
      setPlaying(false);
      trackEvent("music_pause", {
        music_src: musicSrc,
      });
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} src={musicSrc} loop preload="none" />
      <button
        type="button"
        onClick={togglePlayback}
        className="glass rounded-full px-5 py-3 text-sm font-semibold text-pearl transition hover:scale-[1.03]"
        aria-pressed={playing}
      >
        {playing ? "Pause Music / 暫停音樂" : "Play Music / 播放音樂"}
      </button>
    </div>
  );
}
