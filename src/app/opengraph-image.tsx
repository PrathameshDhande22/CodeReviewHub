import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "72px 80px",
        background:
          "linear-gradient(135deg, #0a1429 0%, #0f1e3d 50%, #0a1429 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow blobs */}
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "200px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Brand chip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "36px",
          padding: "8px 18px",
          borderRadius: "999px",
          border: "1px solid rgba(56,189,248,0.3)",
          background: "rgba(56,189,248,0.08)",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "#38bdf8",
          }}
        />
        <span
          style={{
            color: "#38bdf8",
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            fontFamily: "sans-serif",
          }}
        >
          codereviewhub.prathameshd.com
        </span>
      </div>

      {/* Main headline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: "72px",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            fontFamily: "sans-serif",
          }}
        >
          Elevate Your
        </span>
        <span
          style={{
            color: "#38bdf8",
            fontSize: "72px",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            fontFamily: "sans-serif",
          }}
        >
          Code Quality
        </span>
      </div>

      {/* Subtitle */}
      <p
        style={{
          color: "#94a3b8",
          fontSize: "22px",
          fontWeight: 400,
          lineHeight: 1.5,
          marginTop: "28px",
          maxWidth: "600px",
          fontFamily: "sans-serif",
        }}
      >
        The definitive collaborative platform where Stack Overflow meets GitHub
        PRs.
      </p>

      {/* Bottom stats bar */}
      <div
        style={{
          position: "absolute",
          bottom: "56px",
          left: "80px",
          right: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "40px" }}>
          {[
            { value: "12,400+", label: "Architects" },
            { value: "1.2M", label: "Lines Reviewed" },
            { value: "85k", label: "Resolved Issues" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <span
                style={{
                  color: "#38bdf8",
                  fontSize: "22px",
                  fontWeight: 800,
                  fontFamily: "sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  color: "#64748b",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "sans-serif",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Site name top-right */}
        <span
          style={{
            color: "#475569",
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          CodeReview Hub
        </span>
      </div>
    </div>,
    { ...size },
  );
}
