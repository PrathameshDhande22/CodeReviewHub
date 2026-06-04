import {
  createTag as createNewTag,
  getAllTags,
  getTagByName,
} from "@/db/tag.repo";
import { Tag } from "@generated/prisma/client";
import { cacheLife } from "next/cache";

export async function getTags(): Promise<Tag[]> {
  "use cache";
  cacheLife("hours");
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
    return await createNewTag(name);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
