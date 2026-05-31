import { hash } from "bcryptjs";
import { createUser, getUserByEmail, getUserByUsername } from "@/db/user.repo";
import { RegisterInputs } from "@/schemas/register";
import { addUserReputation } from "@/db/reputation.repo";

export class RegisterServiceError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "RegisterServiceError";
  }
}

export async function registerUser(data: RegisterInputs): Promise<void> {
  const existingEmail = await getUserByEmail(data.email);
  if (existingEmail) {
    throw new RegisterServiceError("Email already in use", 409);
  }

  if (data.username) {
    const existingUsername = await getUserByUsername(data.username);
    if (existingUsername) {
      throw new RegisterServiceError("Username already in use", 409);
    }
  }

  const passwordHash = await hash(data.password, 12);

  const useradded = await createUser({
    name: data.fullname,
    username: data.username,
    email: data.email,
    password: passwordHash,
  });

  await addUserReputation(useradded.id);
}
