export interface Node {
  id?: string;
  userId: string;

  label: string;
  type: "concept" | "tool" | "optional" | "alternative";
  isRoot: boolean;

  parents: string[];
  children: string[];

  totalTasks: number;

  createdAt?: any;
  updatedAt?: any;
}
