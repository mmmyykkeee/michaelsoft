import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Projects — Software & Digital Products",
  description:
    "MichaelSoft project archive—custom software, digital products, and engineering work from Kenya.",
  path: "/projects",
  keywords: ["MichaelSoft projects", "software portfolio Kenya"],
});

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
