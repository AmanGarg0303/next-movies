import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { getToken } from "next-auth/jwt";

const { auth } = NextAuth(authConfig);

const publicRoutes: Array<String> = [];
const authRoutes = ["/auth/login"];
const apiAuthPrefix = "/api/auth";
const adminRoutes = ["/admin/addMovie", "/admin/addCategory"];

export const DEFAULT_LOGIN_REDIRECT = "/";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  // console.log(req.auth);
  // @ts-ignore
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const isAdmin = token?.role === "ADMIN";

  if (isAdminRoute) {
    if (!isAdmin) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }

  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
