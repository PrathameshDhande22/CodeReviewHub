import { APIResponse } from "@/types";
import { SelectedPost } from "@/types/postCode";

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
): Promise<APIResponse<SelectedPost[]>> {
  const response = await fetch(`/api/code-post?take=${take}&skip=${skip}`, {
    method: "GET",
  });
  return response.json();
}
