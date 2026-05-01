"use client";

import { getRecentPosts } from "@/api/postcode";
import { useInfiniteQuery } from "@tanstack/react-query";
import PostShort from "@/components/post/PostShort";
import { Spinner } from "@/components/UI/spinner";

const RecentPost = () => {
  const PAGE_SIZE = 10;

  const {
    data,
    hasNextPage,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["recent-posts"],
    queryFn: (context) => {
      const pageParam = (context as { pageParam?: number }).pageParam;
      return getRecentPosts(pageParam ?? 0, PAGE_SIZE);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const itemCount = lastPage.data?.length ?? 0;
      return itemCount === PAGE_SIZE ? pages.length * PAGE_SIZE : undefined;
    },
  });

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
              description={post.description ?? ""}
              code={post.code ?? ""}
              language={post.language}
              createdTime={new Date(post.createdAt)}
              tag={post.postTags.map((t) => t.tag.name)}
              status={post.status}
              published={post.published}
            />
          </div>
        );
      })}

      {hasNextPage && (
        <button
          type="button"
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
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
