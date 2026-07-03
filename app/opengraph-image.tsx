import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Young HDR Gallery";
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
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0f",
          color: "#f5f5f0",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          padding: 48,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.02em" }}>
          Young HDR Gallery
        </div>
        <div style={{ fontSize: 32, marginTop: 24, color: "#d4af37" }}>
          HDR Video Portfolio & Display Tests
        </div>
        <div style={{ fontSize: 24, marginTop: 16, color: "#a0a0a0" }}>
          HDR 影像作品集與顯示器測試工具
        </div>
      </div>
    ),
    { ...size }
  );
}
