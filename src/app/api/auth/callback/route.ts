import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase. (Using anon key for sign in to mimic client, or service role)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return NextResponse.redirect(new URL("/admin/login?error=MissingCredentials", req.url));
    }

    // Authenticate with Supabase Natively
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      console.error("Login failed:", error?.message);
      return NextResponse.redirect(new URL("/admin/login?error=InvalidCredentials", req.url));
    }

    // Create a response redirecting to /admin  (or the callback URL if available)
    const url = new URL("/admin", req.url);
    const response = NextResponse.redirect(url, { status: 302 });

    // Set a session cookie that middleware can read
    // We set HttpOnly so it's secure. 
    response.cookies.set("sb-admin-session", data.session.access_token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;

  } catch (err) {
    console.error("Callback route error:", err);
    return NextResponse.redirect(new URL("/admin/login?error=InternalServerError", req.url));
  }
}
