import { Search } from "lucide-react";

import Pools from "../components/Pools";
import { useState } from "react";

import Tokens from "../components/Tokens";
const ExplorePoolsPage = () => {
  const [isPoolSet, setPool] = useState(true);
  const [isTokensSet, setTokens] = useState(false);

  return (
    <div className="w-full  min-h-screen px-4 py-4 ">
      <div className="flex flex-row justify-between items-center mb-6">
        <div className="flex flex-row gap-3">
          <button
            onClick={() => {
              setTokens(true);
              setPool(false);
            }}
            className="text-white px-4 py-2 rounded-lg hover:bg-[#133022] transition"
          >
            Tokens
          </button>
          <button
            onClick={() => {
              setPool(true);
              setTokens(false);
            }}
            className="text-white px-4 py-2 rounded-lg bg-[#133022] hover:bg-[#0F261A] transition"
          >
            Pools
          </button>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <button className="bg-[#00C084] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#00a870] transition">
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
  );
};

export default ExplorePoolsPage;
