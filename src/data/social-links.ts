export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  {
    id: "phone",
    label: "Phone",
    href: "tel:+6281996947657",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    href: "https://jikrilar.vercel.app/",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jikrilaryanda/",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/jikrilar",
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:m.jikrilaryanda@gmail.com",
  },
];
