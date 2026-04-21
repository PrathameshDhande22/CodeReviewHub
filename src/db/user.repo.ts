import { prisma } from "@/prisma";

export async function getUser(id: string) {
  return await prisma.user.findFirst({
    where: { id: id },
  });
}
