import { getAllLanguages } from "@/db/language.repo";
import { Languages } from "@generated/prisma/client";
import { cacheLife } from "next/cache";

export async function getLanguages(): Promise<Languages[]> {
  "use cache";
  cacheLife("days");
  return getAllLanguages();
}
