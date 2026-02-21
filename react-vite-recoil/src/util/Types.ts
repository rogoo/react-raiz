export type FilterTodoType = "Show All" | "Show Completed" | "Show Uncompleted";

export interface ITodo {
  id: number;
  text: string;
  isComplete: boolean;
}

export interface ITodoStats {
  total: number;
  totalCompleted: number;
  totalUncompleted: number;
  totalPercentCompleted: number;
}
