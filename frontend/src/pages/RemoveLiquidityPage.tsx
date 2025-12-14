import { useState } from "react";
import SelectToken from "../components/cards/SelectToken";
import TokenButton from "../components/cards/TokenButton";
import { TokenType } from "../types/TokenType";
import useRemoveLiquidity from "../blockchain-interaction/useRemoveLiquidity";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";

const RemoveLiquidityPage = () => {
  const [tokenA, setTokenA] = useState<TokenType | null>(null);
  const [tokenB, setTokenB] = useState<TokenType | null>(null);
  const [liquidity, setLiquidity] = useState("");

  const [isTokenASelected, setIsTokenASelected] = useState(false);
  const [isTokenBSelected, setIsTokenBSelected] = useState(false);

  const { address, isConnected } = useAppKitAccount();
  const { removeLiquidity, isRemovingLiquidity } = useRemoveLiquidity();

  const handleRemoveLiquidity = async () => {
    if (!address || !isConnected) {
      toast.error("Please connect wallet!");
      return;
    }
    if (!tokenA?.address || !tokenB?.address) {
      toast.error("Please select both tokens!");
      return;
    }
    if (!liquidity) {
      toast.error("Please enter liquidity amount!");
      return;
    }

    await removeLiquidity(tokenA.address, tokenB.address, liquidity, address);
  };

  return (
    <div className=" w-full">
      <Navbar />
      <div className="min-h-screen bg-[#0b1e13] p-6 flex justify-center items-start">
        <div className="w-1/2 bg-[#12291a] rounded-2xl p-6 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-6">
            Remove Liquidity
          </h1>

          <div className="bg-[#0B1E13] border border-[#1f3528] rounded-lg p-4 mb-4 relative">
            <div className="flex justify-between items-center">
              <TokenButton
                token={tokenA}
                onClick={() => setIsTokenASelected((p) => !p)}
              />
            </div>
            {isTokenASelected && (
              <div className="absolute right-0 mt-3 z-50 w-full">
                <SelectToken setToken={setTokenA} />
              </div>
            )}
          </div>

          <div className="bg-[#0B1E13] border border-[#1f3528] rounded-lg p-4 mb-4 relative">
            <div className="flex justify-between items-center">
              <TokenButton
                token={tokenB}
                onClick={() => setIsTokenBSelected((p) => !p)}
              />
            </div>
            {isTokenBSelected && (
              <div className="absolute right-0 mt-3 z-50 w-full">
                <SelectToken setToken={setTokenB} />
              </div>
            )}
          </div>

          {/* Liquidity Input */}
          <div className="bg-[#0B1E13] border border-[#1f3528] rounded-lg p-4 mb-6">
            <input
              type="text"
              placeholder="Liquidity amount"
              value={liquidity}
              onChange={(e) => setLiquidity(e.target.value)}
              className="bg-transparent text-white text-xl outline-none w-full"
            />
          </div>

          {/* Remove Button */}
          {!isRemovingLiquidity ? (
            <button
              onClick={handleRemoveLiquidity}
              disabled={!tokenA || !tokenB || !liquidity}
              className="w-full py-3 bg-[#FF4D4D] hover:bg-[#E63939] text-white font-semibold rounded-lg transition disabled:opacity-50"
            >
              Remove Liquidity
            </button>
          ) : (
            <button
              disabled
              className="w-full py-3 bg-[#FF4D4D] hover:bg-[#E63939] text-white font-semibold rounded-lg transition disabled:opacity-50"
            >
              <Loader2 /> Removing Liquidity
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveLiquidityPage;
