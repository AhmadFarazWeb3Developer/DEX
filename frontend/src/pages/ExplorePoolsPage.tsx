import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import Pools from "../components/Pools";
import Tokens from "../components/Tokens";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { TokenType } from "@/types/TokenType";

const ExplorePoolsPage = () => {
  const [isPoolSet, setPool] = useState(true);
  const [isTokensSet, setTokens] = useState(false);
  const [seachedTokens, setSearchedTokens] = useState<TokenType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {}, [seachedTokens]);
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
          <button
            onClick={() => navigate("/explore-pools/add-liquidity")}
            className="bg-[#00C084] text-black font-semibold px-4 py-2 rounded-lg hover:bg-[#00a870] transition cursor-pointer"
          >
            Add Liquidity
          </button>
        </div>
        {isPoolSet && <Pools />}
        {isTokensSet && <Tokens />}
      </div>
    </div>
  );
};

export default ExplorePoolsPage;
