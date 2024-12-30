import { Task } from "../types/task";
import { useTaskContext } from "../context/TaskContext";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { updateTask, deleteTask } = useTaskContext();

  const handleToggleComplete = () => {
    updateTask(task._id, { completed: !task.completed });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task._id);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <input type="checkbox" checked={task.completed} onChange={handleToggleComplete} className="w-4 h-4" />
        <div>
          <h3 className={`font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>{task.title}</h3>
          {task.description && <p className="text-sm text-gray-500">{task.description}</p>}
          <p className="text-xs text-gray-400">{new Date(task.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <button onClick={handleDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
