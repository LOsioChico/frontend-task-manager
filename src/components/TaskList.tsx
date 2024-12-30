import { useEffect } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

export const TaskList = () => {
  const { tasks, isLoading, error, filter, fetchTasks } = useTaskContext();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.data.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="space-y-4 relative">
      {isLoading && (
        <>
          <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Loading...
          </div>
          <div className="absolute inset-0 bg-white opacity-50"></div>
        </>
      )}

      {filteredTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
};
