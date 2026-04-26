import {
  assignTagToPost,
  createPostReview,
  deletePostCode,
  getPostById,
  getPosts,
} from "@/db/postcode.repo";
import { uploadFile } from "@/services/blobstorage";
import { getLanguages } from "@/services/language.service";
import { createTags } from "@/db/tag.repo";
import { PostCodeRequest } from "@/types/postCode";
import { Languages } from "@generated/prisma/client";
import status from "http-status";

export class PostCodeServiceError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "PostCodeServiceError";
  }
}

export async function createPost(postcode: PostCodeRequest, tags: string[]) {
  try {
    const postid = await createPostReview(postcode);

    // Assign the tags to the post
    const tagInNumber: number[] = [];
    const newtag: string[] = [];

    tags.forEach((element) => {
      const tagid = Number(element);
      if (isNaN(tagid)) {
        newtag.push(element);
      } else {
        tagInNumber.push(tagid);
      }
    });

    const newlyAddedTagsid = await createTags(newtag);

    await assignTagToPost([...tagInNumber, ...newlyAddedTagsid], postid);

    return postid;
  } catch (error) {
    console.error("Error creating post review:", error);
    throw new Error("Failed to create post review");
  }
}

export async function getCodeFromFile(
  file: File,
  charstoRead: number,
): Promise<string> {
  const preview = await file.text();
  return preview.slice(0, charstoRead);
}

export async function createPostFromFormData(
  postbody: FormData,
  userId: string,
): Promise<string> {
  const title = postbody.get("title") as string;
  const tags = postbody.getAll("tags") as string[];
  const description = postbody.get("description") as string | null;
  const draft = postbody.get("draft") === "true";
  const inlineFeedback = postbody.get("inlineFeedback") === "true";
  const requireReview = postbody.get("requireReview") === "true";
  const progLanguage = postbody.get("language");

  if (!title) {
    throw new PostCodeServiceError("Title is required", status.BAD_REQUEST);
  }

  if (!tags || tags.length === 0) {
    throw new PostCodeServiceError(
      "At least one Tag is required",
      status.BAD_REQUEST,
    );
  }

  let validLanguage: Languages | undefined;
  let objectname: string | undefined;
  let code: string = "";
  const languages: Languages[] = await getLanguages();

  if (progLanguage) {
    validLanguage = languages.find((value) => value.name === progLanguage);
    if (!validLanguage) {
      throw new PostCodeServiceError(
        "Invalid Programming Language",
        status.BAD_REQUEST,
      );
    }
  } else {
    throw new PostCodeServiceError(
      "Programming Language is required",
      status.BAD_REQUEST,
    );
  }

  if (postbody.has("code") && postbody.has("codefile")) {
    throw new PostCodeServiceError(
      "Only Code or Codefile is allowed",
      status.BAD_REQUEST,
    );
  }

  if (postbody.has("codefile")) {
    const uploadedFile = postbody.get("codefile") as File;
    const uploadedFileExtension = "." + uploadedFile.name.split(".")[1];
    const validExtension = languages.find(
      (value) => value.extension === uploadedFileExtension,
    );

    if (!validExtension) {
      throw new PostCodeServiceError(
        "Uploaded File Extension Does not match with Available Languages",
        status.NOT_ACCEPTABLE,
      );
    }

    postbody.set("language", validExtension.name);

    objectname = `${userId}/${Date.now()}-${uploadedFile.name}`;
    code = await getCodeFromFile(uploadedFile, 100);
    await uploadFile(userId, objectname, uploadedFile);
  }

  if (postbody.has("code")) {
    const uploadedCode = postbody.get("code") as string;
    code = uploadedCode;

    if (uploadedCode.length >= 500) {
      objectname = `${userId}/${Date.now()}-code${validLanguage?.extension}`;
      const file = new File([uploadedCode], `code${validLanguage?.extension}`);
      code = uploadedCode.slice(0, 200);
      await uploadFile(userId, objectname, file);
    }
  }

  return createPost(
    {
      title: title,
      description: String(description),
      authorId: userId,
      blobName: objectname ?? null,
      code: code,
      language: validLanguage.name,
      published: !draft,
      requireComments: inlineFeedback,
      requireReview: requireReview,
    },
    tags,
  );
}

export async function getPost(skip: number, take: number, userid?: string) {
  try {
    return getPosts(skip, take, userid);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deletePost(postId: string) {
  try {
    const posttoDelete = await getPostById(postId)
    if (!posttoDelete) {
      throw new PostCodeServiceError("Post not found", status.NOT_FOUND);
    }
    return await deletePostCode(postId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}