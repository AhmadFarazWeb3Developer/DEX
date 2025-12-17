import { useEffect, useRef, useState } from "react";
import SelectToken from "../components/cards/SelectToken";
import TokenButton from "../components/cards/TokenButton";
import { TokenType } from "../types/TokenType";
import useRemoveLiquidity from "../blockchain-interaction/useRemoveLiquidity";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "sonner";
import { Loader2, Info } from "lucide-react";
import Navbar from "../components/Navbar";
import useLpTokens from "../blockchain-interaction/helper/useLpTokens";

const RemoveLiquidityPage = () => {
  const [tokenA, setTokenA] = useState<TokenType | null>(null);
  const [tokenB, setTokenB] = useState<TokenType | null>(null);
  const [liquidity, setLiquidity] = useState("");

  const tokenARef = useRef<HTMLDivElement>(null);
  const tokenBRef = useRef<HTMLDivElement>(null);

  const [isTokenAOpen, setIsTokenAOpen] = useState(false);
  const [isTokenBOpen, setIsTokenBOpen] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;

      if (
        tokenARef.current &&
        target instanceof Node &&
        !tokenARef.current.contains(target)
      ) {
        setIsTokenAOpen(false);
      }

      if (
        tokenBRef.current &&
        target instanceof Node &&
        !tokenBRef.current.contains(target)
      ) {
        setIsTokenBOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#0b1e13]">
      <Navbar />
      <div className="p-6 flex justify-center items-start pt-12">
        <div className="w-full max-w-md">
          <div className="bg-[#12291a] rounded-2xl p-6 shadow-xl border border-[#1f3528]">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-2">
                Remove Liquidity
              </h1>
              <p className="text-sm text-gray-400">
                Remove your liquidity from the pool
              </p>
            </div>
            <div className="mb-3" ref={tokenARef}>
              <p className="text-xs text-gray-400 mb-2 font-medium">Token A</p>
              <div className="bg-[#0B1E13] border border-[#1f3528] rounded-xl p-4 hover:border-[#2a4a36] transition-colors relative">
                <TokenButton
                  token={tokenA}
                  onClick={() => setIsTokenAOpen((p) => !p)}
                />
                {isTokenAOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-50">
                    <SelectToken
                      setToken={(token) => {
                        setTokenA(token);
                        setIsTokenAOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4" ref={tokenBRef}>
              <p className="text-xs text-gray-400 mb-2 font-medium">Token B</p>
              <div className="bg-[#0B1E13] border border-[#1f3528] rounded-xl p-4 hover:border-[#2a4a36] transition-colors relative">
                <TokenButton
                  token={tokenB}
                  onClick={() => setIsTokenBOpen((p) => !p)}
                />
                {isTokenBOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-50">
                    <SelectToken
                      setToken={(token) => {
                        setTokenB(token);
                        setIsTokenBOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4 rounded-xl border border-[#1f3528] bg-[#0F2A1D] p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Your LP Tokens</p>
                  <p className="text-xl font-semibold text-white">
                    {Number(lpTokens).toLocaleString(undefined, {
                      maximumFractionDigits: 6,
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setLiquidity(lpTokens)}
                  disabled={!lpTokens || Number(lpTokens) === 0}
                  className="px-4 py-2 text-sm font-semibold rounded-lg
                   bg-[#133022] text-[#00C084] hover:bg-[#17402c] 
                   transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  MAX
                </button>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-xs text-gray-400 mb-2 font-medium">
                Amount to Remove
              </p>
              <div
                className={`bg-[#0B1E13] border rounded-xl p-4 transition-all
                  ${
                    shakeInput
                      ? "animate-shake border-red-500"
                      : "border-[#1f3528] hover:border-[#2a4a36]"
                  }`}
              >
                <input
                  type="text"
                  placeholder="0.0"
                  value={liquidity}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!value) {
                      setLiquidity("");
                      return;
                    }
                    if (isNaN(Number(value))) return;
                    if (Number(value) > Number(lpTokens)) {
                      setShakeInput(true);
                      setLiquidity("");
                      toast.error("Stay within your liquidity limit");
                      setTimeout(() => setShakeInput(false), 300);
                      return;
                    }
                    setLiquidity(value);
                  }}
                  className="bg-transparent text-white text-2xl outline-none w-full placeholder:text-gray-600"
                />
              </div>
            </div>

            {tokenA && tokenB && liquidity && (
              <div className="mb-6 bg-[#0F2A1D] border border-[#1f3528] rounded-xl p-4">
                <div className="flex items-start  gap-2">
                  <Info
                    className="text-[#00C084] mt-0.5 flex-shrink-0"
                    size={16}
                  />
                  <div className="text-xs text-gray-400">
                    <p className="mb-1">You will receive approximately:</p>
                    <p className="text-white font-medium">
                      {tokenA.symbol} and {tokenB.symbol} tokens
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleRemoveLiquidity}
              disabled={
                !tokenA ||
                !tokenB ||
                !liquidity ||
                Number(liquidity) === 0 ||
                isRemovingLiquidity
              }
              className="w-full py-4 bg-[#FF4D4D] hover:bg-[#E63939] text-white 
                       font-semibold rounded-xl transition-all disabled:opacity-50 
                       disabled:cursor-not-allowed flex items-center justify-center gap-2
                       shadow-lg hover:shadow-xl"
            >
              {isRemovingLiquidity ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Removing Liquidity...</span>
                </>
              ) : (
                "Remove Liquidity"
              )}
            </button>
          </div>

          <div className="mt-6 bg-[#12291a] rounded-xl p-4 border border-[#1f3528]">
            <div className="flex items-start gap-2">
              <Info className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
              <p className="text-xs text-gray-400">
                Removing liquidity will return your tokens proportionally based
                on the current pool ratio. You may receive different amounts
                than you initially deposited.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveLiquidityPage;
