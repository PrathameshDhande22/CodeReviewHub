import { getOptionalServerSession } from "@/auth";
import { getReviewsForUser, ReviewServiceError } from "@/services/review.service";
import { APIResponse } from "@/types";
import { PaginatedReviewsResponse, SortReview } from "@/types/review";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const params = request.nextUrl.searchParams;

        const user = await getOptionalServerSession()

        const page = Number(params.get("page"))
        const pagesize = Number(params.get("pagesize"))
        const sort = params.get("sort") as SortReview

        if ((!page || !pagesize || !sort) || (isNaN(page) || isNaN((pagesize)))) {
            return NextResponse.json<APIResponse>({
                message: "Page or Pagesize and sort is required",
                status: "invalid"
            }, {
                status: status.NOT_ACCEPTABLE
            })
        }

        if (!user) {
            return NextResponse.json<APIResponse>({
                message: "User is not authenticated",
                status: "invalid"
            }, {
                status: status.UNAUTHORIZED
            })
        }

        const response: PaginatedReviewsResponse = await getReviewsForUser(user.user.id, page, pagesize, sort)
        return NextResponse.json<APIResponse<PaginatedReviewsResponse>>({
            message: "Fetched the Reviews Successfully",
            status: "success",
            data: response
        }, {
            status: status.OK
        })
    } catch (error) {
        if (error instanceof ReviewServiceError) {
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
        else {
            return NextResponse.json<APIResponse>({
                status: "error",
                message: "Failed to get the reviews for the user"
            }, {
                status: status.INTERNAL_SERVER_ERROR
            })
        }
    }
}