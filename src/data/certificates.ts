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
    credentialUrl: "https://www.hackerrank.com/certificates/e0773c45f209",
    order: 1,
  },
];
