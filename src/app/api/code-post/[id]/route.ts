import { getOptionalServerSession } from "@/auth";
import { deletePost, PostCodeServiceError, updatePostFormData } from "@/services/postCode.service";
import { APIResponse } from "@/types";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(ctx: RouteContext<'/api/code-post/[id]'>) {
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

export async function PUT(request: NextRequest, ctx: RouteContext<'/api/code-post/[id]'>) {
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
        const postbody: FormData = await request.formData();

        const postid = await updatePostFormData(id, user.user.id, postbody)
        if (postid.id) {
            return NextResponse.json<APIResponse<string>>({
                message: "Post Updated Successfully",
                status: "success",
                data: postid.id
            }, {
                status: status.OK
            })
        }
        return NextResponse.json<APIResponse<string>>({
            message: "Failed to update the post",
            status: "error",
            data: postid.id
        }, {
            status: status.INTERNAL_SERVER_ERROR
        })

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