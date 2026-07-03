import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const AUTH_ROUTES = ["/sign-in", "/sign-up"];
const PROTECTED_ROUTES = ["/clients", "/projects"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Do not run any logic between createServerClient and getUser().
  // A simple mistake could make it very hard to debug issues with users
  // being randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const matchesRoute = (route: string) =>
    pathname === route || pathname.startsWith(`${route}/`);
  const isAuthRoute = AUTH_ROUTES.some(matchesRoute);
  const isProtectedRoute =
    pathname === "/" || PROTECTED_ROUTES.some(matchesRoute);

  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: return the supabaseResponse object as is so the refreshed
  // auth cookies are forwarded to the browser.
  return supabaseResponse;
}
