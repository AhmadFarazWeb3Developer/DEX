import React, { useEffect, useState } from "react";

import Pools from "../components/Pools";
import Tokens from "../components/Tokens";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const ExplorePoolsPage = () => {
  const [isPoolSet, setPool] = useState(true);
  const [isTokensSet, setTokens] = useState(false);
  const [searchedValue, setSearchedValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);

    setSearchedValue(value);
  };

  return (
    <div className="w-full">
      <Navbar />

      <div className="w-full  min-h-screen  py-4 ">
        <div className="flex flex-row justify-between items-center mb-6">
          <div className="flex flex-row gap-3">
            <button
              onClick={() => {
                setTokens(true);
                setPool(false);
              }}
              className={`text-white px-4 py-2 rounded-lg transition cursor-pointer ${
                isTokensSet
                  ? "bg-[#133022] hover:bg-[#0F261A] font-semibold"
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
              className={`text-white px-4 py-2 rounded-lg transition cursor-pointer ${
                isPoolSet
                  ? "bg-[#133022] hover:bg-[#0F261A] font-semibold"
                  : "hover:bg-[#133022]"
              }`}
            >
              Pools
            </button>
          </div>

          <div className=" flex flex-row justify-end w-full gap-2">
            <button
              onClick={() => navigate("/explore-pools/add-liquidity")}
              className="bg-[#00C084] text-black font-semibold px-3 py-1  text-sm rounded-lg hover:bg-[#00a870] transition cursor-pointer"
            >
              Add Liquidity
            </button>

            <div className="flex flex-row  sm:w-75 items-center bg-[#0F2A1D] border border-[#1f3528] rounded-lg px-3 py-1 ">
              <input
                type="text"
                value={searchedValue}
                onChange={handleInputChange}
                placeholder={isTokensSet ? "Search tokens" : "Search pools"}
                className="bg-transparent text-white outline-none text-sm w-full placeholder-gray-400"
              />
              <Search strokeWidth={1.5} size={20} className=" text-gray-400" />
            </div>
          </div>
        </div>
        {isPoolSet && <Pools searchedValue={searchedValue} />}
        {isTokensSet && <Tokens searchedValue={searchedValue} />}
      </div>
    </div>
  );
};

export default ExplorePoolsPage;
