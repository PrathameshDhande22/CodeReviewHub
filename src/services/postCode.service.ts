import {
  assignTagToPost,
  createPostReview,
  deAssignTagFromPost,
  deletePostCode,
  getPostById,
  getPosts,
  updatePostReview,
} from "@/db/postcode.repo";
import { createTags } from "@/db/tag.repo";
import { deleteFile, getFileContent, uploadFile } from "@/services/blobstorage";
import { getLanguages } from "@/services/language.service";
import { PostCodeRequest, PostWithRelations, PropertyBag } from "@/types/postCode";
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

function getTagsFromBody(tags: string[]): { tagInNumber: number[], newtag: string[] } {
  // Check for the existing tags. 
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
  return { tagInNumber, newtag };
}


export async function createPost(postcode: PostCodeRequest, tags: string[]) {
  try {
    const postid = await createPostReview(postcode);

    const { tagInNumber, newtag } = getTagsFromBody(tags);
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

async function validatePostFromFormData(postbody: FormData, userId: string): Promise<PostCodeRequest & { tags: string[] }> {
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
  return {
    title: title,
    description: String(description),
    authorId: userId,
    blobName: objectname ?? null,
    code: code,
    language: validLanguage.name,
    published: !draft,
    requireComments: inlineFeedback,
    requireReview: requireReview,
    tags: tags,
  }
}

export async function createPostFromFormData(
  postbody: FormData,
  userId: string,
): Promise<string> {
  const postrequest = await validatePostFromFormData(postbody, userId)

  return createPost(
    postrequest,
    postrequest.tags,
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

export async function deletePost(postId: string, userid: string) {
  try {
    const posttoDelete = await getPostById(postId)
    if (!posttoDelete) {
      throw new PostCodeServiceError("Post not found", status.NOT_FOUND);
    }

    if (posttoDelete.authorId !== userid) {
      throw new PostCodeServiceError("Unauthorized to delete this post", status.UNAUTHORIZED);
    }

    const deleted = await deletePostCode(postId);
    if (deleted.id && deleted.blobName) {
      await deleteFile(deleted.blobName)
    }
    return deleted;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPostByIdService(postId: string, includebag: PropertyBag) {
  try {
    // Fetch the Post
    const post = await getPostById(postId, includebag);
    if (!post) {
      throw new PostCodeServiceError("Post not found", status.NOT_FOUND);
    }

    // Get the Code from Blob Storage if blobName exists
    if (post.blobName) {
      const code = await getFileContent(post.blobName);
      post.code = code;
    }
    return post;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updatePostFormData(
  postId: string,
  userId: string,
  postbody: FormData) {
  const posttoUpdate = await getPostById(postId, {
    IncludeAuther: true,
    IncludeTags: true
  })

  if (!posttoUpdate) {
    throw new PostCodeServiceError("Post not found", status.NOT_FOUND);
  }

  if (posttoUpdate.authorId !== userId) {
    throw new PostCodeServiceError("Unauthorized to update this post", status.UNAUTHORIZED);
  }

  const requestbody = await validatePostFromFormData(postbody, userId);
  return updatePost(postId, requestbody, requestbody.tags, posttoUpdate)
}

export async function updatePost(postId: string, postcode: PostCodeRequest, tags: string[], existingPost: PostWithRelations) {
  try {
    // Delete the Old Blob if Blobname exists
    if (existingPost.blobName) {
      await deleteFile(existingPost.blobName)
    }

    const { tagInNumber, newtag } = getTagsFromBody(tags)

    // Remove the tags which should not be assigned to the post anymore
    const existingTagIds = existingPost.postTags.map((value) => value.tag.id)
    const tagsToRemove = existingTagIds.filter((value) => !tagInNumber.includes(value))
    const tagsToAdd = tagInNumber.filter((value) => !existingTagIds.includes(value))

    // Add the new Tags
    if (newtag.length > 0) {
      const newlyAddedTagsid = await createTags(newtag);
      tagsToAdd.push(...newlyAddedTagsid)
    }

    // Deassign the tags which are not needed anymore
    if (tagsToRemove.length > 0) {
      await deAssignTagFromPost(tagsToRemove, postId)
    }

    // Assign the New Tags to the Post
    if (tagsToAdd.length > 0)
      await assignTagToPost(tagsToAdd, postId)

    return await updatePostReview(postcode, postId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}