import { getPostById } from "@/db/postcode.repo";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STATUS_COLORS: Record<string, string> = {
  OPEN: "#22c55e",
  ACCEPTED: "#38bdf8",
  CLOSED: "#f59e0b",
};

export default async function Image({ params }: PageProps<"/post/[id]">) {
  "use cache";
  cacheLife("hours");
  const { id } = await params;
  const post = await getPostById(id, undefined, {
    IncludeAuther: true,
    IncludeTags: true,
  });

  const title = post?.title ?? "Code Review Post";
  const description =
    post?.description ?? "View this code review on CodeReview Hub";
  const author = post?.author?.name ?? "Anonymous";
  const language = post?.language ?? "";
  const status = post?.status ?? "OPEN";
  const tags = post?.postTags?.map((t) => t.tag.name) ?? [];
  const statusColor = STATUS_COLORS[status] ?? "#38bdf8";

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 72px",
        background:
          "linear-gradient(135deg, #0a1429 0%, #0d1b35 60%, #091225 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow — top right */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.10) 0%, transparent 70%)",
        }}
      />
      {/* Bottom left glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-60px",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Top row: brand + status */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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

        {/* Status badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "7px",
            padding: "6px 16px",
            borderRadius: "999px",
            border: `1px solid ${statusColor}44`,
            background: `${statusColor}15`,
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: statusColor,
            }}
          />
          <span
            style={{
              color: statusColor,
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              fontFamily: "sans-serif",
            }}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Middle: title + description */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          flex: 1,
          justifyContent: "center",
          paddingTop: "24px",
        }}
      >
        <h1
          style={{
            color: "#f1f5f9",
            fontSize: title.length > 60 ? "38px" : "48px",
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

        {description && (
          <p
            style={{
              color: "#64748b",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: 1.5,
              margin: 0,
              maxWidth: "820px",
              fontFamily: "sans-serif",
            }}
          >
            {description.length > 120
              ? description.slice(0, 120) + "…"
              : description}
          </p>
        )}
      </div>

      {/* Bottom row: author | language | tags */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "20px",
        }}
      >
        {/* Left: author */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1e3a5f, #0f1e3d)",
              border: "2px solid rgba(56,189,248,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#38bdf8",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "sans-serif",
            }}
          >
            {author.charAt(0).toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                color: "#cbd5e1",
                fontSize: "15px",
                fontWeight: 600,
                fontFamily: "sans-serif",
              }}
            >
              {author}
            </span>
            <span
              style={{
                color: "#475569",
                fontSize: "12px",
                fontFamily: "sans-serif",
              }}
            >
              Author
            </span>
          </div>
        </div>

        {/* Right: language + tags */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {language && (
            <div
              style={{
                padding: "5px 14px",
                borderRadius: "6px",
                background: "rgba(56,189,248,0.1)",
                border: "1px solid rgba(56,189,248,0.2)",
                color: "#38bdf8",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
              }}
            >
              {language}
            </div>
          )}
          {tags.slice(0, 2).map((tag) => (
            <div
              key={tag}
              style={{
                padding: "5px 12px",
                borderRadius: "6px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#94a3b8",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
