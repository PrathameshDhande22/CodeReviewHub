import { getOptionalServerSession } from "@/auth";
import { PostReview } from "@/schemas/post";
import { getLanguages } from "@/services/languages";
import { APIResponse } from "@/types";
import { Languages } from "@generated/prisma/client";
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

  // process the code file
  if (postbody.has("codefile")) {
    const uploadedFile = postbody.get("codefile") as File;
    const uploadedFileExtension = "." + uploadedFile.name.split(".")[1];

    const languages: Languages[] = await getLanguages();
    const validExtension = languages.find(
      (value) => value.extension === uploadedFileExtension,
    );

    if (!validExtension) {
      return NextResponse.json<APIResponse>(
        {
          message:
            "Uploaded File Extension Does not match with Available Languages",
          status: "invalid",
        },
        {
          status: status.NOT_ACCEPTABLE,
        },
      );
    }

    // Automatically set the Language of the Uploaded file
    postbody.set("language", validExtension.name);

    // Upload the file
    
  }
}
