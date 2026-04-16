import { prisma } from "@/prisma";
import { Tag } from "@generated/prisma/client";
import { TagCreateManyInput } from "@generated/prisma/models";

export async function getAllTags(): Promise<Tag[]> {
  return await prisma.tag.findMany({
    distinct: ["name"],
  });
}

export async function getTagByName(name: string): Promise<Tag | null> {
  return await prisma.tag.findUnique({
    where: {
      name: name,
    },
  });
}

export async function createTag(name: string): Promise<Tag> {
  try {
    const newTag = await prisma.tag.create({
      data: {
        name: name,
      },
    });
    return newTag;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createTags(tags: string[]): Promise<number[]> {
  try {
    const tagids = await prisma.tag.createManyAndReturn({
      data: tags.map((value): TagCreateManyInput => ({ name: value })),
      select: {
        id: true,
      },
    });
    return tagids.map((value) => value.id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
