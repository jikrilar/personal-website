export interface SkillGroup {
  id: string;
  label: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "languages-and-web",
    label: "Languages & Web",
    skills: ["PHP", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    id: "frameworks-and-libraries",
    label: "Frameworks & Libraries",
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
      "REST APIs",
      "Webhooks",
      "OAuth",
      "Third-Party APIs",
      "Payment Gateways (DOKU, Midtrans, Stripe)",
    ],
  },
  {
    id: "version-control",
    label: "Version Control",
    skills: ["Git", "GitHub"],
  },
  {
    id: "infrastructure-and-deployment",
    label: "Infrastructure & Deployment",
    skills: ["Linux", "Docker", "Vercel", "AWS", "cPanel"],
  },
  {
    id: "development-tools",
    label: "Development Tools",
    skills: ["Postman"],
  },
];
