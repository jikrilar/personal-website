export interface Project {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  image?: string;
  liveUrl?: string;
  repositoryUrl?: string;
  featured: boolean;
  order: number;
}

// Project entries will be added from a separate canonical project source.
export const projects: Project[] = [];
