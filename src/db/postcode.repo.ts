import { prisma } from "@/prisma";
import { PostCodeRequest, PostWithRelations, PropertyBag } from "@/types/postCode";
import { Prisma } from "@generated/prisma/client";
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

export async function updatePostReview(post: PostCodeRequest, postId: string) {
  try {
    return await prisma.post.update({
      where: { id: postId },
      data: {
        title: post.title,
        blobName: post.blobName,
        code: post.code,
        description: post.description,
        language: post.language,
        published: post.published,
        requireComments: post.requireComments,
        requireReview: post.requireReview
      },
      select: {
        id: true
      }
    })
  } catch (error) {
    console.error("Error updating post review:", error);
    throw error;
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

export async function deAssignTagFromPost(tagId: number[], postid: string): Promise<void> {
  try {
    await prisma.postTag.deleteMany({
      where: {
        postId: postid,
        tagId: {
          in: tagId
        }
      }
    })
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
        id: true,
        blobName: true
      }
    })
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPostById(postId: string, propertyBag?: PropertyBag): Promise<PostWithRelations | null> {
  try {
    const include: Prisma.PostInclude = {};

    if (propertyBag?.IncludeAuther) {
      include.author = {
        select: { id: true, name: true, image: true },
      };
    }

    if (propertyBag?.IncludeTags) {
      include.postTags = {
        select: {
          tag: { select: { id: true, name: true } },
        },
      };
    }

    if (propertyBag?.IncludeComments) {
      include.comments = {
        select: {
          id: true,
          content: true,
          lineno: true,
          authorId: true,
          author: { select: { id: true, name: true, image: true } },
          parentId: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      };
    }

    if (propertyBag?.IncludeReviews) {
      include.reviews = {
        select: {
          id: true,
          content: true,
          rating: true,
          isAccepted: true,
          reviewerId: true,
          reviewer: { select: { id: true, name: true, image: true } },
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      };
    }

    const hasIncludes = Object.keys(include).length > 0;

    return await prisma.post.findUnique({
      where: { id: postId },
      ...(hasIncludes && { include }),
    }) as PostWithRelations | null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
