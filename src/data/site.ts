import { profile } from "@/data/profile";

export interface SiteMetadata {
  name: string;
  role: string;
  title: string;
  description: string;
  language: string;
}

export const siteMetadata: SiteMetadata = {
  name: profile.name,
  role: profile.title,
  title: `${profile.name} | ${profile.title}`,
  description: profile.summary,
  language: "en",
};
