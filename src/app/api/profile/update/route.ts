import { getOptionalServerSession } from "@/auth";
import { updateProfileService, UserProfileServiceError } from "@/services/userprofile.service";
import { APIResponse } from "@/types";
import { User } from "@generated/prisma/client";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await getOptionalServerSession();

    if (!user) {
      return NextResponse.json<APIResponse>(
        { message: "Unauthorized", status: "error" },
        { status: status.UNAUTHORIZED },
      );
    }

    const formData = await request.formData();
    const updatedUser = await updateProfileService(user.user.id, formData);

    return NextResponse.json<APIResponse<User>>(
      {
        message: "Profile updated successfully",
        status: "success",
        data: updatedUser,
      },
      { status: status.OK },
    );
  } catch (error) {
    console.error(error);
    if (error instanceof UserProfileServiceError) {
      return NextResponse.json<APIResponse>(
        { message: error.message, status: "invalid" },
        { status: error.statusCode },
      );
    }
    return NextResponse.json<APIResponse>(
      { message: "Failed to update profile", status: "error" },
      { status: status.INTERNAL_SERVER_ERROR },
    );
  }
}
