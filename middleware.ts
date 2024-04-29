import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes} from "@/routes";
import {next} from "sucrase/dist/types/parser/tokenizer";
import {NextApiRequest} from "next";

const {auth} = NextAuth(authConfig)
type NextAuthRequest = NextApiRequest & { auth?: any };
//@ts-ignore
export default auth((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRouter = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRouter = authRoutes.includes(nextUrl.pathname);
  if (isApiAuthRouter) {
    return null;

  }
  if (isAuthRouter) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if(!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    console.log(encodedCallbackUrl)

    return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  return null;
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}