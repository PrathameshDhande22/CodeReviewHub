import {
  createTag as createNewTag,
  getAllTags,
  getTagByName,
} from "@/db/tag.repo";
import { Tag } from "@generated/prisma/client";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";

export const tagsCacheTag = () => "tags";

export async function getTags(): Promise<Tag[]> {
  "use cache";
  cacheLife("hours");
  cacheTag(tagsCacheTag());
  return getAllTags();
}

export async function createTag(name: string): Promise<Tag> {
  try {
    // Check if the Tag Already Exists
    const tag = await getTagByName(name);
    if (tag) {
      return tag;
    }
    // Create New Tag
    const createdTag = await createNewTag(name);
    revalidateTag(tagsCacheTag(), "max");
    return createdTag;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
