import { BrowserRouter as Router, Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";

function App() {
  return (
    <div className="bg-[#0B1E13]  font-chypre  tracking-(--letter-spacing-wide) w-full px-2 sm:px-6 ">
      <Outlet />
    </div>
  );
}

export default App;
