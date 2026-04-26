import { prisma } from "@/prisma";
import { PostCodeRequest, PropertyBag } from "@/types/postCode";
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

export async function assignTagToPost(
  tagId: number[],
  postid: string,
): Promise<void> {
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

export async function getPosts(
  skip: number,
  nexttoFetch: number,
  userid?: string,
) {
  try {
    return prisma.post.findMany({
      where: {
        authorId: userid,
      },
      skip: skip,
      take: nexttoFetch,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        code: true,
        language: true,
        acceptedReviewId: true,
        authorId: true,
        blobName: true,
        published: true,
        requireComments: true,
        requireReview: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        postTags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletePostCode(postId: string) {
  try {
    return await prisma.post.delete({
      where: {
        id: postId
      },
      select: {
        id: true
      }
    })
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// TODO: Implement the PropertyBag to conditionally include related data based on the flags
export async function getPostById(postId: string,propertyBag?:PropertyBag) {
  try {
    return await prisma.post.findUnique({
      where: {
        id: postId
      },
    })
  } catch (error) {
    console.error(error);
    throw error;
  }
}
