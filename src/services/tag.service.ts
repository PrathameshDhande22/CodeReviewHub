import { Tag } from "@generated/prisma/client";
import { getAllTags } from "@/db/tag.repo";

export async function getTags(): Promise<Tag[]> {
  return getAllTags();
}
