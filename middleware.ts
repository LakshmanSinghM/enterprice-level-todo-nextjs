import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const token = request.cookies.get("authToken")?.value;

    console.log("Token in the middleware are ", token);

    if (token && request.nextUrl.pathname === "/") {
        console.log("Coming inside")
        return NextResponse.redirect(new URL("/user", request.url));
    }

    // const isAuthPage = ["/login", "/register"].includes(request.nextUrl.pathname)

    // if (!token && request.nextUrl.pathname.startsWith("/")) {
    //     return NextResponse.redirect(new URL("/login", request.url))
    // }

    // if (token && isAuthPage) {
    //     return NextResponse.redirect(new URL("/", request.url))
    // }

    // console.log("Middlware running....")

    return NextResponse.next()
}

export const config = {
    matcher: ["/:path*", "/login", "/register"],
}