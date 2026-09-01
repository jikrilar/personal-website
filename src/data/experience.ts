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
      "Implemented employee photo capture for attendance to prevent proxy check-ins in warehouse operations.",
      "Developed an HRIS leave management module using Laravel and MySQL.",
      "Optimized Helpdesk database queries and added CSV import/export support, improving data processing performance.",
      "Implemented CSV import/export functionality for the HRIS to simplify bulk data management.",
      "Resolved bugs, enhanced features, and maintained Laravel-based production applications.",
      "Designed and optimized MySQL relational databases for performance and data integrity.",
      "Deployed and maintained production applications on cPanel, including domain configuration.",
      "Created technical documentation and video tutorials for the HRIS leave management module.",
    ],
  },
];
