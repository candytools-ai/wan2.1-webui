import createMiddleware from "next-intl/middleware";
import { defaultLocale, localePrefix, localeDetection, locales } from "@/config/site";
import { NextRequest, NextResponse } from "next/server";

const handleI18nRouting = createMiddleware({
  // A list of all locales that are supported
  locales: locales,
  localePrefix: localePrefix,
  // pathnames: pathnames,
  // Used when no locale matches
  defaultLocale: defaultLocale,
  localeDetection: localeDetection
});


export default function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  // response.headers.set("chooat-model", request.nextUrl.pathname.get("model") || "")

  if (request.nextUrl.pathname === '/dashboard') {
    // 重定向到新页面
    return NextResponse.redirect(`${process.env.AUTH_URL}/dashboard/account`);
  }
  // 如果直接访问子路由时服务端返回主布局
  // if (request.nextUrl.pathname.startsWith('/create/')) {
  //   return NextResponse.rewrite(new URL('/create', request.url))
  // }

  return response;
}

export const config = {
  matcher: [
    "/",
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    // '/(ar|cn|de|en|es|fr|it|ja|ko|pt|ru)/:path*',

    "/((?!api|_next|.*\\..*).*)",
  ],
};
