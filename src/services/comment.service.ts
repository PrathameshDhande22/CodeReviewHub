import status from "http-status";
import { getPostByIdService } from "./postCode.service";
import { addComment } from "@/db/comment.repo";

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

        // Own user cannot add the comment on his post
        if (post.authorId === userId) {
            throw new PostCommentServiceError("Author Cannot comment on their own post", status.BAD_REQUEST)
        }

        const commentid = await addComment(post.id, startline, content, userId, endline)
        return commentid
    } catch (error) {
        console.error(error)
        throw error;
    }
}