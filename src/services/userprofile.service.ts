import { getUser, updateUserProfile } from "@/db/user.repo";
import { deleteFile, getPublicUrl, uploadFile } from "@/services/blobstorage";
import { User } from "@generated/prisma/client";
import status from "http-status";

export class UserProfileServiceError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "UserProfileServiceError";
  }
}

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPE = "image/png";

const isMinioProfileImage = (imageUrl: string): boolean => {
  try {
    return new URL(imageUrl).pathname.startsWith("/profile-images/");
  } catch {
    return false;
  }
};

export async function getUserDetails(id: string): Promise<User | null> {
  try {
    return getUser(id);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateProfileService(
  userId: string,
  formData: FormData,
): Promise<User> {
  try {
    const firstName = formData.get("firstName") as string | null;
    const lastName = formData.get("lastName") as string | null;
    const imageFile = formData.get("image") as File | null;

    if (!firstName || !firstName.trim()) {
      throw new UserProfileServiceError(
        "First name is required",
        status.BAD_REQUEST,
      );
    }

    if (firstName.trim().length > 50) {
      throw new UserProfileServiceError(
        "First name must not exceed 50 characters",
        status.BAD_REQUEST,
      );
    }

    if (!lastName || !lastName.trim()) {
      throw new UserProfileServiceError(
        "Last name is required",
        status.BAD_REQUEST,
      );
    }

    if (lastName.trim().length > 50) {
      throw new UserProfileServiceError(
        "Last name must not exceed 50 characters",
        status.BAD_REQUEST,
      );
    }

    const updateData: { name: string; image?: string } = {
      name: `${firstName.trim()} ${lastName.trim()}`,
    };

    if (imageFile && imageFile.size > 0) {
      if (imageFile.type !== ALLOWED_IMAGE_TYPE) {
        throw new UserProfileServiceError(
          "Only PNG images are allowed",
          status.UNPROCESSABLE_ENTITY,
        );
      }

      if (imageFile.size > MAX_IMAGE_SIZE) {
        throw new UserProfileServiceError(
          "Image must not exceed 2MB",
          status.UNPROCESSABLE_ENTITY,
        );
      }

      const existingUser = await getUser(userId);
      if (existingUser?.image && isMinioProfileImage(existingUser.image)) {
        const oldBlobName = new URL(existingUser.image).pathname.replace(
          "/profile-images/",
          "",
        );
        try {
          await deleteFile(oldBlobName, "profile-images");
        } catch (error) {
          console.error("Failed to delete old profile image:", error);
        }
      }

      const objectName = `${userId}/profile.png`;
      await uploadFile(userId, objectName, imageFile, "profile-images");
      updateData.image = getPublicUrl("profile-images", objectName);
    }

    return await updateUserProfile(userId, updateData);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
