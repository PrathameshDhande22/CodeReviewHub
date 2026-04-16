import { APIResponse } from "@/types";

export async function createPostApi(
  formdata: FormData,
): Promise<APIResponse<string>> {
  const response = await fetch("/api/code-post", {
    method: "POST",
    body: formdata,
  });
  return response.json();
}
