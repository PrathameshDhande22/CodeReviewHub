import { prisma } from "@/prisma";
import { PostCodeRequest } from "@/types/postCode";
import { Post } from "@generated/prisma/client";

export async function createPostReview(post: PostCodeRequest): Promise<string> {
  try {
    const newlyCreatedReview = await prisma.post.create({
      data: {
        title: post.title,
        description: post.description,
        code: post.code,
        language: String(post.language),
        authorId: post.authorId,
        blobName: String(post.blobName),
        published: post.published,
        requireComments: post.requireComments,
        requireReview: post.requireReview,
      },
      select: { id: true },
    });
    return newlyCreatedReview.id;
  } catch (error) {
    console.error("Error creating post review:", error);
    throw new Error("Failed to create post review");
  }
}

export async function getCodeFromFile(
  file: File,
  charstoRead: number,
): Promise<string> {
  const preview = await file.text();
  return preview.slice(0, charstoRead);
}
