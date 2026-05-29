import { NextRequest, NextResponse, ProxyConfig } from "next/server";
import { getOptionalServerSession } from "./auth";
import { APIResponse } from "./types";
import status from "http-status";

export default async function proxy(request: NextRequest) {
    const user = await getOptionalServerSession();
    const isApiRoute = request.nextUrl.pathname.startsWith('/api');

    // Authenticated user trying to access the root path → redirect to browse page
    if (user && request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/browse", request.url));
    }

    if (isApiRoute) {
        if (request.method !== "GET" && !user) {
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
        return NextResponse.next();
    }

    if (!user) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config: ProxyConfig = {
    matcher: [
        '/profile/:path*',
        '/post/:path*',
        '/api/code-post',
        '/api/code-post/:path*',
        '/api/review',
        '/api/comment'
    ]
}