"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { trackEvent } from "@/components/analytics";
import type { MusicItem } from "@/lib/site-data";

function musicPath(src: string) {
  if (/^https?:\/\//.test(src)) return src;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const normalized = src.startsWith("/") ? src : `/${src}`;
  if (basePath && normalized.startsWith(`${basePath}/`)) return normalized;
  return `${basePath}${normalized}`;
}

function buildPlaylist(playlist: MusicItem[]): MusicItem[] {
  if (playlist.length) return playlist;
  const legacySrc = process.env.NEXT_PUBLIC_MUSIC_SRC || "";
  if (legacySrc) return [{ title: "Music", src: legacySrc }];
  return [];
}

export function MusicPlayer({ playlist = [] }: { playlist?: MusicItem[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const tracks = buildPlaylist(playlist);
  const currentTrack = tracks[currentIndex];

  const trackTitle = (track: MusicItem | undefined) => track?.title || "Music";

  const playTrack = useCallback(
    async (index: number) => {
      const audio = audioRef.current;
      if (!audio || !tracks.length) return;

      const nextIndex = ((index % tracks.length) + tracks.length) % tracks.length;
      if (nextIndex !== currentIndex) {
        setCurrentIndex(nextIndex);
        audio.currentTime = 0;
      }

      try {
        await audio.play();
        setPlaying(true);
        trackEvent("music_play", {
          music_title: trackTitle(tracks[nextIndex]),
          music_src: tracks[nextIndex]?.src || "",
          track_index: nextIndex,
        });
      } catch {
        setPlaying(false);
      }
    },
    [currentIndex, tracks],
  );

  const pauseTrack = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
    trackEvent("music_pause", {
      music_title: trackTitle(currentTrack),
      music_src: currentTrack?.src || "",
      track_index: currentIndex,
    });
  }, [currentIndex, currentTrack]);

  const togglePlayback = useCallback(() => {
    if (playing) {
      pauseTrack();
    } else {
      playTrack(currentIndex);
    }
  }, [playing, pauseTrack, playTrack, currentIndex]);

  const nextTrack = useCallback(() => {
    playTrack(currentIndex + 1);
  }, [currentIndex, playTrack]);

  const previousTrack = useCallback(() => {
    playTrack(currentIndex - 1);
  }, [currentIndex, playTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (tracks.length > 1) {
        playTrack(currentIndex + 1);
      } else {
        audio.currentTime = 0;
        audio.play().catch(() => setPlaying(false));
      }
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [currentIndex, playTrack, tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    audio.load();
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    }
  }, [currentTrack]);

  if (!tracks.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <div className="glass rounded-full px-4 py-2 text-xs text-mist hidden sm:block">
        {trackTitle(currentTrack)}
      </div>
      <audio
        ref={audioRef}
        src={musicPath(currentTrack?.src || "")}
        loop={tracks.length <= 1}
        preload="none"
        aria-label={`Music player: ${trackTitle(currentTrack)}`}
      />
      <div className="glass rounded-full p-1 flex items-center gap-1">
        {tracks.length > 1 && (
          <button
            type="button"
            onClick={previousTrack}
            className="rounded-full px-3 py-2 text-sm font-semibold text-pearl transition hover:bg-white/10"
            aria-label="Previous track"
            title="Previous track"
          >
            ‹
          </button>
        )}
        <button
          type="button"
          onClick={togglePlayback}
          className="rounded-full px-5 py-3 text-sm font-semibold text-pearl transition hover:bg-white/10"
          aria-pressed={playing}
          aria-label={playing ? "Pause music" : "Play music"}
        >
          {playing ? "Pause / 暫停" : "Play / 播放"}
        </button>
        {tracks.length > 1 && (
          <button
            type="button"
            onClick={nextTrack}
            className="rounded-full px-3 py-2 text-sm font-semibold text-pearl transition hover:bg-white/10"
            aria-label="Next track"
            title="Next track"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
