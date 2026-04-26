"use client";

import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import PostStatusBadge from "./PostStatusBadge";
import { CodeStatus } from "@generated/prisma/enums";
import { highlightCode } from "@/lib/shiki";
import { useEffect, useState } from "react";
import Link from "next/link";

interface PostShortProps {
  title: string;
  description: string;
  language: string;
  tag: string[];
  createdTime: Date;
  code: string;
  id: string;
  status: CodeStatus;
}

//#region Font Declaration
const space_grotesk = Space_Grotesk({ subsets: ["latin"] });
const jetbrains_mono = JetBrains_Mono({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });
//#endregion

const PostShort = ({
  title,
  description,
  code,
  createdTime,
  language,
  tag,
  status,
  id,
}: PostShortProps) => {
  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(createdTime);

  const [codeHtml, setCodeHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      try {
        const html = await highlightCode(code, language);
        if (!cancelled) {
          setCodeHtml(html);
        }
      } catch (err) {
        console.error("Shiki highlighting failed:", err);
        if (!cancelled) {
          setCodeHtml(null);
        }
      }
    }

    if (code) {
      highlight();
    }

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  return (
    <div className="">
      <Link href={`/post/${id}`}>
        <article className="rounded-xl hover:bg-[#293550] transition-colors bg-[#202a40] p-5 backdrop-blur-sm">
          <div className="flex items-center gap-3 sm:gap-0 flex-wrap justify-between">
            {/* Title and Language */}
            <div className="flex flex-row flex-wrap gap-2 items-center">
              {/* Title */}
              <h3
                className={`${space_grotesk.className} text-lg font-bold text-slate-200 leading-snug py-1`}
              >
                {title}
              </h3>
              {/* Language */}
              <span
                className={`${jetbrains_mono.className} border bg-[#1a2746] text-xs border-gray-500/90 text-green-300 px-3`}
              >
                {language}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* TODO: Handle the Edit and Delete Button for the Post */}
              <button className="p-2 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-lg transition-colors">
                <FiEdit2 className="text-sm" />
              </button>
              <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors">
                <FiTrash2 className="text-sm" />
              </button>
              <PostStatusBadge status={status} />
            </div>
          </div>
          {/* time */}
          <div
            className={`${jetbrains_mono.className} mt-2 sm:mt-0 text-[0.7em] text-slate-400`}
          >
            <span>Posted On </span>
            <span>{formatted}</span>
          </div>

          {/* Description */}
          <p
            className={`${inter.className} mt-3 text-sm text-slate-300 leading-relaxed`}
          >
            {description}
          </p>

          {/* Syntax-highlighted code preview */}
          {code && (
            <div className="mt-4 rounded-lg overflow-hidden border-s-4 border-[#2f4a63]">
              {codeHtml ? (
                <div
                  className="shiki-code-block text-sm [&>pre]:p-4 [&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:max-h-64"
                  dangerouslySetInnerHTML={{ __html: codeHtml }}
                />
              ) : (
                <pre
                  className={`${jetbrains_mono.className} p-4 text-sm text-slate-300 bg-[#0d1117] overflow-x-auto max-h-64`}
                >
                  <code>{code}</code>
                </pre>
              )}
            </div>
          )}

          {/* tags */}
          <div className="flex flex-row flex-wrap gap-2 mt-3 text-xs">
            {/* TODO: Make the tag as clickable link and navigate to browse page according to that tag */}
            {tag.map((value, index) => {
              return (
                <span
                  key={index}
                  className={`${inter.className} bg-[#363e51] text-slate-300 px-3 py-1`}
                >
                  #{value}
                </span>
              );
            })}
          </div>
        </article>
      </Link>
    </div>
  );
};

export default PostShort;
