import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <div className="bg-[#0B1E13]  font-chypre  flex flex-row  justify-center  tracking-(--letter-spacing-wide) w-full px-2 sm:px-6 ">
        <Outlet />
      </div>

      <Toaster position="top-center" richColors />
    </>
  );
}

export default App;
