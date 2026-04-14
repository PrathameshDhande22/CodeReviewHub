import { getOptionalServerSession } from "@/auth";
import { PostReview } from "@/schemas/post";
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

  // get the formdata
  const postbody: FormData = await request.formData();

  // if both code and codefile present do not proceed
  if (postbody.has("code") && postbody.has("codefile")) {
    return NextResponse.json<APIResponse<null>>(
      {
        message: "Only Code or Codefile is allowed",
        status: "invalid",
      },
      {
        status: status.BAD_REQUEST,
      },
    );
  }
}
