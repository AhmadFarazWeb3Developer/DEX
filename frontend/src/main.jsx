import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ExplorePoolPage from "./pages/ExplorePoolsPage.tsx";
import CreatePoolPage from "./pages/CreatePoolPage.tsx";
import ReownProvider from "./context/ReownProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/explore-pools", element: <ExplorePoolPage /> },
      { path: "/create-pool", element: <CreatePoolPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReownProvider>
      <RouterProvider router={router} />
    </ReownProvider>
  </StrictMode>
);
