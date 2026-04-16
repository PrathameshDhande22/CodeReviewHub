import { Tag } from "@generated/prisma/client";
import {
  getAllTags,
  getTagByName,
  createTag as createNewTag,
} from "@/db/tag.repo";

export async function getTags(): Promise<Tag[]> {
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
