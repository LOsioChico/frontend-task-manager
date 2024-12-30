import { TaskList } from "../components/TaskList";
import { TaskForm } from "../components/TaskForm";
import { useTaskContext } from "../context/TaskContext";
import { TaskFilter } from "../types/task";
import { Button } from "../components/ui/Button";
import { FaTasks, FaCheck, FaClock } from "react-icons/fa";

const Home = () => {
  const { filter, setFilter } = useTaskContext();

  const filters: { label: string; value: TaskFilter; icon: JSX.Element }[] = [
    { label: "All Tasks", value: "all", icon: <FaTasks className="w-4 h-4" /> },
    { label: "Pending", value: "pending", icon: <FaClock className="w-4 h-4" /> },
    { label: "Completed", value: "completed", icon: <FaCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Task Manager</h1>

        <div className="mb-8">
          <TaskForm />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-3">Filter Tasks</h2>
          <div className="flex flex-wrap gap-2">
            {filters.map(({ label, value, icon }) => (
              <Button
                key={value}
                variant={filter === value ? "primary" : "secondary"}
                onClick={() => setFilter(value)}
                className="flex items-center space-x-2"
              >
                {icon}
                <span>{label}</span>
              </Button>
            ))}
          </div>
        </div>

        <TaskList />
      </div>
    </div>
  );
};

export default Home;
