import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Button } from "./ui/Button";
import { FaPlus } from "react-icons/fa";
import { MdTitle, MdDescription } from "react-icons/md";

export const TaskForm = () => {
  const { createTask, isLoading } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await createTask({
        title: title.trim(),
        description: description.trim() || undefined,
      });

      setTitle("");
      setDescription("");
    } catch {
      setError("Failed to create task. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <label htmlFor="title" className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <MdTitle className="w-4 h-4 mr-1" />
          Task Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="flex items-center text-sm font-medium text-gray-700 mb-1">
          <MdDescription className="w-4 h-4 mr-1" />
          Description (Optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add task description"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] transition-colors duration-200"
        />
      </div>

      {error && (
        <div className="flex items-center text-red-500 text-sm bg-red-50 p-2 rounded">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      <Button type="submit" className="w-full flex items-center justify-center" isLoading={isLoading}>
        <FaPlus className="w-4 h-4 mr-2" />
        Add Task
      </Button>
    </form>
  );
};
