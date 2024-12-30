import { useState } from "react";
import { Task } from "../types/task";
import { useTaskContext } from "../context/TaskContext";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { FaTrash, FaCheck, FaEdit } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { updateTask, deleteTask, isLoading } = useTaskContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");

  const handleToggleComplete = () => {
    updateTask(task._id, { completed: !task.completed });
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteTask(task._id);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmEdit = () => {
    if (editTitle.trim()) {
      updateTask(task._id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditModalOpen(false);
    }
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

        <div className="flex space-x-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button variant="secondary" onClick={handleEdit} disabled={isLoading}>
            <FaEdit className="w-4 h-4" />
            <span className="sr-only">Edit task</span>
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
            <FaTrash className="w-4 h-4" />
            <span className="sr-only">Delete task</span>
          </Button>
        </div>
      </div>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        description={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleConfirmEdit}
        title="Edit Task"
        description={
          <div className="space-y-4">
            <div>
              <label htmlFor="editTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                id="editTitle"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="editDescription" className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                id="editDescription"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
              />
            </div>
          </div>
        }
        confirmText="Save Changes"
        cancelText="Cancel"
      />
    </>
  );
};

export default TaskItem;
