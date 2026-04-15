import { getOptionalServerSession } from "@/auth";
import { createPostReview, getCodeFromFile } from "@/db/postcode.repo";
import { uploadFile } from "@/services/blobstorage";
import { getLanguages } from "@/services/language.service";
import { createPost } from "@/services/postCode.service";
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
  const title = postbody.get("title") as string;
  const tags = postbody.getAll("tags") as string[];
  const draft = postbody.get("draft") === "true";
  const inlineFeedback = postbody.get("inlineFeedback") === "true";
  const requireReview = postbody.get("requireReview") === "true";
  const progLanguage = postbody.get("language");
  const description = postbody.get("description") as string | null;

  if (!title) {
    return NextResponse.json<APIResponse>(
      {
        message: "Title is required",
        status: "invalid",
      },
      { status: status.BAD_REQUEST },
    );
  }

  if (!tags || tags.length === 0) {
    return NextResponse.json<APIResponse>(
      {
        message: "At least one Tag is required",
        status: "invalid",
      },
      { status: status.BAD_REQUEST },
    );
  }

  // verify the languages
  let validLanguage: Languages | undefined;
  let objectname: string | undefined;
  let code: string = "";
  const languages: Languages[] = await getLanguages();
  if (progLanguage) {
    validLanguage = languages.find((value) => value.name === progLanguage);
    if (!validLanguage) {
      return NextResponse.json<APIResponse>(
        {
          message: "Invalid Programming Language",
          status: "invalid",
        },
        {
          status: status.BAD_REQUEST,
        },
      );
    }
  } else {
    return NextResponse.json<APIResponse>(
      {
        message: "Programming Language is required",
        status: "invalid",
      },
      {
        status: status.BAD_REQUEST,
      },
    );
  }

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
    objectname = `${user.user.id}/${Date.now()}-${uploadedFile.name}`;
    code = await getCodeFromFile(uploadedFile, 100);
    await uploadFile(user.user.id, objectname, uploadedFile);
  }

  // Process the code
  if (postbody.has("code")) {
    const uploadedCode = postbody.get("code") as string;
    code = uploadedCode;
    // if the above the length then create as the file
    if (uploadedCode.length >= 300) {
      objectname = `${user.user.id}/${Date.now()}-code${validLanguage?.extension}`;
      const file = new File([uploadedCode], `code${validLanguage?.extension}`);
      code = uploadedCode.slice(0, 100);
      await uploadFile(user.user.id, objectname, file);
    }
  }

  // Create the post review
  const postId = await createPost({
    title: title,
    description: String(description),
    authorId: user.user.id,
    blobName: String(objectname),
    code: code,
    language: validLanguage.name,
    published: !draft,
    requireComments: inlineFeedback,
    requireReview: requireReview,
  });

  console.log(postId)

  return NextResponse.json<APIResponse<string>>(
    {
      message: "Post created successfully",
      status: "success",
      data: postId,
    },
    { status: status.CREATED },
  );
}
