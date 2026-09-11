export interface Project {
  slug: string;
  title: string;
  description: string;
  highlights: string[];
  techStack: string[];
  image?: string;
  liveUrl?: string;
  repositoryUrl: string;
  featured: boolean;
  order: number;
}

export const projects: Project[] = [
  {
    slug: "hoaxlin-id",
    title: "Doksli - Hoax Detection Platform",
    description:
      "Developed a multimodal hoax detection platform for text, image, video, and URL inputs with asynchronous processing, IndoBERT classification, OCR, transcription, and AI-generated explanations.",
    highlights: [
      "Multimodal detection for text, image, video, and URL inputs",
      "Asynchronous processing with IndoBERT classification",
      "OCR and transcription processing",
      "AI-generated detection explanations",
    ],
    techStack: ["Laravel", "Livewire", "MySQL", "FastAPI", "IndoBERT", "OpenAI"],
    repositoryUrl: "https://github.com/jikrilar/doksli",
    featured: true,
    order: 1,
  },
  {
    slug: "meet-ai",
    title: "Meet AI - AI Meeting Platform",
    description:
      "Developed an AI-powered meeting platform with customizable AI agents, video calls, automatic transcription, recording, meeting summaries, and post-meeting AI chat.",
    highlights: [
      "Customizable AI agents",
      "Video calls",
      "Automatic transcription and recording",
      "Meeting summaries",
      "Post-meeting AI chat",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "tRPC",
      "Drizzle",
      "PostgreSQL",
      "OpenAI",
      "Stream",
    ],
    repositoryUrl: "https://github.com/jikrilar/meet-ai",
    featured: false,
    order: 2,
  },
  {
    slug: "applyo",
    title: "Applyo - Job Application Tracker",
    description:
      "Built a Kanban-based job application tracker with drag-and-drop stages, recruitment events, calendar, analytics, authentication, and Row Level Security.",
    highlights: [
      "Kanban-based application tracking with drag-and-drop stages",
      "Recruitment events and calendar",
      "Application analytics",
      "Authentication and Row Level Security",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL"],
    repositoryUrl: "https://github.com/jikrilar/applyo",
    featured: false,
    order: 3,
  },
  {
    slug: "skpi-politeknik-sukabumi",
    title: "SKPI Politeknik Sukabumi",
    description:
      "A role-based academic administration system for managing and issuing SKPI supplementary diploma records at Politeknik Sukabumi. It centralizes student activities, approval workflows, eligibility checks, and document generation.",
    highlights: [
      "Role-based workspaces for students, administrators, program heads, and student affairs staff",
      "Student records for achievements, organizations, internships, certifications, and character education",
      "Review and approval workflows for student activities and SKPI print requests",
      "Submission eligibility checks across biodata, approved activities, and learning outcomes",
      "Template-based DOCX generation from approved student records",
    ],
    techStack: [
      "Laravel",
      "Inertia.js",
      "React",
      "TypeScript",
      "MySQL",
      "Laravel Fortify",
      "PHPWord",
    ],
    repositoryUrl: "https://github.com/jikrilar/skpi-politeknik-sukabumi",
    featured: false,
    order: 4,
  },
];
