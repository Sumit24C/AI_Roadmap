export interface UserInput {
  technologies: string[];
  experience: "beginner" | "intermediate" | "advanced";
  goal: "job" | "startup" | "freelance";
  dailyAvailability: number;
  weeklyCommitment: number;
}
