"use client";

import React from "react";

const STOPS = Array.from({ length: 19 }, (_, index) => index);

function mediaPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${basePath}${path}`;
}

export function HdrVideoVisibilityTest() {
  const [selectedStop, setSelectedStop] = React.useState<number | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-5 pb-20 lg:px-8">
      <div className="glass overflow-hidden rounded-[12px] p-5 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              HDR Video Visibility Test
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-pearl">
              HDR 影片可辨識階段
            </h2>
            <p className="mt-3 text-sm leading-7 text-mist">
              使用 HDR10 / PQ / BT.2020 影片圖樣測試高光階段是否仍可分辨。這是主觀可見度測試，不是校準後的 nits 量測。
            </p>
            <p className="mt-2 text-sm leading-7 text-mist/85">
              Play the HDR10 pattern, then choose the dimmest stop that is still barely visible. If the video looks SDR or all bright bars merge, this browser may be tone-mapping the HDR signal.
            </p>

            <div className="mt-6 overflow-hidden rounded-[8px] border border-white/10 bg-black">
              <video
                className="block aspect-video w-full bg-black"
                src={mediaPath("/tests/xyla18ev_hdr10_2000nit_3min_labeled.mp4")}
                controls
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </div>

          <div className="rounded-[8px] border border-white/10 bg-black/25 p-4 md:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              最後可辨識階段
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
              {STOPS.map((stop) => (
                <button
                  key={stop}
                  type="button"
                  onClick={() => setSelectedStop(stop)}
                  className={`rounded-[8px] border px-3 py-2 text-left font-mono text-sm transition ${
                    selectedStop === stop
                      ? "border-gold bg-gold text-ink"
                      : "border-white/12 bg-white/6 text-pearl hover:border-gold/60 hover:bg-white/10"
                  }`}
                >
                  <span className="block font-bold">-{stop}</span>
                  <span className="block text-xs opacity-75">Step {stop + 1}</span>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-[8px] border border-gold/25 bg-gold/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Result
              </p>
              <p className="mt-2 text-2xl font-semibold text-pearl">
                {selectedStop === null ? "--" : `-${selectedStop} stop`}
              </p>
              <p className="mt-2 text-sm leading-7 text-mist">
                {selectedStop === null
                  ? "播放影片後，選擇你仍能勉強分辨的最暗階段。"
                  : `你在目前瀏覽器與顯示設定下，約可分辨到 -${selectedStop} stop / Step ${selectedStop + 1}。影片經過瀏覽器、系統與顯示器重新映射，結果只代表可辨識階段，不代表實際亮度。`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
