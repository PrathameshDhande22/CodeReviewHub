import { getOptionalServerSession } from "@/auth";
import { commentSchema } from "@/schemas";
import { addCommentOnPost, PostCommentServiceError } from "@/services/comment.service";
import { APIResponse } from "@/types";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest, ctx: RouteContext<'/api/code-post/[id]/comment'>) {
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

        const body = await request.json()
        const commentschema = commentSchema.parse(body);

        const commentid = await addCommentOnPost(id, user.user.id, commentschema.content, commentschema.startline, commentschema.endline)

        return NextResponse.json<APIResponse<string>>({
            message: "added the comment on the Post",
            status: "success",
            data: commentid
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
        else if (error instanceof ZodError) {
            return NextResponse.json<APIResponse<string>>({
                message: error.issues.at(0)?.message ?? "",
                status: "invalid",
            }, {
                status: status.UNPROCESSABLE_ENTITY
            })
        }
        else {
            return NextResponse.json<APIResponse>({
                status: "error",
                message: "Failed to add the comment on the post"
            }, {
                status: status.INTERNAL_SERVER_ERROR
            })
        }
    }
}