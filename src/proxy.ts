import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/auth-session";

const PUBLIC_ROUTES = ["/", "/login"];
const PUBLIC_PREFIXES = ["/legal"];

const isPublicRoute = (pathname: string): boolean => {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  return PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
};

export const proxy = async (request: NextRequest): Promise<NextResponse> => {
  const { pathname } = request.nextUrl;

  if (isPublicRoute(pathname)) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    return NextResponse.next();
  } catch {
    const redirectResponse = NextResponse.redirect(
      new URL("/login", request.url),
    );
    redirectResponse.cookies.delete(SESSION_COOKIE_NAME);
    return redirectResponse;
  }
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
