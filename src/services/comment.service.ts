import status from "http-status";
import { getPostByIdService } from "./postCode.service";
import { addComment, deleteComment, getComment, getCommentCount, getComments, getCommentsForUserPaginated, updateComment } from "@/db/comment.repo";
import { CommentCountOnPost, PaginatedCommentsResponse } from "@/types/comment";
import { Session } from "next-auth";
import { ReplyCommentInputs } from "@/schemas/comment";
import { getReviewById } from "@/db/review.repo";

export class PostCommentServiceError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number,
    ) {
        super(message);
        this.name = "PostCommentServiceError";
    }
}

export async function addCommentOnPost(postId: string, userId: string, content: string, startline: number, endline?: number | null) {
    try {
        const post = await getPostByIdService(postId, {})

        // Check if adding comment is allowed on post or not
        if (!post.requireComments) {
            throw new PostCommentServiceError("The Post Does not accept the Comment Posting", status.NOT_ACCEPTABLE)
        }

        // Own user cannot add the comment on his post
        else if (post.authorId === userId) {
            throw new PostCommentServiceError("Author Cannot comment on their own post", status.BAD_REQUEST)
        }

        // Disallow on adding the comment on accepted or closed post.
        else if (post.status === "ACCEPTED" || post.status === "CLOSED" || !post.published) {
            throw new PostCommentServiceError("Cannot comment on Closed/Accepted Post", status.BAD_REQUEST)
        }

        const commentid = await addComment(post.id, startline, content, userId, endline)
        return commentid
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function replyOnComment(commentId: string, content: string, userid: string) {
    try {
        const comment = await getComment(commentId)

        if (!comment) {
            throw new PostCommentServiceError("Comment Not Found", status.NOT_FOUND)
        }

        else if (comment.post.status !== "OPEN" || !comment.post.published) {
            throw new PostCommentServiceError("Cannot Comment on the Post which is not published or Open Post", status.NOT_ACCEPTABLE)
        }

        else if (comment.authorId === userid) {
            throw new PostCommentServiceError("Author Cannot Reply on their own Comment", status.NOT_ACCEPTABLE)
        }

        const replyId = await addComment(comment.postId, null, content, userid, null, comment.id)
        return replyId
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function getCommentsOnPost(postId: string, startLineNo: number) {
    try {
        return await getComments(postId, startLineNo)
    } catch (error) {
        {
            console.error(error)
            throw error;
        }
    }
}

export async function getRepliesOnComment(postId: string, commentId: string) {
    try {
        return await getComments(postId, null, undefined, undefined, null, commentId)
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function addCommentOnReview(reviewId: string, userId: string, content: string) {
    try {
        const review = await getReviewById(reviewId)

        if (!review) {
            throw new PostCommentServiceError("Review not Found", status.NOT_FOUND)
        }

        else if (review.post.status !== "OPEN" || !review.post.published) {
            throw new PostCommentServiceError("Cannot Review on the Post which is not published or Open Post", status.NOT_ACCEPTABLE)
        }

        // Review owner cannot comment on their own review
        else if (review.reviewerId === userId) {
            throw new PostCommentServiceError("You cannot comment on your own review", status.BAD_REQUEST)
        }

        const commentId = await addComment(review.postId, null, content, userId, null, null, reviewId)
        return commentId
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function getCommentsForUser(userId: string, page: number, pageSize: number) {
    try {
        return await getComments(null, null, page, pageSize, userId);
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function getCommentsForUserService(userId: string, page: number, pageSize: number): Promise<PaginatedCommentsResponse> {
    try {
        return await getCommentsForUserPaginated(userId, page, pageSize);
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function getCommentsOnReview(postId: string, reviewId: string) {
    try {
        return await getComments(postId, null, undefined, undefined, null, undefined, reviewId)
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function getCommentCountsOnPost(postId: string): Promise<CommentCountOnPost[]> {
    try {
        const commentcounts = await getCommentCount(postId)
        const commentCountData: CommentCountOnPost[] = commentcounts.map(
            (value) => ({
                count: value._count,
                startlineno: value.startlineno!,
            })
        );
        return commentCountData
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function deleteCommentOrReply(commentId: string, user: Session) {
    try {
        const comment = await getComment(commentId)

        if (!comment) {
            throw new PostCommentServiceError("Comment Not Found", status.NOT_FOUND)
        }

        else if (comment.post.status !== "OPEN" || !comment.post.published) {
            throw new PostCommentServiceError("Cannot delete comment on the Post which is not published or Open Post", status.NOT_ACCEPTABLE)
        }

        if (comment?.authorId !== user.user.id) {
            throw new PostCommentServiceError("You cannot delete other user comment", status.BAD_REQUEST)
        }

        const deleted = await deleteComment(commentId)
        if (deleted === commentId) return deleted
        throw new PostCommentServiceError("Failed to Delete the Comment", status.INTERNAL_SERVER_ERROR)
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function updateCommentOrReplyContent(commentId: string, replyschema: ReplyCommentInputs, user: Session) {
    try {
        const comment = await getComment(commentId)

        if (!comment) {
            throw new PostCommentServiceError("Comment Not Found", status.NOT_FOUND)
        }

        else if (comment.post.status !== "OPEN" || !comment.post.published) {
            throw new PostCommentServiceError("Cannot update comment on the Post which is not published or Open Post", status.NOT_ACCEPTABLE)
        }

        else if (comment.authorId !== user.user.id) {
            throw new PostCommentServiceError("You cannot update other user comment", status.BAD_REQUEST)
        }

        const updatedComment = await updateComment(commentId, replyschema.content)
        return updatedComment;

    } catch (error) {
        console.error(error)
        throw error
    }
}