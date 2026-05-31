import { prisma } from "@/prisma";
import { Prisma } from "@generated/prisma/client";
import { CommentWithAuthorAndReplyCount, CommentForUser, PaginatedCommentsResponse } from "@/types/comment";

export async function addComment(postid: string, startline: number | null, content: string, userid: string, endline?: number | null, commentId?: string | null, reviewId?: string | null) {
    try {
        const comment = await prisma.comment.create({
            data: {
                content: content,
                authorId: userid,
                postId: postid,
                startlineno: startline,
                endlineno: endline,
                parentId: commentId,
                reviewId: reviewId
            }, select: {
                id: true
            }
        })
        return comment.id

    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function getComment(commentId: string) {
    try {
        return await prisma.comment.findFirst({
            where: {
                id: commentId
            }, include: {
                author: {
                    select: {
                        id: true,
                        email: true
                    }
                },
                post: {
                    select: {
                        status: true,
                        published: true,
                        requireComments: true,
                    }
                }
            }
        })
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function getComments(
    postid: string | null,
    startlineno: number | null,
    page?: number,
    pageSize?: number,
    userid?: string | null,
    parentcommentId?: string,
    reviewId?: string
): Promise<CommentWithAuthorAndReplyCount[]> {
    try {
        const where: Prisma.CommentWhereInput = {};

        if (postid) {
            where.postId = postid;
        }

        if (startlineno !== null) {
            where.startlineno = startlineno;
        }

        if (userid) {
            where.authorId = userid;
        }

        if (parentcommentId) {
            where.parentId = parentcommentId;
        }

        if (reviewId) {
            where.reviewId = reviewId;
            where.parentId = null;
        }

        const comments = await prisma.comment.findMany({
            orderBy: {
                createdAt: "desc",
            },
            where,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
                _count: {
                    select: {
                        replies: true,
                    },
                },
            },
            ...(page && pageSize ? {
                skip: (page - 1) * pageSize,
                take: pageSize,
            } : {})
        });

        return comments.map(({ _count, ...rest }) => ({
            ...rest,
            replyCount: _count.replies,
        }));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getCommentCount(postid: string) {
    try {
        return await prisma.comment.groupBy({
            by: "startlineno",
            where: {
                postId: postid,
                parentId: null
            },
            orderBy: {
                startlineno: "asc"
            },
            _count: true,
        })
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function deleteComment(commentId: string) {
    const deleted = await prisma.comment.delete({
        where: {
            id: commentId
        },
        select: {
            id: true
        }
    })
    return deleted.id
}

export async function updateComment(commentId: string, content: string) {
    const comment = await prisma.comment.update({
        where: {
            id: commentId
        }, data: {
            content: content
        }, select: {
            id: true,
            content: true
        }
    })
    return comment;
}

export async function getCommentsForUserPaginated(
    userId: string,
    page: number,
    pageSize: number
): Promise<PaginatedCommentsResponse> {
    try {
        const skip = (page - 1) * pageSize;
        const [rawComments, totalCount] = await Promise.all([
            prisma.comment.findMany({
                where: { authorId: userId },
                orderBy: { createdAt: "desc" },
                skip,
                take: pageSize + 1,
                include: {
                    post: {
                        select: {
                            id: true,
                            title: true,
                        },
                    },
                    author: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                    _count: {
                        select: {
                            replies: true,
                        },
                    },
                },
            }),
            prisma.comment.count({ where: { authorId: userId } }),
        ]);

        const hasNextPage = rawComments.length > pageSize;
        const comments: CommentForUser[] = rawComments
            .slice(0, pageSize)
            .map(({ _count, ...rest }) => ({
                ...rest,
                replyCount: _count.replies,
            }));

        return {
            comments,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / pageSize),
            hasNextPage,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}
