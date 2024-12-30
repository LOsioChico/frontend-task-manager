import { useState } from "react";
import { Task } from "../types/task";
import { useTaskContext } from "../context/TaskContext";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { FaTrash, FaCheck } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

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
      <div className="group flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-sm transition-all duration-200">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={handleToggleComplete}
            className={`flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors duration-200 ${
              task.completed
                ? "bg-green-400 border-green-400 text-white"
                : "border-gray-300 hover:border-green-300 text-transparent hover:text-green-300"
            }`}
          >
            <FaCheck className="w-3 h-3" />
            <span className="sr-only">Mark task as {task.completed ? "incomplete" : "complete"}</span>
          </button>

          <div className="min-w-0 flex-1">
            <h3
              className={`font-medium truncate group-hover:text-blue-600 transition-colors duration-200 ${
                task.completed ? "line-through text-gray-400" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
            {task.description && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>}
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <MdAccessTime className="w-3 h-3 mr-1" />
              Created {new Date(task.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <Button
          variant="danger"
          onClick={handleDelete}
          className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          disabled={isLoading}
        >
          <FaTrash className="w-4 h-4" />
          <span className="sr-only">Delete task</span>
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
