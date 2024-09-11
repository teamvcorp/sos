import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const secret = process.env.NEXTAUTH_SECRET; // Ensure you have this secret set in your environment

export async function middleware(req) {
  const { nextUrl } = req;
  
  // Fetch the token to check if the user is authenticated
  const token = await getToken({ req, secret });
  const isLoggedIn = !!token; // Checks if the user is authenticated
  console.log("is logged in ", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow requests to API authentication routes or public routes
  if (isApiAuthRoute || isPublicRoute) {
    return NextResponse.next(); // Continue processing the request
  }

  // Redirect non-authenticated users trying to access protected routes
  if (!isLoggedIn && !isAuthRoute) {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("callbackUrl", nextUrl.href);
    return NextResponse.redirect(loginUrl); // Redirect to login page
  }

  // Redirect authenticated users away from auth routes (e.g., login or register)
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  // Continue processing the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
