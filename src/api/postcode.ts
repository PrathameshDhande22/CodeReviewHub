import { PostStatusInput } from "@/schemas/post";
import { APIResponse } from "@/types";
import { CodeStatus, Sort } from "@/types/browse";
import { PostListItem } from "@/types/postCode";

export async function createPostApi(
  formdata: FormData,
): Promise<APIResponse<string>> {
  const response = await fetch("/api/code-post", {
    method: "POST",
    body: formdata,
  });
  return response.json();
}

export async function getRecentPosts(
  skip: number,
  take: number,
  sort: Sort = "newest",
  filter: CodeStatus = "all",
  include_user: boolean = true
): Promise<APIResponse<PostListItem[]>> {
  const response = await fetch(`/api/code-post?take=${take}&skip=${skip}&sort=${sort}&filter=${filter}&include_user=${include_user}`, {
    method: "GET",
    next: {
      revalidate: 60
    }
  });
  return response.json();
}

export async function deletePostapi(postid: string): Promise<APIResponse<string | null>> {
  const response = await fetch(`/api/code-post/${postid}`, {
    method: "DELETE",
  });
  return response.json();
}

export async function updatePostApi(postid: string, formdata: FormData): Promise<APIResponse<string>> {
  const response = await fetch(`/api/code-post/${postid}`, {
    method: "PUT",
    body: formdata
  })
  return response.json();
}

export async function updatePostStatusApi(postId: string, status: PostStatusInput): Promise<APIResponse> {
  const response = await fetch(`/api/code-post/${postId}`, {
    method: "PATCH",
    body: JSON.stringify(status)
  })
  return response.json();
}