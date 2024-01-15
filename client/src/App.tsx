import { useEffect } from "react";
import "./App.css";
import KanbanBoard from "./components/Board";
import Login from "./components/Login";
import Register from "./components/Register";

import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <KanbanBoard />,
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
