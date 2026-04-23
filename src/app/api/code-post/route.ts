import { getOptionalServerSession } from "@/auth";
import {
  createPostFromFormData,
  getPost,
  PostCodeServiceError,
} from "@/services/postCode.service";
import { APIResponse } from "@/types";
import { SelectedPost } from "@/types/postCode";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
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
  } catch (error) {
    console.error(error);
    return NextResponse.json<APIResponse>(
      {
        message: "Failed to Create the Post",
        status: "error",
      },
      { status: status.INTERNAL_SERVER_ERROR },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get the User
    const user = await getOptionalServerSession();

    if (!user) {
      return NextResponse.json<APIResponse>(
        {
          message: "User not Found",
          status: "invalid",
        },
        {
          status: status.UNAUTHORIZED,
        },
      );
    }

    const params = await request.nextUrl.searchParams;

    const skip = Number(params.get("skip") ?? 0) || 0;
    const take = Number(params.get("take") ?? 10) || 10;

    const posts = await getPost(skip, take, user.user.id);

    return NextResponse.json<APIResponse<SelectedPost[]>>(
      {
        message: "Posts Fetch Successfully",
        status: "success",
        data: posts,
      },
      {
        status: status.OK,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json<APIResponse>(
      {
        message: "Failed to Get the User Posts",
        status: "error",
      },
      {
        status: status.INTERNAL_SERVER_ERROR,
      },
    );
  }
}
