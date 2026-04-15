import { getAllLanguages } from "@/db/language.repo";
import { Languages } from "@generated/prisma/client";

export async function getLanguages(): Promise<Languages[]> {
  return getAllLanguages();
}
