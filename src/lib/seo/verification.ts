import type { Metadata } from "next";

/** Merges Google, Bing, and other site verification meta tags from env. */
export function buildSiteVerificationMetadata(): Metadata["verification"] {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

  if (!google && !bing) return undefined;

  const verification: NonNullable<Metadata["verification"]> = {};

  if (google) verification.google = google;
  if (bing) {
    verification.other = {
      ...(verification.other ?? {}),
      "msvalidate.01": bing,
    };
  }

  return verification;
}
