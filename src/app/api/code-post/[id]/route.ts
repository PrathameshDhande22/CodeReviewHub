import { getOptionalServerSession } from "@/auth";
import { deletePost, PostCodeServiceError } from "@/services/postCode.service";
import { APIResponse } from "@/types";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, ctx: RouteContext<'/api/code-post/[id]'>) {
    try {
        const { id } = await ctx.params;

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

        const postid = await deletePost(id, user.user.id);
        return NextResponse.json<APIResponse<string>>(
            {
                message: "Post deleted successfully",
                status: "success",
                data: postid.id,
            },
            { status: status.OK },
        );

    } catch (error) {
        console.error(error)
        if (error instanceof PostCodeServiceError) {
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
                message: "Failed to delete code post"
            }, {
                status: status.INTERNAL_SERVER_ERROR
            })
        }
    }
}
