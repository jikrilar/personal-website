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
    title: "Hoaxlin.id",
    description:
      "An Indonesian-language misinformation detection platform that processes text, article, image, and video submissions through an asynchronous pipeline backed by a fine-tuned IndoBERT service. It combines classification results with narrative explanations and keeps detection history for signed-in users.",
    highlights: [
      "Multi-format analysis with article extraction, image OCR, and video transcription",
      "Fine-tuned IndoBERT classification served through a secured FastAPI service",
      "Resilient queued pipeline with progress tracking, retries, and terminal failure handling",
      "Authenticated detection history with CSV and PDF exports",
      "Filament administration for users, datasets, submissions, results, feedback, and processing events",
    ],
    techStack: [
      "Laravel",
      "Livewire",
      "Filament",
      "MySQL",
      "FastAPI",
      "IndoBERT",
      "OpenAI API",
    ],
    repositoryUrl: "https://github.com/jikrilar/hoaxlin.id",
    featured: true,
    order: 1,
  },
  {
    slug: "meet-ai",
    title: "Meet AI",
    description:
      "A full-stack meeting platform for creating configurable AI agents and running live video conversations with them. Sessions can be recorded and transcribed, summarized with AI, and revisited through contextual follow-up chat.",
    highlights: [
      "Configurable AI agent creation and management",
      "Live video meetings with an OpenAI-powered realtime participant",
      "Automatic recording, transcription, and AI-generated meeting summaries",
      "Speaker-aware transcripts and post-meeting contextual chat",
      "Usage limits and recurring subscription management",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "OpenAI",
      "Stream Video",
      "Inngest",
      "Polar",
    ],
    repositoryUrl: "https://github.com/jikrilar/meet-ai",
    featured: false,
    order: 2,
  },
  {
    slug: "applyo",
    title: "Applyo",
    description:
      "A full-stack job application tracker that gives job seekers one workspace for managing recruitment pipelines. It combines Kanban-based status tracking with detailed application records, scheduling, search, and progress analytics.",
    highlights: [
      "Kanban application tracking with drag-and-drop stage and card ordering",
      "Application details, recruitment events, offers, outcomes, and activity history",
      "Search, filtering, sorting, pagination, and responsive list views",
      "Month and agenda calendars for interviews, assessments, and deadlines",
      "Recruitment funnel, trend, and application-source analytics",
      "Per-user data isolation with Supabase authentication and PostgreSQL row-level security",
    ],
    techStack: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
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
