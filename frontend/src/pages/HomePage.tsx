import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import {
  ArrowLeftRight,
  Users,
  BarChart2,
  Layers,
  ChevronDown,
  Loader2,
} from "lucide-react";
import SelectToken from "../components/cards/SelectToken";
import { TokenType } from "../types/TokenType";
import useSwapTokens from "../blockchain-interaction/useSwapTokens";
import { useAppKitAccount } from "@reown/appkit/react";
import { toast } from "sonner";
import TokenButton from "../components/cards/TokenButton";

const HomePage = () => {
  const { address, isConnected } = useAppKitAccount();

  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);

  const payRef = useRef<HTMLDivElement>(null);
  const receiveRef = useRef<HTMLDivElement>(null);

  const [tokenA, setTokenA] = useState<TokenType | null>(null);
  const [tokenB, setTokenB] = useState<TokenType | null>(null);

  const [amountIn, setAmountIn] = useState("");
  const [amountOutMin, setAmountOutMin] = useState("");

  const { swapTokens, isSwapping } = useSwapTokens();

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const target = event.target;

  //     if (
  //       payRef.current &&
  //       target instanceof Node &&
  //       !payRef.current.contains(target)
  //     ) {
  //       setIsPayOpen(false);
  //     }

  //     if (
  //       receiveRef.current &&
  //       target instanceof Node &&
  //       !receiveRef.current.contains(target)
  //     ) {
  //       setIsReceiveOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleSwapTokens = async () => {
    if (!address || !isConnected) {
      toast.warning("Please connect wallet!");

      return;
    }

    if (!tokenA || !tokenB) {
      toast.warning("Select both tokens");
      return;
    }

    await swapTokens(
      amountIn,
      amountOutMin,
      [tokenA?.address, tokenB?.address],
      address
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#0b1e13]">
      <Navbar />

      <div className="flex flex-col w-full px-6 py-10 gap-12">
        <div className="flex flex-col items-center">
          <div className="bg-[#12291a] border border-[#1f3528] rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="bg-[#0B1E13] border border-[#1f3528] rounded-lg p-4 mb-4">
              <p className="text-gray-300 text-sm mb-2">You Pay</p>
              <div className="relative w-full">
                <div className="flex justify-between items-center bg-[#0B1E13] border border-[#1f3528] rounded-lg p-4">
                  <input
                    value={amountIn}
                    onChange={(e) => setAmountIn(e.target.value)}
                    placeholder="0.0"
                    className="bg-transparent text-white text-xl outline-none w-2/3"
                  />
                  <TokenButton
                    token={tokenA}
                    onClick={() => setIsPayOpen((p) => !p)}
                  />
                </div>
                {isPayOpen && (
                  <div className="absolute top-full left-0 mt-2 z-50 w-full rounded-lg overflow-hidden shadow-lg">
                    <SelectToken
                      setToken={(token) => {
                        setTokenA(token);
                        setIsPayOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center my-3">
              <ArrowLeftRight className="text-gray-400 rotate-90" />
            </div>

            <div className="bg-[#0B1E13] border border-[#1f3528] rounded-lg p-4 mb-6">
              <p className="text-gray-300 text-sm mb-2">You Receive</p>
              <div className="relative w-full">
                <div className="flex justify-between items-center bg-[#0B1E13] border border-[#1f3528] rounded-lg p-4">
                  <input
                    value={amountOutMin}
                    onChange={(e) => setAmountOutMin(e.target.value)}
                    placeholder="0.0"
                    className="bg-transparent text-white text-xl outline-none w-2/3"
                  />
                  <TokenButton
                    token={tokenB}
                    onClick={() => setIsReceiveOpen((p) => !p)}
                  />
                </div>
                {isReceiveOpen && (
                  <div className="absolute top-full left-0 mt-2 z-50 w-full rounded-lg overflow-hidden shadow-lg">
                    <SelectToken
                      setToken={(token) => {
                        setTokenB(token);
                        setIsReceiveOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleSwapTokens}
              disabled={isSwapping}
              className={`w-full py-3 text-white font-semibold rounded-lg transition cursor-pointer ${
                isSwapping
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#00C084] hover:bg-[#00b178]"
              }`}
            >
              {isSwapping ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin h-5 w-5" />
                  Swapping...
                </div>
              ) : (
                "Swap"
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
          <div className="w-full lg:w-1/2 flex items-start">
            <h2 className="text-white text-2xl lg:text-3xl font-chypre leading-snug">
              Swap, Create and Explore Pools, Add Liquidity and Remove Liquidity
              from Pools
            </h2>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6">
            {[
              { icon: Layers, label: "Total Pairs", value: "48" },
              { icon: BarChart2, label: "TVL", value: "$1.94M" },
              { icon: Users, label: "Users", value: "12,304" },
              { icon: BarChart2, label: "Revenue", value: "$84,200" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#12291a] border border-[#1f3528] rounded-xl p-6 shadow-lg flex flex-col gap-3 hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="text-white" />
                  <p className="text-gray-300 text-sm">{item.label}</p>
                </div>
                <p className="text-white text-3xl font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
