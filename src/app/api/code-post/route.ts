import { getOptionalServerSession } from "@/auth";
import {
  createPostFromFormData,
  PostCodeServiceError,
} from "@/services/postCode.service";
import { APIResponse } from "@/types";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await getOptionalServerSession();

  if (!user) {
    return NextResponse.json<APIResponse<string>>(
      {
        message: "User not Found",
        status: "invalid",
      },
      {
        status: status.UNAUTHORIZED,
      },
    );
  }

  const postbody: FormData = await request.formData();
  let postId: string;
  try {
    postId = await createPostFromFormData(postbody, user.user.id);
  } catch (error) {
    if (error instanceof PostCodeServiceError) {
      return NextResponse.json<APIResponse>(
        {
          message: error.message,
          status: "invalid",
        },
        {
          status: error.statusCode,
        },
      );
    }

    throw error;
  }

  return NextResponse.json<APIResponse<string>>(
    {
      message: "Post created successfully",
      status: "success",
      data: postId,
    },
    { status: status.CREATED },
  );
}
