import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import {
  ArrowLeftRight,
  Users,
  BarChart2,
  Layers,
  ChevronDown,
} from "lucide-react";
import SelectToken from "../components/cards/SelectToken";
import { TokenType } from "../types/TokenType";

const HomePage = () => {
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [isReceiveOpen, setIsReceiveOpen] = useState(false);

  const payRef = useRef<HTMLDivElement>(null);
  const receiveRef = useRef<HTMLDivElement>(null);

  const [token, setToken] = useState<TokenType[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;

      if (
        payRef.current &&
        target instanceof Node &&
        !payRef.current.contains(target)
      ) {
        setIsPayOpen(false);
      }

      if (
        receiveRef.current &&
        target instanceof Node &&
        !receiveRef.current.contains(target)
      ) {
        setIsReceiveOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <Navbar />

      <div className=" flex flex-col w-full">
        <div className="flex flex-col h-screen items-center justify-center">
          <div className="bg-[#12291a]  border-[#1f3528] rounded-lg p-5 w-2/4  shadow-xl">
            <div className="bg-[#0B1E13] border border-[#1f3528] rounded-lg p-4 mb-3">
              <p className="text-gray-300 text-sm">You Pay</p>
              <div className="flex justify-between items-center mt-2">
                <input
                  placeholder="0.0"
                  className="bg-transparent text-white text-xl outline-none"
                />
                <div
                  ref={payRef}
                  onClick={() => setIsPayOpen(!isPayOpen)}
                  className=" relative cursor-pointer flex flex-row items-center justify-center bg-[#00C084] rounded-full py-2 px-3 "
                >
                  <button className=" cursor-pointer text-[#E6E6E6]  text-sm font-semibold">
                    Select Token
                  </button>
                  <ChevronDown className=" text-white" />
                </div>

                {isPayOpen && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-12 z-50 w-1/3">
                    <SelectToken setToken={setToken} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center my-2">
              <ArrowLeftRight className="text-gray-400  rotate-90" />
            </div>

            <div className="bg-[#0B1E13] border border-[#1f3528] rounded-lg p-4 mb-4">
              <p className="text-gray-300 text-sm">You Receive</p>
              <div className="flex justify-between items-center mt-2">
                <input
                  placeholder="0.0"
                  className="bg-transparent text-white text-xl outline-none"
                />

                <div
                  ref={receiveRef}
                  onClick={() => setIsReceiveOpen(!isReceiveOpen)}
                  className="cursor-pointer flex flex-row items-center justify-center bg-[#00C084] rounded-full py-2 px-3"
                >
                  <button className="cursor-pointer text-[#E6E6E6]  text-sm font-semibold">
                    Select Token
                  </button>
                  <ChevronDown className=" text-white" />
                </div>
              </div>
              {isReceiveOpen && (
                <div className=" absolute top-0 left-1/2 transform -translate-x-1/2 mt-12 z-50 w-1/3">
                  <SelectToken setToken={setToken} />
                </div>
              )}
            </div>

            <button className=" cursor-pointer bg-[#00C084] text-[#E6E6E6] w-full py-2 rounded-sm font-semibold text-lg">
              Swap
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 ">
          <div className="w-full lg:w-1/2 flex items-start">
            <h2 className="text-white text-2xl lg:text-3xl font-chypre leading-snug">
              Swap, Create and Explore Pools, Add Liquidity and Remove Liquidity
              from Pools
            </h2>
          </div>

          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6">
            <div className="bg-[#12291a] border border-[#1f3528] rounded-lg p-6 shadow-xl flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Layers className="text-white" />
                <p className="text-gray-300 text-sm">Total Pairs</p>
              </div>
              <p className="text-white text-3xl font-bold">48</p>
            </div>

            <div className="bg-[#12291a] border border-[#1f3528] rounded-lg p-6 shadow-xl flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <BarChart2 className="text-white" />
                <p className="text-gray-300 text-sm">TVL</p>
              </div>
              <p className="text-white text-3xl font-bold">$1.94M</p>
            </div>

            <div className="bg-[#12291a] border border-[#1f3528] rounded-lg p-6 shadow-xl flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Users className="text-white" />
                <p className="text-gray-300 text-sm">Users</p>
              </div>
              <p className="text-white text-3xl font-bold">12,304</p>
            </div>

            <div className="bg-[#12291a] border border-[#1f3528] rounded-lg p-6 shadow-xl flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <BarChart2 className="text-white" />
                <p className="text-gray-300 text-sm">Revenue</p>
              </div>
              <p className="text-white text-3xl font-bold">$84,200</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
