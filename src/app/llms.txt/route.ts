import { canonicalUrl } from "@/lib/seo";
import { llmsContent } from "@/llms-content";
import { getPost } from "@/services/postCode.service";
import { APIResponse } from "@/types";
import status from "http-status";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
    try {
        const posts = await getPost(0, Number.MAX_SAFE_INTEGER);

        let mdfile = llmsContent;
        posts.forEach((value, index) => {
            mdfile = mdfile.concat(`${index + 1}. [${value.title}](${canonicalUrl(`/post/${value.id}`)}): ${value.description}\n`)
        })
        return new NextResponse(mdfile, {
            headers: {
                "Content-Type": "text/markdown",
            },
            status: status.OK,
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json<APIResponse>(
            { message: "Failed to Retrieve the llms.txt", status: "error" },
            { status: status.INTERNAL_SERVER_ERROR },
        );
    }
}