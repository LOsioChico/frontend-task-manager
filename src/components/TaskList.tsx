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
      {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10" />}

      {filteredTasks.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          {filter === "all"
            ? "No tasks found. Create one!"
            : `No ${filter === "completed" ? "completed" : "pending"} tasks found.`}
        </div>
      ) : (
        filteredTasks.map((task) => <TaskItem key={task._id} task={task} />)
      )}
    </div>
  );
};
