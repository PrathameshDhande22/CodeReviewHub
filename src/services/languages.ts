import { prisma } from "@/prisma";
import { Languages } from "@generated/prisma/client";

export async function getLanguages(): Promise<Languages[]> {
  const languages = await prisma.languages.findMany({
    distinct: ["name"],
  });
  return languages;
}
