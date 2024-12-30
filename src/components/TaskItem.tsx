import { useState } from "react";
import { Task } from "../types/task";
import { useTaskContext } from "../context/TaskContext";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { updateTask, deleteTask, isLoading } = useTaskContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleToggleComplete = () => {
    updateTask(task._id, { completed: !task.completed });
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTask(task._id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4 flex-1">
          <label className="relative flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="w-5 h-5 border-2 border-gray-300 rounded-md checked:bg-blue-500 checked:border-blue-500 transition-colors cursor-pointer"
            />
            <span className="sr-only">Mark task as {task.completed ? "incomplete" : "complete"}</span>
          </label>

          <div className="min-w-0 flex-1">
            <h3 className={`font-medium truncate ${task.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
              {task.title}
            </h3>
            {task.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>}
            <p className="text-xs text-gray-400 mt-1">Created {new Date(task.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <Button variant="danger" onClick={handleDelete} className="ml-4" disabled={isLoading}>
          Delete
        </Button>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        description={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
};

export default TaskItem;
