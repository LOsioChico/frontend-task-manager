import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CreateTaskDTO, UpdateTaskDTO, TaskFilter, TaskResponse } from "../types/task";
import { taskManagerApi } from "../api/taskManagerApi";

interface TaskContextType {
  tasks: TaskResponse;
  isLoading: boolean;
  error: string | null;
  filter: TaskFilter;
  fetchTasks: (page?: number) => Promise<void>;
  createTask: (task: CreateTaskDTO) => Promise<void>;
  updateTask: (id: string, task: UpdateTaskDTO) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilter: (filter: TaskFilter) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskResponse>({
    success: false,
    data: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskFilter>("all");

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await taskManagerApi.get("/", {
        params: {
          status: filter !== "all" ? filter : undefined,
        },
      });
      setTasks(response.data);
      setError(null);
    } catch {
      setError("Error fetching tasks");
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  const createTask = async (task: CreateTaskDTO) => {
    setIsLoading(true);
    try {
      await taskManagerApi.post("/", task);
      await fetchTasks();
      setError(null);
    } catch {
      setError("Error creating task");
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id: string, task: UpdateTaskDTO) => {
    setIsLoading(true);
    try {
      await taskManagerApi.put(`/${id}`, task);
      await fetchTasks();
      setError(null);
    } catch {
      setError("Error updating task");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setIsLoading(true);
    try {
      await taskManagerApi.delete(`/${id}`);
      await fetchTasks();
      setError(null);
    } catch {
      setError("Error deleting task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        filter,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        setFilter,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
