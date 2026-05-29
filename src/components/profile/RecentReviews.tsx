"use client";

import { getReviewsForUserApi } from "@/api/review";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import Link from "next/link";
import { FiCode } from "react-icons/fi";
import { LuMessageSquare } from "react-icons/lu";
import { Spinner } from "../UI/spinner";
import PostStatusBadge from "../post/PostStatusBadge";
import TimeAgoComponent from "../post/TimeAgoComponent";

//#region Font Declaration
const inter = Inter({ subsets: ["latin"] });
//#endregion

//#region Dynamic Imports
const MarkdownPreview = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Spinner className="text-sm" />,
  },
);
//#endregion

const RecentReviews = () => {
  //#region React Query Hooks
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["user-reviews"],
    queryFn: ({ pageParam }) => {
      return getReviewsForUserApi(pageParam, 6, "newest");
    },
    select: (data) => data.pages,
    initialPageParam: 1,
    getNextPageParam: (lastpage) =>
      lastpage.data?.hasNextPage ? lastpage.data.currentPage + 1 : undefined,
  });

  const reviews = data?.flatMap((value) => value.data?.reviews ?? []);
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
          Failed to reviews posts. Please try again.
        </div>
      )}

      {reviews?.length === 0 && !isLoading && (
        <div className="text-sm text-slate-500 text-center">
          No recent reviews to display.
        </div>
      )}

      {reviews?.map((review) => {
        return (
          <div
            key={review.id}
            className="hover:bg-[#212a3f] transition-colors bg-[#1a2233] p-5 backdrop-blur-sm w-full"
          >
            <div className="flex items-start gap-3 w-full">
              <FiCode className="text-primary text-lg mt-0.5 shrink-0" />
              <div className={cn(inter.className, "w-full min-w-0")}>
                <div className="flex flex-wrap gap-2 justify-between items-center">
                  {/* Post title */}
                  <Link
                    href={`/post/${review.postId}`}
                    className="text-sm font-semibold text-white mb-2"
                  >
                    {review.post.title}
                  </Link>
                  <span className="text-[0.8em]">
                    {/* Status Badge */}
                    {review.isAccepted && (
                      <PostStatusBadge status={"ACCEPTED"} />
                    )}
                  </span>
                </div>
                {/* Review Content */}
                <div className="text-sm text-slate-400 leading-relaxed my-3 w-full">
                  <MarkdownPreview
                    source={review.content}
                    style={{
                      backgroundColor: "transparent",
                      fontSize: "0.85em",
                      lineHeight: "1.7",
                      color: "#cbd5e1",
                    }}
                  />
                </div>
                <div className=" text-slate-500 flex flex-row gap-2 flex-wrap items-center justify-between w-full">
                  {/* Time  */}
                  <div className="uppercase text-[10px] tracking-tighter font-bold ">
                    <TimeAgoComponent date={new Date(review.createdAt)} />
                  </div>
                  {/* Comment count */}
                  <div
                    className={cn(
                      "flex items-center gap-1 text-slate-300 flex-row text-[0.7em]",
                      inter.className,
                    )}
                  >
                    <LuMessageSquare size={13} />
                    {review.commentCount ?? 0} Comments
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {hasNextPage && (
        <button
          type="button"
          className="rounded-sm block w-full outline-2 outline-primary-dark cursor-pointer px-5 py-2 text-sm font-semibold text-primary "
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading more..." : "Load more"}
        </button>
      )}
    </div>
  );
};

export default RecentReviews;
