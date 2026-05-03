"use client";

import { highlightCode } from "@/lib/shiki";
import { CodeStatus } from "@generated/prisma/enums";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import PostStatusBadge from "./PostStatusBadge";

import { deletePostapi } from "@/api/postcode";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import PostDeleteConfirmModal from "./PostDeleteConfirmModal";
import TagDisplay from "./TagDisplay";

interface PostShortProps {
  title: string;
  description: string;
  language: string;
  tag: string[];
  createdTime: Date;
  code: string;
  id: string;
  status: CodeStatus;
  published: boolean;
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
  published,
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
  const queryclient = useQueryClient();
  const router = useRouter();

  const handleDelete = useCallback((postId: string) => {
    deletePostapi(postId).then((res) => {
      if (res.status === "success" && res.data === postId) {
        queryclient.invalidateQueries({
          queryKey: ["recent-posts"],
          exact: false,
        });
        toast.success("Post deleted successfully");
      } else {
        toast.error(res.message || "Failed to delete post");
      }
    });
  }, []);

  const handleEdit = () => {
    router.push(`/post/${id}/edit`);
  };

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
      <article className="rounded-xl hover:bg-[#293550] transition-colors bg-[#202a40] p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3 sm:gap-0 flex-wrap justify-between">
          {/* Title and Language */}
          <div className="flex flex-row flex-wrap gap-2 items-center">
            {/* Title */}
            <Link href={`/post/${id}`}>
              <h3
                className={`${space_grotesk.className} text-lg font-bold text-slate-200 leading-snug py-1`}
              >
                {title}
              </h3>
            </Link>
            {/* Language */}
            <span
              className={`${jetbrains_mono.className} border bg-[#1a2746] text-xs border-gray-500/90 text-green-300 px-3`}
            >
              {language}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-lg transition-colors"
              onClick={handleEdit}
            >
              <FiEdit2 className="text-sm" />
            </button>
            <PostDeleteConfirmModal
              postId={id}
              onDelete={() => handleDelete(id)}
            />
            <PostStatusBadge status={status} isDraft={!published} />
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
          className={cn(
            `${inter.className} mt-3 text-sm text-slate-300 leading-relaxed`,
            !published && "text-slate-400",
          )}
        >
          {description}
        </p>

        {/* Syntax-highlighted code preview */}
        {code && (
          <div className="mt-4 rounded-lg overflow-hidden border-s-4 border-[#2f4a63]">
            {codeHtml ? (
              <div
                className="text-sm [&>pre]:p-4 [&>pre]:m-0 [&>pre]:overflow-x-auto"
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
        <TagDisplay tag={tag} />
      </article>
    </div>
  );
};

export default PostShort;
