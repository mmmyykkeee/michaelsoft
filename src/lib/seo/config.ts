export const siteConfig = {
  name: "MichaelSoft",
  legalName: "MichaelSoft",
  tagline:
    "Custom software, AI agents, and procurement systems for Kenya — product-led delivery by Michael Kembugua.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://michaelsoft.co.ke",
  locale: "en_KE",
  country: "Kenya",
  email: "0mykembugua@gmail.com",
  phone: "+254704472009",
  whatsapp: "https://api.whatsapp.com/send?phone=254704472009",
  founder: {
    name: "Michael Kembugua",
    jobTitle: "Founder & Product Leader",
    linkedIn: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
  },
  defaultOgImage: "/michaelsoft_bg.jpg",
} as const;

export const contactLinks = {
  tel: `tel:${siteConfig.phone}`,
  email: `mailto:${siteConfig.email}`,
  whatsapp: siteConfig.whatsapp,
} as const;
