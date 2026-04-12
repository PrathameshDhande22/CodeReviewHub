import { Languages } from "@generated/prisma/client";

export async function getLanguages(): Promise<Languages[]> {
  const response = await fetch("/api/language", {
    cache: "force-cache",
  });
  return response.json();
}
