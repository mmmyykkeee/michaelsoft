import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host") || "";
  const path = url.pathname;

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "michaelsoft.co.ke";
  const isLocalhost = hostname.includes("localhost") || hostname.includes("127.0.0.1");
  const isRootDomain = hostname === rootDomain || hostname === "localhost:3002" || hostname === "127.0.0.1:3002";
  
  if (isRootDomain) {
    return NextResponse.next();
  }

  // 2. Subdomain Extraction
  // This handles admin.localhost:3002 AND admin.michaelsoft.co.ke
  const subdomains = ["admin", "status", "docs", "procurement"];
  const subdomain = subdomains.find(s => hostname.startsWith(`${s}.`));

  if (subdomain) {
    // 3. Special External Proxy for Procurement
    const extUrl = process.env.PROCUREMENT_EXTERNAL_URL;
    if (subdomain === "procurement" && extUrl && !extUrl.includes("your-procurement-app")) {
      return NextResponse.rewrite(new URL(`${extUrl}${path}`, req.url));
    }

    // 4. Admin Subdomain Protection with Better Auth
    if (subdomain === "admin") {
      // Exclude auth-related routes to prevent redirect loops
      if (!path.startsWith("/login") && !path.startsWith("/api/auth")) {
        // Native check using the session cookie created by our callback route
        const sessionCookie = req.cookies.get("sb-admin-session");

        if (!sessionCookie?.value) {
          // Redirect unauthenticated users to the login page, passing the callback url
          const loginUrl = new URL("/login", req.url);
          loginUrl.searchParams.set("callbackURL", req.url);
          return NextResponse.redirect(loginUrl, { status: 302 });
        }
      }
    }

    // 5. Internal Rewrite to Pages
    // For admin.localhost:3002, rewrite to /admin/...
    return NextResponse.rewrite(
      new URL(`/${subdomain}${path === "/" ? "" : path}`, req.url)
    );
  }

  // Fallback to normal behavior
  return NextResponse.next();
}
