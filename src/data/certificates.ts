import sqlAdvancedImage from "@/assets/certificates/sql_advanced_certificate.webp";

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuedAt: string;
  image?: string;
  credentialUrl?: string;
  credentialId?: string;
  skills?: string[];
  order: number;
}

export const certificates: Certificate[] = [
  {
    id: "sql-advanced",
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    issuedAt: "Sep 2026",
    image: sqlAdvancedImage,
    credentialUrl: "https://www.hackerrank.com/certificates/e0773c45f209",
    order: 1,
  },
];
