import { useEffect, useState } from "react";
import SelectToken from "../components/cards/SelectToken";
import TokenButton from "../components/cards/TokenButton";
import { TokenType } from "../types/TokenType";
import useRemoveLiquidity from "../blockchain-interaction/useRemoveLiquidity";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import useLpTokens from "../blockchain-interaction/helper/useLpTokens";

const RemoveLiquidityPage = () => {
  const [tokenA, setTokenA] = useState<TokenType | null>(null);
  const [tokenB, setTokenB] = useState<TokenType | null>(null);
  const [liquidity, setLiquidity] = useState("");

  const [isTokenASelected, setIsTokenASelected] = useState(false);
  const [isTokenBSelected, setIsTokenBSelected] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);

  const { address, isConnected } = useAppKitAccount();
  const { removeLiquidity, isRemovingLiquidity } = useRemoveLiquidity();

  const { fetchLpTokens, lpTokens } = useLpTokens();

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

  useEffect(() => {
    fetchLpTokens(tokenA?.address, tokenB?.address, address);
  }, [tokenA, tokenB, address]);

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

          <div
            className={`bg-[#0B1E13] border border-[#1f3528] rounded-lg p-4 mb-6
  ${shakeInput ? "animate-shake border-red-500" : ""}`}
          >
            <input
              type="text"
              placeholder="Liquidity amount"
              value={liquidity}
              onChange={(e) => {
                const value = e.target.value;

                if (!value) {
                  setLiquidity("");
                  return;
                }

                // block non-numbers
                if (isNaN(Number(value))) return;

                // HARD LIMIT ENFORCEMENT
                if (Number(value) > Number(lpTokens)) {
                  setShakeInput(true);
                  setLiquidity("");

                  toast.error("Stay within your liquidity limit");

                  // remove shake after animation
                  setTimeout(() => setShakeInput(false), 300);
                  return;
                }

                setLiquidity(value);
              }}
              className="bg-transparent text-white text-xl outline-none w-full"
            />
          </div>

          <div className="mt-4 rounded-xl border border-[#1f3528] bg-[#0F2A1D] p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">Your LP Tokens</p>
              <p className="text-lg font-semibold text-white">
                {Number(lpTokens).toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })}
              </p>
            </div>

            <button
              onClick={() => setLiquidity(lpTokens)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg
               bg-[#133022] text-[#00C084] hover:bg-[#17402c] transition"
            >
              MAX
            </button>
          </div>

          {!isRemovingLiquidity ? (
            <button
              onClick={handleRemoveLiquidity}
              disabled={
                !tokenA || !tokenB || !liquidity || Number(liquidity) === 0
              }
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
