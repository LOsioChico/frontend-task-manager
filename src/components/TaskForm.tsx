import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

export const TaskForm = () => {
  const { createTask } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await createTask({
      title: title.trim(),
      description: description.trim() || undefined,
    });

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
        Add Task
      </button>
    </form>
  );
};
