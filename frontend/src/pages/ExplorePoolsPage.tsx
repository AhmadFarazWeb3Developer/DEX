import { Search } from "lucide-react";
import { useState } from "react";

import Pools from "../components/Pools";
import Tokens from "../components/Tokens";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ExplorePoolsPage = () => {
  const [isPoolSet, setPool] = useState(true);
  const [isTokensSet, setTokens] = useState(false);

  const navigate = useNavigate();
  return (
    <div className=" w-full">
      <Navbar />

      <div className="w-full  min-h-screen px-4 py-4 ">
        <div className="flex flex-row justify-between items-center mb-6">
          <div className="flex flex-row gap-3">
            <button
              onClick={() => {
                setTokens(true);
                setPool(false);
              }}
              className={`text-white px-4 py-2 rounded-lg transition ${
                isTokensSet
                  ? "bg-[#133022] hover:bg-[#0F261A]"
                  : "hover:bg-[#133022]"
              }`}
            >
              Tokens
            </button>
            <button
              onClick={() => {
                setPool(true);
                setTokens(false);
              }}
              className={`text-white px-4 py-2 rounded-lg transition ${
                isPoolSet
                  ? "bg-[#133022] hover:bg-[#0F261A]"
                  : "hover:bg-[#133022]"
              }`}
            >
              Pools
            </button>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <button
              onClick={() => navigate("/explore-pools/add-liquidity")}
              className="bg-[#00C084] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#00a870] transition"
            >
              Add Liquidity
            </button>

            <div className="flex flex-row items-center bg-[#0F2A1D] border border-[#1f3528] rounded-lg px-3 py-1">
              <input
                type="text"
                placeholder="Search Pools"
                className="bg-transparent text-white outline-none placeholder-gray-400"
              />
              <Search />
            </div>
          </div>
        </div>
        {isPoolSet && <Pools />}
        {isTokensSet && <Tokens />}
      </div>
    </div>
  );
};

export default ExplorePoolsPage;
