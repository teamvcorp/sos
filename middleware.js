import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("is logged in ", isLoggedIn);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Handling API authentication and public routes
  if (isApiAuthRoute || isPublicRoute) {
    return null; // No redirection needed
  }

  // Redirect non-authenticated users trying to access protected routes
  if (!isLoggedIn && !isAuthRoute) {
    const loginUrl = new URL("/", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.href);
    return Response.redirect(loginUrl);
  }

  // Redirect authenticated users to the dashboard from auth routes
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin));
  }

  return null; // No action needed, proceed as normal
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
