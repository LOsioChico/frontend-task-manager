export interface TaskResponse {
  success: boolean;
  data: Task[];
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}

export type TaskFilter = "all" | "completed" | "pending";
