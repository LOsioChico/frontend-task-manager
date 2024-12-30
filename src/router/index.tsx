import { createBrowserRouter } from "react-router-dom";
import { TaskProvider } from "../context/TaskContext";
import Home from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <TaskProvider>
        <Home />
      </TaskProvider>
    ),
  },
]);
