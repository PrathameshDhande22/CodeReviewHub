"use server";

import { getOptionalServerSession } from "@/auth";
import PostEditForm from "@/components/post/PostEditForm";
import {
  getPostByIdService,
  PostCodeServiceError,
} from "@/services/postCode.service";
import { PostWithRelations } from "@/types/postCode";
import status from "http-status";
import { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { notFound, redirect } from "next/navigation";

//#region Font Declaration
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
});
//#endregion

// TODO: Add the Metadata for the edit Post Page
export async function generateMetadata(): Promise<Metadata> {
  const session = await getOptionalServerSession();
  return {
    title: `Edit Post`,
  };
}

export default async function EditPostPage(
  params: PageProps<"/post/[id]/edit">,
) {
  const session = await getOptionalServerSession();
  if (session == null || session.user == null) {
    redirect("/login");
  }

  // Fetch the Post Data
  const { id } = await params.params;

  // Fetch the Post Data
  let post: PostWithRelations | null = null;
  try {
    post = await getPostByIdService(id, {
      IncludeTags: true,
      IncludeAuther: true,
    });
  } catch (error) {
    if (error instanceof PostCodeServiceError) {
      if (error.statusCode === status.NOT_FOUND) {
        notFound();
      } else {
        throw error;
      }
    }
  }

  // Check the Author of the Post
  if (post?.authorId !== session.user.id) {
    redirect(`/post/${id}`);
  }

  // Post Not Found
  if (!post) {
    notFound();
  }

  return (
    <div>
      <div className="md:py-14 py-5 md:px-14 px-5 bg-[#0a1429] h-full w-full">
        <div className="space-y-2">
          <h1
            className={`md:text-4xl text-2xl text-slate-200 font-bold ${space_grotesk.className}`}
          >
            Architect Edit Review
          </h1>
        </div>
        <div>
          <PostEditForm post={post} />
        </div>
      </div>
    </div>
  );
}
