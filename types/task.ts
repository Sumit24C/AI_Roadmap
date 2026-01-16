export interface Task {
  id?: string;
  nodeId: string;

  title: string;
  description: string;
  expectedOutput: string;

  type: "practice" | "mini_project" | "capstone";
  difficulty: "easy" | "medium" | "hard";

  isCompleted: boolean;

  startDate?: any;
  endDate?: any;

  createdAt?: any;
  updatedAt?: any;
}
