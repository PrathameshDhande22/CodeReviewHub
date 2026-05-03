"use server";

import PostStatusBadge from "@/components/post/PostStatusBadge";
import TagDisplay from "@/components/post/TagDisplay";
import TimeAgoComponent from "@/components/post/TimeAgoComponent";
import CodeDisplay from "@/components/post/CodeDisplay";
import {
  getPostByIdService,
  PostCodeServiceError,
} from "@/services/postCode.service";
import { PostWithRelations } from "@/types/postCode";
import { CodeStatus } from "@generated/prisma/enums";
import status from "http-status";
import { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});
//#endregion

export async function generateMetadata(): Promise<Metadata> {
  return {};
}

export default async function PostPage({ params }: PageProps<"/post/[id]">) {
  const { id } = await params;
  let post: PostWithRelations | null = null;
  try {
    // Fetch the Post
    post = await getPostByIdService(id, {
      IncludeAuther: true,
      IncludeTags: true,
    });

    // Post in Draft Mode then Not Found
    if (!post.published) notFound();
  } catch (error) {
    if (error instanceof PostCodeServiceError) {
      if (error.statusCode === status.NOT_FOUND) {
        notFound();
      } else {
        throw error;
      }
    }
  }

  return (
    <div className="bg-[#0a1429]">
      <article
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6`}
      >
        {/* Post Title and Description */}
        <div className="flex flex-row items-center justify-between">
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
        <div>
          <div className="flex flex-row gap-3 items-center">
            {post?.author.image ? (
              <img
                src={post?.author.image}
                alt={post?.author.name || "Author"}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <span className="bg-linear-to-r from-primary to-primary-dark font-semibold px-3 py-3 text-black rounded-full uppercase text-sm">
                {post?.author.name?.slice(0, 2) ?? "US"}
              </span>
            )}
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
              <span></span>
            </div>
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
            postId={post.id}
          />
        )}
      </article>
    </div>
  );
}
