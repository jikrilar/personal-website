export interface Experience {
  id: string;
  organization: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string;
  periodLabel: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    id: "pt-apex-mitra-malindo-web-developer-intern",
    organization: "PT Apex Mitra Malindo",
    location: "South Jakarta, Indonesia",
    role: "Web Developer Intern",
    startDate: "Sep 2024",
    endDate: "Feb 2025",
    periodLabel: "Sep 2024 - Feb 2025",
    highlights: [
      "Reduced attendance processing time from ~2s to <1s by implementing automated data cleanup with Laravel Job Queue.",
      "Developed HRIS leave management and employee photo capture features using Laravel and MySQL.",
      "Optimized Helpdesk database queries and implemented CSV import/export for efficient bulk data processing.",
      "Maintained Laravel production applications by resolving bugs, improving features, and optimizing database operations.",
      "Deployed and maintained applications on cPanel, including domain configuration.",
      "Created technical documentation and video tutorials for end users.",
    ],
  },
];
