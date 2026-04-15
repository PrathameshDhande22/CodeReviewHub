import { createPostReview } from "@/db/postcode.repo";
import { PostCodeRequest } from "@/types/postCode";

export async function createPost(postcode: PostCodeRequest) {
  try {
    return createPostReview(postcode);
  } catch (error) {
    console.error("Error creating post review:", error);
    throw new Error("Failed to create post review");
  }
}
