import { prisma } from "@/prisma";
import { PostCodeRequest } from "@/types/postCode";
import { PostTagCreateManyInput } from "@generated/prisma/models";

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

export async function assignTagToPost(tagId: number[], postid: string) {
  try {
    await prisma.postTag.createMany({
      data: tagId.map(
        (value): PostTagCreateManyInput => ({ postId: postid, tagId: value }),
      ),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
