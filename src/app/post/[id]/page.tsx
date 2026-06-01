"use server";

import { getOptionalServerSession } from "@/auth";
import UserProfileImage from "@/components/auth/UserProfileImage";
import PostStatusBadge from "@/components/post/PostStatusBadge";
import PostStatusUpdate from "@/components/post/PostStatusUpdate";
import Reviews from "@/components/post/Review/Reviews";
import TagDisplay from "@/components/post/TagDisplay";
import TimeAgoComponent from "@/components/post/TimeAgoComponent";
import { cn } from "@/lib/utils";
import {
  addViewToPost,
  getPostByIdService,
  PostCodeServiceError,
} from "@/services/postCode.service";
import { getReviewByUserIdForPost } from "@/services/review.service";
import { PostWithRelations } from "@/types/postCode";
import { CodeStatus } from "@generated/prisma/enums";
import status from "http-status";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});
//#endregion

// TODO: Add the seo metadata for the post.
export async function generateMetadata(): Promise<Metadata> {
  return {};
}

//#region Dynamic Imports
const CodeDisplay = dynamic(() => import("@/components/post/CodeDisplay"));
const ReviewEditor = dynamic(
  () => import("@/components/post/Review/ReviewEditor"),
);
//#endregion

export default async function PostPage({ params }: PageProps<"/post/[id]">) {
  const { id } = await params;
  let post: PostWithRelations | null = null;
  let owner: boolean = false;
  let reviewPosted: boolean = false;
  let currentUserId: string | undefined = undefined;
  try {
    // Fetch the Post
    post = await getPostByIdService(id, {
      IncludeAuther: true,
      IncludeTags: true,
      IncludeUserView: true,
    });
  } catch (error) {
    if (error instanceof PostCodeServiceError) {
      if (error.statusCode === status.NOT_FOUND) {
        notFound();
      } else {
        throw error;
      }
    }
    throw error;
  }

  // Post not found
  if (!post) notFound();

  // Post in Draft Mode — only the owner can view it
  const user = await getOptionalServerSession();
  currentUserId = user?.user.id;
  owner = user?.user.id === post.authorId;

  if (!post.published && !owner) notFound();

  // If viewed by the User Then add view to the post
  if (user && post.authorId !== user.user.id) {
    await addViewToPost(post, user.user.id);
  }

  // Fetch the Review for the LoggedIn user
  if (post.requireReview && user) {
    const reviewUser = await getReviewByUserIdForPost(id, user);
    if (reviewUser) {
      reviewPosted = true;
    }
  }

  return (
    <div className="bg-[#0a1429]">
      <article
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6`}
      >
        {/* Post Title and Description */}
        <div className="flex flex-row items-center flex-wrap gap-3 justify-between">
          <div>
            <h1
              className={`${space_grotesk.className} md:text-4xl text-3xl font-semibold text-slate-200`}
            >
              {post?.title}
            </h1>
            <p
              className={`${inter.className} mt-3 leading-7 tracking-wide text-slate-300 text-lg`}
            >
              {post?.description}
            </p>
          </div>
          <div>
            <PostStatusBadge
              status={post?.status as CodeStatus}
              isDraft={!post?.published}
            />
          </div>
        </div>
        {/* Author */}
        <div className="flex flex-row flex-wrap items-center justify-between">
          <div className="flex flex-row gap-3 items-center">
            <UserProfileImage
              badgeclassName="py-3 px-3"
              imageclassName="w-12 h-12"
              name={post?.author.name!}
              image={post?.author.image}
            />
            <div className="flex flex-col gap-0">
              <span
                className={`${inter.className} text-sm font-medium text-slate-300`}
              >
                {post?.author.name}
              </span>
              <span
                className={`${inter.className} text-sm font-medium text-slate-300`}
              >
                <TimeAgoComponent date={post?.createdAt ?? new Date()} />
              </span>
            </div>
          </div>
          <div className="flex flex-row flex-wrap gap-2 items-center">
            {/* Status Update */}
            {owner && post.status !== "ACCEPTED" && (
              <PostStatusUpdate status={post.status} postId={post.id} />
            )}

            {/* Edit Link */}
            {owner && post?.status === "OPEN" && (
              <div className={cn(inter.className, "text-sm bg-")}>
                <Link
                  href={`/post/${id}/edit`}
                  className="flex flex-row gap-1 items-center p-2 text-slate-300 hover:text-slate-400 bg-[#212b41] hover:bg-white/5 transition-colors rounded-xl px-4"
                >
                  <FiEdit2 className="text-sm" />
                  <span>Edit</span>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div>
          <TagDisplay tag={post?.postTags.map((t) => t.tag.name) ?? []} />
        </div>
        {/* Code Display */}
        {post?.code && (
          <CodeDisplay
            code={post.code}
            language={post.language}
            owner={owner}
            postStatus={post.status}
            postid={post.id}
            requireComments={post.requireComments}
          />
        )}

        {/* Reviews - Editor */}
        <div>
          {post.requireReview &&
            !reviewPosted &&
            !owner &&
            post?.status === "OPEN" && <ReviewEditor postId={post?.id!} />}
        </div>

        {/* Reviews */}
        {post.published && post.requireReview && (
          <Reviews
            postId={post?.id!}
            postStatus={post?.status!}
            currentUserId={currentUserId}
            postOwnerId={post?.authorId!}
          />
        )}
      </article>
    </div>
  );
}
