import { prisma } from "@/prisma";

export async function getUser(id: string) {
  return await prisma.user.findFirst({
    where: { id: id },
  });
}

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export async function updateUserPassword(id: string, passwordHash: string) {
  return await prisma.user.update({
    where: { id },
    data: { password: passwordHash },
  });
}

export async function updateUserProfile(
  id: string,
  data: { name?: string; image?: string },
) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}
