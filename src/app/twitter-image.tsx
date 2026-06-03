import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "64px 80px",
          background: "linear-gradient(135deg, #0a1429 0%, #0f1e3d 50%, #0a1429 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(56,189,248,0.13) 0%, transparent 70%)",
          }}
        />

        {/* Brand chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "28px",
            padding: "6px 16px",
            borderRadius: "999px",
            border: "1px solid rgba(56,189,248,0.3)",
            background: "rgba(56,189,248,0.08)",
          }}
        >
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#38bdf8" }} />
          <span style={{ color: "#38bdf8", fontSize: "14px", fontWeight: 600, letterSpacing: "0.06em", fontFamily: "sans-serif" }}>
            CodeReview Hub
          </span>
        </div>

        <span style={{ color: "#ffffff", fontSize: "64px", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", fontFamily: "sans-serif" }}>
          Elevate Your
        </span>
        <span style={{ color: "#38bdf8", fontSize: "64px", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", fontFamily: "sans-serif" }}>
          Code Quality
        </span>

        <p style={{ color: "#94a3b8", fontSize: "20px", fontWeight: 400, lineHeight: 1.5, marginTop: "24px", maxWidth: "580px", fontFamily: "sans-serif" }}>
          Post code · Get expert reviews · Build your reputation
        </p>
      </div>
    ),
    { ...size }
  );
}
