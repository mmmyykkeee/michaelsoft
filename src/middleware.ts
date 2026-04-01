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

  // 1. Safety check for the Root Domain (localhost or co.ke)
  // If we're JUST at localhost:3002 or michaelsoft.co.ke, go to the landing page.
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "michaelsoft.co.ke";
  if (hostname === "localhost:3002" || hostname === "127.0.0.1:3002" || hostname === rootDomain) {
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

    // 4. Internal Rewrite to Pages
    // For admin.localhost:3002, rewrite to /admin/...
    return NextResponse.rewrite(
      new URL(`/${subdomain}${path === "/" ? "" : path}`, req.url)
    );
  }

  // Fallback to normal behavior
  return NextResponse.next();
}
