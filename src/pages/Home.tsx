import { TaskList } from "../components/TaskList";
import { TaskForm } from "../components/TaskForm";
import { useTaskContext } from "../context/TaskContext";
import { TaskFilter } from "../types/task";

const Home = () => {
  const { filter, setFilter } = useTaskContext();

  const filters: { label: string; value: TaskFilter }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];

  const handleFilterChange = (newFilter: TaskFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Task Manager</h1>

      <div className="mb-8">
        <TaskForm />
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => handleFilterChange(value)}
            className={`px-4 py-2 rounded ${
              filter === value ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <TaskList />
    </div>
  );
};

export default Home;
