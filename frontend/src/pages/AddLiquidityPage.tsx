import { useState } from "react";
import SelectToken from "../components/cards/SelectToken";
import TokenButton from "../components/cards/TokenButton";
import { TokenType } from "../types/TokenType";
import useAddLiquidity from "../blockchain-interaction/useAddLiquidity";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";

const AddLiquidityPage = () => {
  const [amountADesired, setAmountADesired] = useState("");
  const [amountBDesired, setAmountBDesired] = useState("");

  const [tokenA, setTokenA] = useState<TokenType | null>(null);
  const [tokenB, setTokenB] = useState<TokenType | null>(null);

  const [isTokenASelected, setIsTokenASelected] = useState(false);
  const [isTokenBSelected, setIsTokenBSelected] = useState(false);

  const { address, isConnected } = useAppKitAccount();
  const { addLiquidity, isAddingLiquidity } = useAddLiquidity();

  const handleAddLiquidity = async () => {
    if (!address || !isConnected) {
      toast.error("Please connected wallet!", {
        action: { label: "Close", onClick: () => {} },
      });
      return;
    }

    if (!tokenA?.address || !tokenB?.address) {
      toast.error("Missing token!", {
        action: { label: "Close", onClick: () => {} },
      });
      return;
    }
    await addLiquidity(
      tokenA.address,
      tokenB.address,
      amountADesired,
      amountBDesired,
      address
    );
  };

  return (
    <>
      <div className="w-full">
        <Navbar />
        <div className="min-h-screen bg-[#0b1e13] p-6 flex justify-center items-start">
          <div className="w-1/2 bg-[#12291a] rounded-2xl p-6 shadow-xl">
            <h1 className="text-3xl font-bold text-white mb-6">
              Add Liquidity
            </h1>
            <p className="text-slate-400 text-sm mb-6">
              Provide liquidity to your favorite pools and earn fees
            </p>

            <p className="text-gray-300 text-sm mb-1">Token A</p>
            <div className="bg-[#0B1E13] border border-[#1f3528] rounded-lg p-4 mb-4 relative">
              <div className="flex justify-between items-center">
                <input
                  value={amountADesired}
                  onChange={(e) => setAmountADesired(e.target.value)}
                  placeholder="0.0"
                  className="bg-transparent text-white text-xl outline-none w-1/2"
                />

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

            <p className="text-gray-300 text-sm mb-1">Token B</p>
            <div className="bg-[#0B1E13] border border-[#1f3528] rounded-lg p-4 mb-4 relative">
              <div className="flex justify-between items-center">
                <input
                  value={amountBDesired}
                  onChange={(e) => setAmountBDesired(e.target.value)}
                  placeholder="0.0"
                  className="bg-transparent text-white text-xl outline-none w-1/2"
                />

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

            <button
              onClick={handleAddLiquidity}
              disabled={
                !tokenA ||
                !tokenB ||
                !amountADesired ||
                !amountBDesired ||
                isAddingLiquidity
              }
              className={`w-full py-3 text-white font-semibold rounded-lg transition cursor-pointer ${
                isAddingLiquidity
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#00C084] hover:bg-[#00b178]"
              }`}
            >
              {isAddingLiquidity ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  Adding Liquidity
                </div>
              ) : (
                "Add Liquidity"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLiquidityPage;
