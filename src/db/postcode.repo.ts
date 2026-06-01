import { prisma } from "@/prisma";
import { CodeStatus, Sort } from "@/types/browse";
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
        requireReview: post.requireReview,
        status: post.postStatus
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
  sort: Sort = "newest",
  statusfilter: CodeStatus = "all"
) {
  try {
    return prisma.post.findMany({
      where: {
        authorId: userid,
        published: userid ? undefined : true,
        status: statusfilter === "all" ? undefined : statusfilter === "accepted" ? "ACCEPTED" : "OPEN",
      },
      skip: skip,
      take: nexttoFetch,
      orderBy: [
        { createdAt: sort === "newest" ? "desc" : "asc" },
      ],
      include: {
        postTags: {
          select: {
            tag: {
              select: {
                name: true
              }
            }
          }
        },
        author: {
          select: {
            name: true,
            image: true,
            id: true
          }
        },
        _count: {
          select: {
            reviews: true,
            postViews: true,
            comments: {
              where: {
                parentId: null,
                reviewId: null,
              },
            },
          },
        },
      }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addView(postId: string, userId: string) {
  return await prisma.postView.create({
    data: {
      postId: postId,
      viewerId: userId
    }
  })
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

export async function getPostById(postId: string, userId?: string, propertyBag?: PropertyBag): Promise<PostWithRelations | null> {
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

    if (propertyBag?.IncludeUserView) {
      include.postViews = {
        select: {
          viewerId: true,
        }
      }
    }

    const hasIncludes = Object.keys(include).length > 0;

    if (userId) {
      return await prisma.post.findFirst({
        where: {
          id: postId,
          postViews: {
            some: {
              viewerId: userId
            }
          },
        },
        ...(hasIncludes && { include }),
      }) as PostWithRelations | null;
    }

    return await prisma.post.findUnique({
      where: { id: postId },
      ...(hasIncludes && { include }),
    }) as PostWithRelations | null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
