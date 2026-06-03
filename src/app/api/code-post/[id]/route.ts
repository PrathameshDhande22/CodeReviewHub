import { getOptionalServerSession } from "@/auth";
import { PostStatusSchema } from "@/schemas";
import { deletePost, PostCodeServiceError, updatePostFormData, updatePostStatus } from "@/services/postCode.service";
import { APIResponse } from "@/types";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function DELETE(request: NextRequest, ctx: RouteContext<'/api/code-post/[id]'>) {
    try {
        const { id } = await ctx.params;

        const user = await getOptionalServerSession();

        const postid = await deletePost(id, user!.user.id);
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
        const postbody: FormData = await request.formData();

        const postid = await updatePostFormData(id, user!.user.id, postbody)
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

export async function PATCH(request: NextRequest, ctx: RouteContext<'/api/code-post/[id]'>) {
    try {
        const { id } = await ctx.params;

        const user = await getOptionalServerSession();

        const postbody = await request.json();
        const poststatusupdate = await PostStatusSchema.parse(postbody)

        await updatePostStatus(id, poststatusupdate.status, user!)

        return NextResponse.json<APIResponse>(
            {
                message: "Post status updated successfully",
                status: "success"
            },
            {
                status: status.OK
            }
        )

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
        else if (error instanceof ZodError) {
            return NextResponse.json<APIResponse>(
                {
                    status: "invalid",
                    message: error.issues.at(0)?.message ?? "Invalid input",
                },
                { status: status.UNPROCESSABLE_ENTITY },
            );
        }
        else {
            return NextResponse.json<APIResponse>({
                status: "error",
                message: "Failed to update the status of the Post"
            }, {
                status: status.INTERNAL_SERVER_ERROR
            })
        }
    }
}