import { ReviewInput } from "@/schemas/review";
import { APIResponse } from "@/types";
import { PaginatedReviewsResponse, SortReview } from "@/types/review";
import { Review } from "@generated/prisma/client";

export async function addReviewForPostApi(postId: string, contentbody: ReviewInput): Promise<APIResponse<Review | null>> {
    const response = await fetch(`/api/code-post/${postId}/review`, {
        method: "POST",
        body: JSON.stringify(contentbody)
    })
    return response.json()
}

export async function getReviewsForPostApi(postId: string, page: number, pageSize: number, sort: SortReview): Promise<APIResponse<PaginatedReviewsResponse | null>> {
    const response = await fetch(`/api/code-post/${postId}/review?page=${page}&pagesize=${pageSize}&sort=${sort}`,
        {
            method: "GET",
            next: {
                revalidate: 60
            }
        })
    return response.json()
}

export async function deleteReviewApi(postId: string, reviewId: string): Promise<APIResponse<Review | null>> {
    const response = await fetch(`/api/code-post/${postId}/review/${reviewId}`, {
        method: "DELETE"
    })
    return response.json()
}

export async function updateReviewApi(postId: string, reviewId: string, contentbody: ReviewInput): Promise<APIResponse<Review | null>> {
    const response = await fetch(`/api/code-post/${postId}/review/${reviewId}`, {
        method: "PATCH",
        body: JSON.stringify(contentbody)
    })
    return response.json()
}

export async function acceptReviewApi(postId: string, reviewId: string): Promise<APIResponse<Review | null>> {
    const response = await fetch(`/api/code-post/${postId}/review/${reviewId}`, {
        method: "POST"
    })
    return response.json()
}

export async function getReviewsForUserApi(page: number, pagesize: number, sort: SortReview): Promise<APIResponse<PaginatedReviewsResponse | null>> {
    const response = await fetch(`/api/review?page=${page}&pagesize=${pagesize}&sort=${sort}`,
        {
            method: "GET",
            next: {
                revalidate: 60
            }
        })
    return response.json()
}