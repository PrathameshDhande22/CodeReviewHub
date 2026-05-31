import { CommentInputs, ReplyCommentInputs } from "@/schemas/comment";
import { APIResponse } from "@/types";
import { CommentCountOnPost, CommentUpdatedResponse, CommentWithAuthorAndReplyCount, PaginatedCommentsResponse } from "@/types/comment";

export async function addCommentOnPostApi(postid: string, commentbody: CommentInputs): Promise<APIResponse<string>> {
    const response = await fetch(`/api/code-post/${postid}/comment`, {
        body: JSON.stringify(commentbody),
        method: "POST"
    })
    return response.json()
}

export async function getCommentsOnPostApi(postid: string, startlineno: number): Promise<APIResponse<CommentWithAuthorAndReplyCount[] | null>> {
    const response = await fetch(`/api/code-post/${postid}/comment?startlineno=${startlineno}`, {
        method: "GET"
    })
    return response.json()
}

export async function getRepliesOnCommentApi(postid: string, parentcommentid: string): Promise<APIResponse<CommentWithAuthorAndReplyCount[] | null>> {
    const response = await fetch(`/api/code-post/${postid}/comment?parentcommentid=${parentcommentid}`, {
        method: "GET"
    })
    return response.json()
}

export async function getCommentCountOnPostApi(postid: string): Promise<APIResponse<CommentCountOnPost[] | null>> {
    const response = await fetch(`/api/code-post/${postid}/comment/count`, {
        method: "GET"
    })
    return response.json()
}

export async function replyOnCommentApi(postid: string, commentId: string, replybody: ReplyCommentInputs): Promise<APIResponse<string | null>> {
    const response = await fetch(`/api/code-post/${postid}/comment/${commentId}`, {
        method: "POST",
        body: JSON.stringify(replybody)
    })
    return response.json()

}

export async function deleteCommentReplyApi(commentId: string, postId: string): Promise<APIResponse<string | null>> {
    const response = await fetch(`/api/code-post/${postId}/comment/${commentId}`, {
        method: "DELETE"
    })
    return response.json()
}

export async function updateCommentReplyApi(commentId: string, postId: string, updatebody: ReplyCommentInputs): Promise<APIResponse<CommentUpdatedResponse | null>> {
    const response = await fetch(`/api/code-post/${postId}/comment/${commentId}`, {
        body: JSON.stringify(updatebody),
        method: "PATCH"
    })

    return response.json()
}

export async function getCommentsForUserApi(page: number, pagesize: number): Promise<APIResponse<PaginatedCommentsResponse | null>> {
    const response = await fetch(`/api/comment?page=${page}&pagesize=${pagesize}`, {
        method: "GET",
        next: {
            revalidate: 40
        }
    })
    return response.json()
}
