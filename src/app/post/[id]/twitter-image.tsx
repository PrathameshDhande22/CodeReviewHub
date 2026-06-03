import { getPostById } from "@/db/postcode.repo";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 600 };
export const contentType = "image/png";

export default async function Image({ params }: PageProps<"/post/[id]">) {
  const { id } = await params;
  const post = await getPostById(id, undefined, {
    IncludeAuther: true,
  });

  const title = post?.title ?? "Code Review Post";
  const author = post?.author?.name ?? "Anonymous";
  const language = post?.language ?? "";

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "52px 72px",
        background:
          "linear-gradient(135deg, #0a1429 0%, #0d1b35 60%, #091225 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-80px",
          right: "-80px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Brand */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "7px 18px",
          borderRadius: "999px",
          border: "1px solid rgba(56,189,248,0.25)",
          background: "rgba(56,189,248,0.07)",
          width: "fit-content",
        }}
      >
        <div
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#38bdf8",
          }}
        />
        <span
          style={{
            color: "#38bdf8",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.07em",
            fontFamily: "sans-serif",
          }}
        >
          CodeReview Hub
        </span>
      </div>

      {/* Title */}
      <h1
        style={{
          color: "#f1f5f9",
          fontSize: title.length > 60 ? "42px" : "54px",
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          fontFamily: "sans-serif",
          margin: 0,
          maxWidth: "900px",
        }}
      >
        {title.length > 80 ? title.slice(0, 80) + "…" : title}
      </h1>

      {/* Bottom */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #1e3a5f, #0f1e3d)",
            border: "2px solid rgba(56,189,248,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#38bdf8",
            fontSize: "15px",
            fontWeight: 700,
            fontFamily: "sans-serif",
          }}
        >
          {author.charAt(0).toUpperCase()}
        </div>
        <span
          style={{
            color: "#94a3b8",
            fontSize: "16px",
            fontFamily: "sans-serif",
          }}
        >
          {author}
        </span>
        {language && (
          <>
            <span
              style={{
                color: "#334155",
                fontSize: "16px",
                fontFamily: "sans-serif",
              }}
            >
              ·
            </span>
            <span
              style={{
                color: "#38bdf8",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                padding: "4px 12px",
                borderRadius: "6px",
                background: "rgba(56,189,248,0.1)",
                border: "1px solid rgba(56,189,248,0.2)",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
              }}
            >
              {language}
            </span>
          </>
        )}
      </div>
    </div>,
    { ...size },
  );
}
