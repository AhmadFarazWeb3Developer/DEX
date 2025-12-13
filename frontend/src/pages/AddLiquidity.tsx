import { useState } from "react";
import { TOKEN_ICONS } from "../constants/tokenIcons";
import { ChevronDown } from "lucide-react";

const AddLiquidityPage = () => {
  const [tokenA, setTokenA] = useState("");
  const [tokenB, setTokenB] = useState("");
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");

  return (
    <div className="min-h-screen bg-[#0b1e13] p-6 flex justify-center items-start">
      <div className="w-full max-w-md bg-[#12291a] rounded-2xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6">Add Liquidity</h1>
        <p className="text-slate-400 text-sm mb-6">
          Provide liquidity to your favorite pools and earn fees
        </p>

        <div className="mb-4">
          <p className="text-slate-400 text-xs mb-1">Token A</p>
          <div className="flex items-center gap-2 bg-[#0B1E13] rounded-lg p-3 border border-green-700/40">
            <div className="w-8 h-8 rounded-full bg-[#0b1e13] flex items-center justify-center overflow-hidden">
              {TOKEN_ICONS[tokenA.toLowerCase()] ? (
                <img
                  src={TOKEN_ICONS[tokenA.toLowerCase()]}
                  alt={tokenA}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-green-400">
                  {tokenA?.slice(0, 2) || "?"}
                </span>
              )}
            </div>
            <input
              type="text"
              placeholder="Token symbol (e.g., DAI)"
              value={tokenA}
              onChange={(e) => setTokenA(e.target.value)}
              className="flex-1 bg-transparent text-white text-lg outline-none"
            />
          </div>
          <input
            type="number"
            placeholder="Amount"
            value={amountA}
            onChange={(e) => setAmountA(e.target.value)}
            className="w-full mt-2 p-3 rounded-lg bg-[#0B1E13] text-white text-lg outline-none border border-green-700/30"
          />
        </div>

        <div className="mb-6">
          <p className="text-slate-400 text-xs mb-1">Token B</p>
          <div className="flex items-center gap-2 bg-[#0B1E13] rounded-lg p-3 border border-green-700/40">
            <div className="w-8 h-8 rounded-full bg-[#0b1e13] flex items-center justify-center overflow-hidden">
              {TOKEN_ICONS[tokenB.toLowerCase()] ? (
                <img
                  src={TOKEN_ICONS[tokenB.toLowerCase()]}
                  alt={tokenB}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-green-400">
                  {tokenB?.slice(0, 2) || "?"}
                </span>
              )}
            </div>
            <input
              type="text"
              placeholder="Token symbol (e.g., USDC)"
              value={tokenB}
              onChange={(e) => setTokenB(e.target.value)}
              className="flex-1 bg-transparent text-white text-lg outline-none"
            />
          </div>
          <input
            type="number"
            placeholder="Amount"
            value={amountB}
            onChange={(e) => setAmountB(e.target.value)}
            className="w-full mt-2 p-3 rounded-lg bg-[#0B1E13] text-white text-lg outline-none border border-green-700/30"
          />
        </div>

        <button
          disabled={!tokenA || !tokenB || !amountA || !amountB}
          className="w-full py-3 bg-green-700 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
        >
          Add Liquidity
        </button>
      </div>
    </div>
  );
};

export default AddLiquidityPage;
