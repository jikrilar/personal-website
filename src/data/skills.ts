export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "programming-languages",
    label: "Programming Languages",
    skills: ["HTML", "CSS", "PHP", "Javascript", "Typescript"],
  },
  {
    id: "frameworks",
    label: "Frameworks",
    skills: ["Laravel", "Livewire", "Filament", "Next.js", "React"],
  },
  {
    id: "databases",
    label: "Databases",
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    id: "api-and-integration",
    label: "API & Integration",
    skills: [
      "RESTful API",
      "Webhook Integration",
      "OAuth Authentication",
      "Third-Party API Integration",
      "Payment Gateway Integration (Doku, Midtrans, Stripe)",
    ],
  },
  {
    id: "version-control",
    label: "Version Control",
    skills: ["Git", "GitHub"],
  },
  {
    id: "deployment-and-infrastructure",
    label: "Deployment & Infrastructure",
    skills: ["Linux Server", "Docker", "Vercel", "AWS", "cPanel"],
  },
  {
    id: "development-tools",
    label: "Development Tools",
    skills: [
      "Postman",
      "Coding Agent (OpenCode, Claude Code, Codex)",
      "AI Model (Gemini, Chatgpt, Claude)",
    ],
  },
];
