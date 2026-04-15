import { prisma } from "@/prisma";
import { Tag } from "@generated/prisma/client";

export async function getAllTags(): Promise<Tag[]> {
  return await prisma.tag.findMany({
    distinct: ["name"],
  });
}
