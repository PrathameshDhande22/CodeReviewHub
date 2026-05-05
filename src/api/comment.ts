import { CommentInputs } from "@/schemas/comment";
import { APIResponse } from "@/types";

export async function addCommentOnPostApi(postid: string, commentbody: CommentInputs): Promise<APIResponse<string>> {
    const response = await fetch(`/api/code-post/${postid}/comment`, {
        body: JSON.stringify(commentbody),
        method: "POST"
    })
    return response.json()
}