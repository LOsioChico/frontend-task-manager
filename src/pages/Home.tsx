import { TaskList } from "../components/TaskList";
import { TaskForm } from "../components/TaskForm";
import { useTaskContext } from "../context/TaskContext";
import { TaskFilter } from "../types/task";
import { Button } from "../components/ui/Button";

const Home = () => {
  const { filter, setFilter } = useTaskContext();

  const filters: { label: string; value: TaskFilter }[] = [
    { label: "All Tasks", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
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
            {filters.map(({ label, value }) => (
              <Button key={value} variant={filter === value ? "primary" : "secondary"} onClick={() => setFilter(value)}>
                {label}
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
