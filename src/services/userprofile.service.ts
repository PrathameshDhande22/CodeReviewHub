import { getUser } from "@/db/user.repo";
import { User } from "@generated/prisma/client";

export async function getUserDetails(id: string): Promise<User | null> {
  try {
    return getUser(id);
  } catch (error) {
    console.error(error);
    return null;
  }
}
