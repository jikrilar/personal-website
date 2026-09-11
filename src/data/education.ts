export interface Education {
  id: string;
  institution: string;
  program: string;
  startYear: string;
  endYear: string;
  gpa?: string;
}

export const education: Education[] = [
  {
    id: "politeknik-sukabumi",
    institution: "Politeknik Sukabumi",
    program: "Associate Degree in Computer Engineering",
    startYear: "2022",
    endYear: "2025",
    gpa: "3.53/4.00",
  },
];
