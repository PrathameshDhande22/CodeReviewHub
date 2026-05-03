import { NextRequest, NextResponse, ProxyConfig } from "next/server";
import { getOptionalServerSession } from "./auth";

export default async function proxy(request: NextRequest) {
    const user = await getOptionalServerSession();
    if (!user) {
        return NextResponse.redirect(new URL("/", request.url))
    }
}

export const config: ProxyConfig = {
    matcher: [
        '/profile/:path*',
        '/post/:path*',
    ]
}