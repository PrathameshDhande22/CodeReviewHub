"use client";

import { getRecentPosts } from "@/api/postcode";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostShort from "@/components/post/PostShort";
import { Spinner } from "@/components/UI/spinner";

const RecentPost = () => {
  const PAGE_SIZE = 10;

  //#region Infinite React Query
  const {
    data,
    hasNextPage,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recent-posts"],
    queryFn: ({ pageParam }) => {
      return getRecentPosts(pageParam ?? 0, PAGE_SIZE);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const itemCount = lastPage.data?.length ?? 0;
      return itemCount === PAGE_SIZE ? pages.length * PAGE_SIZE : undefined;
    },
  });
  //#endregion

  const posts = data?.pages.flatMap((page) => page.data ?? []) ?? [];
  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="text-2xl text-slate-400 flex justify-center">
          <Spinner className="size-5" />
        </div>
      )}

      {isError && (
        <div className="text-sm text-red-400">
          Failed to load posts. Please try again.
        </div>
      )}

      {posts.length === 0 && !isLoading && (
        <div className="text-sm text-slate-500 text-center">
          No recent posts to display.
        </div>
      )}

      {posts.map((post) => {
        return (
          <div key={post.id}>
            <PostShort
              id={post.id}
              title={post.title}
              authorId={post.authorId}
              description={post.description ?? ""}
              code={post.code ?? ""}
              language={post.language}
              createdTime={new Date(post.createdAt)}
              tag={post.postTags.map((t) => t.tag.name)}
              status={post.status}
              published={post.published}
              requireComments={post.requireComments}
              requireReview={post.requireReview}
              commentsCount={post._count.comments}
              reviewCount={post._count.reviews}
            />
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

export default RecentPost;
