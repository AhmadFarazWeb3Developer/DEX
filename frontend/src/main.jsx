import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReownProvider from "./context/ReownProvider.jsx";
import HomePage from "./pages/HomePage.jsx";
import ExplorePoolPage from "./pages/ExplorePoolsPage.tsx";
import CreatePoolPage from "./pages/CreatePoolPage.tsx";
import RemoveLiquidityPage from "./pages/RemoveLiquidityPage.tsx";
import AddLiquidityPage from "./pages/AddLiquidityPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/explore-pools", element: <ExplorePoolPage /> },
      { path: "/create-pool", element: <CreatePoolPage /> },
      { path: "/explore-pools/add-liquidity", element: <AddLiquidityPage /> },
      {
        path: "/explore-pools/remove-liquidity",
        element: <RemoveLiquidityPage />,
      },
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
