"use client";

import { getCommentsForUserApi } from "@/api/comment";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import Link from "next/link";
import { LuCornerDownRight, LuMessageSquare } from "react-icons/lu";
import { MdOutlineComment } from "react-icons/md";
import { Spinner } from "../UI/spinner";
import TimeAgoComponent from "../post/TimeAgoComponent";

//#region Font Declaration
const inter = Inter({ subsets: ["latin"] });
//#endregion

const RecentComments = () => {
  //#region React Query Hooks
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["user-comments"],
    queryFn: ({ pageParam }) => {
      return getCommentsForUserApi(pageParam, 6);
    },
    select: (data) => data.pages,
    initialPageParam: 1,
    getNextPageParam: (lastpage) =>
      lastpage.data?.hasNextPage ? lastpage.data.currentPage + 1 : undefined,
  });

  const comments = data?.flatMap((value) => value.data?.comments ?? []);
  //#endregion

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="text-2xl text-slate-400 flex justify-center">
          <Spinner className="size-5" />
        </div>
      )}

      {isError && (
        <div className="text-sm text-red-400">
          Failed to load comments. Please try again.
        </div>
      )}

      {comments?.length === 0 && !isLoading && (
        <div className="text-sm text-slate-500 text-center">
          No recent comments to display.
        </div>
      )}

      {comments?.map((comment) => {
        const isReply = !!comment.parentId;
        return (
          <div
            key={comment.id}
            className="hover:bg-[#212a3f] transition-colors bg-[#1a2233] p-5 backdrop-blur-sm w-full"
          >
            <div className="flex items-start gap-3 w-full">
              <MdOutlineComment className="text-primary text-lg mt-0.5 shrink-0" />
              <div className={cn(inter.className, "w-full min-w-0")}>
                <div className="flex flex-wrap gap-2 justify-between items-center mb-2">
                  {/* Post title link */}
                  <Link
                    href={`/post/${comment.post.id}`}
                    className="text-sm font-semibold text-white hover:text-primary transition-colors"
                  >
                    {comment.post.title}
                  </Link>

                  {/* Reply indicator badge */}
                  {isReply && (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-sky-400 bg-sky-400/10 rounded-full px-2 py-0.5",
                        inter.className,
                      )}
                    >
                      <LuCornerDownRight size={10} />
                      Reply
                    </span>
                  )}
                </div>

                {/* Comment Content */}
                <p className="text-sm text-slate-400 leading-relaxed my-3 line-clamp-3">
                  {comment.content}
                </p>

                <div className="text-slate-500 flex flex-row gap-2 flex-wrap items-center justify-between w-full">
                  {/* Time */}
                  <div className="uppercase text-[10px] tracking-tighter font-bold">
                    <TimeAgoComponent date={new Date(comment.createdAt)} />
                  </div>

                  {/* Reply count */}
                  {comment.replyCount > 0 && (
                    <div
                      className={cn(
                        "flex items-center gap-1 text-slate-300 flex-row text-[0.7em]",
                        inter.className,
                      )}
                    >
                      <LuMessageSquare size={13} />
                      {comment.replyCount}{" "}
                      {comment.replyCount === 1 ? "Reply" : "Replies"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {hasNextPage && (
        <button
          type="button"
          className="rounded-sm block w-full outline-2 outline-primary-dark cursor-pointer px-5 py-2 text-sm font-semibold text-primary"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading more..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default RecentComments;
