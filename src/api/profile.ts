import { APIResponse } from "@/types";
import { User } from "@generated/prisma/client";

export async function updateProfileApi(formData: FormData): Promise<APIResponse<User>> {
  const response = await fetch("/api/profile/update", {
    method: "POST",
    body: formData,
  });
  return response.json();
}
