import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "納米比亞旅行指南｜Young HDR Gallery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          color: "#f1e9d9",
          background: "linear-gradient(125deg, #1c1d19 0%, #29251e 56%, #6b3820 100%)",
        }}
      >
        <div style={{ display: "flex", color: "#ff7034", fontSize: 24, letterSpacing: 6 }}>YOUNG HDR · NAMIBIA FIELD GUIDE</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 82, fontFamily: "serif", lineHeight: 1.1 }}>納米比亞旅行指南</div>
          <div style={{ display: "flex", marginTop: 24, color: "#c6c0b2", fontSize: 30 }}>行程 · Safari · 攝影 · 實用準備</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#d6cdbd", fontSize: 24 }}>
          <span>ETOSHA · NAMIB · ATLANTIC COAST</span>
          <span>YOUNG HUNG HDR STUDIO</span>
        </div>
      </div>
    ),
    size,
  );
}
