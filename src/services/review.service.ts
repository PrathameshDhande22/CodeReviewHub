import { acceptReviewById, addReview, deleteReviewById, getReviewById, getReviewByUserId, getReviews, updateReviewContent } from "@/db/review.repo";
import { ReviewInput } from "@/schemas/review";
import { PaginatedReviewsResponse, ReviewItem, SortReview } from "@/types/review";
import status from "http-status";
import { cacheLife } from "next/cache";
import { Session } from "next-auth";
import { getPostByIdService } from "./postCode.service";
import { getPostById } from "@/db/postcode.repo";
import { incrementUserReputationScore } from "@/db/reputation.repo";

export class ReviewServiceError extends Error {
    constructor(
        message: string,
        public readonly statusCode: number,
    ) {
        super(message);
        this.name = "ReviewServiceError";
    }
}


export async function addReviewForPost(postId: string, user: Session, reviewSchema: ReviewInput) {
    try {
        const post = await getPostByIdService(postId, {})

        if (!post) {
            throw new ReviewServiceError("Post not Found", status.NOT_FOUND)
        }

        else if (!post.requireReview) {
            throw new ReviewServiceError("Cannot add review for the post", status.NOT_ACCEPTABLE)
        }

        else if (post.authorId === user.user.id) {
            throw new ReviewServiceError("Author Cannot Review thier Own Post", status.NOT_ACCEPTABLE)
        }

        else if (post.status !== "OPEN" || !post.published) {
            throw new ReviewServiceError("Cannot Review the post when it is Accepted,Closed or Not Published", status.NOT_ACCEPTABLE)
        }

        // Check if the user have posted the review for these post.
        const existingreview = await getReviewByUserId(user.user.id, post.id)

        if (existingreview) {
            throw new ReviewServiceError("You cannot add another Review to the post", status.NOT_ACCEPTABLE)
        }

        if (!reviewSchema.content.trim()) {
            throw new ReviewServiceError("Review cannot be empty", status.BAD_REQUEST)
        }

        const review = await addReview(user.user.id, reviewSchema.content, postId)
        return review
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function getReviewByUserIdForPost(postId: string, user: Session) {
    try {
        const userReview = await getReviewByUserId(user.user.id, postId)
        return userReview;
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function getReviewsForUser(userId: string, page: number, pageSize: number, sort: SortReview = "newest") {
    try {
        const [reviews, totalCount] = await getReviews(page, pageSize, sort, userId)

        const totalPages = Math.ceil(totalCount / pageSize);
        const currentPage = page;
        const hasNextPage = currentPage < totalPages;

        const reviewItems: ReviewItem[] = reviews.map((review) => {
            const { _count, ...rest } = review;
            return {
                ...rest,
                commentCount: _count.comments,
            };
        });

        return {
            reviews: reviewItems,
            totalCount,
            currentPage,
            totalPages,
            hasNextPage,
        };
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function getReviewsForPost(
    postId: string,
    page: number,
    pageSize: number,
    sort: SortReview = "newest"
): Promise<PaginatedReviewsResponse> {
    "use cache";
    cacheLife("minutes");
    try {
        const post = await getPostById(postId)

        if (!post) {
            throw new ReviewServiceError("Post not Found", status.NOT_FOUND)
        }

        const [reviews, totalCount] = await getReviews(page, pageSize, sort, undefined, postId);

        const totalPages = Math.ceil(totalCount / pageSize);
        const currentPage = page;
        const hasNextPage = currentPage < totalPages;

        const reviewItems: ReviewItem[] = reviews.map((review) => {
            const { _count, ...rest } = review;
            return {
                ...rest,
                commentCount: _count.comments,
            };
        });

        return {
            reviews: reviewItems,
            totalCount,
            currentPage,
            totalPages,
            hasNextPage,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteReviewForPost(reviewId: string, user: Session) {
    try {
        const review = await getReviewById(reviewId)

        if (!review) {
            throw new ReviewServiceError("Review not Found", status.NOT_FOUND)
        }

        if (review.post.status !== "OPEN" || !review.post.published) {
            throw new ReviewServiceError("Cannot Review the post when it is Accepted,Closed or Not Published", status.NOT_ACCEPTABLE)
        }

        // Only the reviewer can delete their own review
        if (review.reviewerId !== user.user.id) {
            throw new ReviewServiceError("You are not authorized to delete this review", status.FORBIDDEN)
        }

        const deletedReview = await deleteReviewById(reviewId)
        return deletedReview
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function updateReviewForPost(reviewId: string, content: string, user: Session) {
    try {
        const review = await getReviewById(reviewId)

        if (!review) {
            throw new ReviewServiceError("Review not Found", status.NOT_FOUND)
        }

        else if (review.post.status !== "OPEN" || !review.post.published) {
            throw new ReviewServiceError("Cannot Review the post when it is Accepted,Closed or Not Published", status.NOT_ACCEPTABLE)
        }

        // Only the reviewer can update their own review
        else if (review.reviewerId !== user.user.id) {
            throw new ReviewServiceError("You are not authorized to update this review", status.FORBIDDEN)
        }

        if (!content.trim()) {
            throw new ReviewServiceError("Review content cannot be empty", status.BAD_REQUEST)
        }

        const updatedReview = await updateReviewContent(reviewId, content.trim())
        return updatedReview
    } catch (error) {
        console.error(error)
        throw error;
    }
}

export async function acceptReviewForPost(reviewId: string, user: Session) {
    try {
        const review = await getReviewById(reviewId)

        if (!review) {
            throw new ReviewServiceError("Review not Found", status.NOT_FOUND)
        }

        // Only the post owner can accept a review
        const post = await getPostById(review.postId)

        if (!post) {
            throw new ReviewServiceError("Post not Found", status.NOT_FOUND)
        }

        if (post.authorId !== user.user.id) {
            throw new ReviewServiceError("Only the post owner can accept a review", status.FORBIDDEN)
        }

        if (post.status === "ACCEPTED") {
            throw new ReviewServiceError("Post already has an accepted review", status.NOT_ACCEPTABLE)
        }

        if (review.isAccepted) {
            throw new ReviewServiceError("This review is already accepted", status.NOT_ACCEPTABLE)
        }

        const acceptedReview = await acceptReviewById(reviewId)

        // Increase the score of the reviewer by 10 points
        await incrementUserReputationScore(review.reviewerId, 10)

        return acceptedReview
    } catch (error) {
        console.error(error)
        throw error;
    }
}
