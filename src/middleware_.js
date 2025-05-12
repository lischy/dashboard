import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {
  PUBLIC_ROUTES,
  ROOT,
  PROTECTED_SUB_ROUTES,
  LOGIN,
} from "./app/lib/routes";
// Optionally, don't invoke Middleware on some paths

const myauth = async (req) => {
  const { nextUrl } = req;
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const isOnPublicRoute =
    (PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
      nextUrl.pathname === ROOT) &&
    !PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));

  console.log(session);

  // const isLoggedIn = !!auth?.user;
  // const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  if (!isAuthenticated && !isOnPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }
  // if (isOnDashboard) {
  //   if (!isLoggedIn && nextUrl.pathname !== "/login") {
  //     // console.log(req.nextUrl.origin, req);
  //     const newUrl = new URL("/login", nextUrl.origin);
  //     return Response.redirect(newUrl);
  //   }
  // }
};

export default myauth;
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard(.*)",
  ],
};
