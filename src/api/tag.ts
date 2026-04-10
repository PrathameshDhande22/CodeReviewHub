import { Tag } from "@generated/prisma/client";

export async function getTags(): Promise<Tag[]> {
  const response = await fetch("/api/tag", {
    cache: "force-cache",
  });
  return response.json();
}
