import { getOptionalServerSession } from "@/auth";
import { getCommentsForUserService, PostCommentServiceError } from "@/services/comment.service";
import { APIResponse } from "@/types";
import { PaginatedCommentsResponse } from "@/types/comment";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const user = await getOptionalServerSession();

        if (!user) {
            throw new PostCommentServiceError("Unauthorized", status.UNAUTHORIZED)
        }

        const params = request.nextUrl.searchParams;

        const page = Number(params.get("page"))
        const pagesize = Number(params.get("pagesize"))

        if ((!page || !pagesize) || (isNaN(page) || isNaN((pagesize)))) {
            throw new PostCommentServiceError("Page and Pagesize is required", status.NOT_ACCEPTABLE)
        }

        const response = await getCommentsForUserService(user.user.id!, page, pagesize)

        return NextResponse.json<APIResponse<PaginatedCommentsResponse>>({
            message: "Fetched comments successfully",
            status: "success",
            data: response,
        }, {
            status: status.OK
        })

    } catch (error) {
        console.error(error)
        if (error instanceof PostCommentServiceError) {
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
                message: "Failed to get the comments of the user"
            }, {
                status: status.INTERNAL_SERVER_ERROR
            })
        }
    }
}