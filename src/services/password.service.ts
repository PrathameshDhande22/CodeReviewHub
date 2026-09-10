import { getUser, getUserByEmail, updateUserPassword } from "@/db/user.repo";
import {
  createVerificationToken,
  deleteVerificationToken,
  deleteVerificationTokensByIdentifier,
  findVerificationToken,
} from "@/db/verificationToken.repo";
import { OTP_EXPIRY_MINUTES } from "@/schemas/password";
import {
  EmailServiceError,
  sendPasswordChangedEmail,
  sendPasswordResetEmail,
} from "@/services/email";
import { compare, hash } from "bcryptjs";
import { randomInt } from "crypto";
import status from "http-status";

export class PasswordServiceError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "PasswordServiceError";
  }
}

export async function requestPasswordReset(email: string): Promise<void> {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      throw new PasswordServiceError(
        "No account found with this email",
        status.NOT_FOUND,
      );
    }

    if (!user.password) {
      throw new PasswordServiceError(
        "This account uses Google sign-in. Password reset is not available.",
        status.BAD_REQUEST,
      );
    }

    const otp = randomInt(100000, 999999).toString();

    await deleteVerificationTokensByIdentifier(email);
    await createVerificationToken(
      email,
      otp,
      new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
    );

    try {
      await sendPasswordResetEmail(email, {
        name: user.name ?? user.username,
        email,
        otp,
        expiresInMinutes: OTP_EXPIRY_MINUTES,
      });
    } catch (error) {
      await deleteVerificationTokensByIdentifier(email);

      if (error instanceof EmailServiceError) {
        throw new PasswordServiceError(error.message, error.statusCode);
      }
      throw error;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function resetPassword(
  email: string,
  otp: string,
  newPassword: string,
): Promise<void> {
  try {
    const tokenRecord = await findVerificationToken(email, otp);

    if (!tokenRecord) {
      throw new PasswordServiceError(
        "Invalid or expired reset code",
        status.BAD_REQUEST,
      );
    }

    if (tokenRecord.expires < new Date()) {
      await deleteVerificationToken(email, otp);
      throw new PasswordServiceError(
        "Reset code has expired",
        status.BAD_REQUEST,
      );
    }

    const user = await getUserByEmail(email);

    if (!user) {
      throw new PasswordServiceError(
        "No account found with this email",
        status.NOT_FOUND,
      );
    }

    const passwordHash = await hash(newPassword, 12);
    await updateUserPassword(user.id, passwordHash);
    await deleteVerificationToken(email, otp);

    await sendPasswordChangedEmail(email, {
      name: user.name ?? user.username,
      email,
      method: "reset",
      changedAt: new Date(),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  try {
    const user = await getUser(userId);

    if (!user) {
      throw new PasswordServiceError("User not found", status.NOT_FOUND);
    }

    if (!user.password) {
      throw new PasswordServiceError(
        "This account uses Google sign-in. Password change is not available.",
        status.BAD_REQUEST,
      );
    }

    const valid = await compare(currentPassword, user.password);
    if (!valid) {
      throw new PasswordServiceError(
        "Current password is incorrect",
        status.BAD_REQUEST,
      );
    }

    const passwordHash = await hash(newPassword, 12);
    await updateUserPassword(userId, passwordHash);

    await sendPasswordChangedEmail(user.email, {
      name: user.name ?? user.username,
      email: user.email,
      method: "change",
      changedAt: new Date(),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
