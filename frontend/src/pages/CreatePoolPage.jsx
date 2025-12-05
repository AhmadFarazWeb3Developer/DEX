import React, { useState } from "react";
import SelectToken from "../components/cards/SelectToken";
import { ChevronDown } from "lucide-react";

const CreatePoolPage = () => {
  const [isTokenAOpen, setIsTokenAOpen] = useState(false);
  const [isTokenBOpen, setIsTokenBOpen] = useState(false);
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");

  return (
    <div className="w-full max-w-md mx-auto bg-[#12291a] rounded-lg p-6 shadow-xl h-screen">
      <h2 className="text-white text-2xl font-bold mb-6">Create a Pool</h2>

      <div className="relative mb-4">
        <p className="text-gray-300 text-sm mb-1">Token A</p>
        <div className="flex justify-between items-center bg-[#0B1E13] rounded-lg p-3">
          <input
            type="number"
            placeholder="0.0"
            value={amountA}
            onChange={(e) => setAmountA(e.target.value)}
            className="bg-transparent text-white text-lg outline-none w-full"
          />
          <div
            onClick={() => setIsTokenAOpen(!isTokenAOpen)}
            className="flex items-center cursor-pointer bg-[#00C084] rounded-full py-1 px-3 ml-2"
          >
            <span className="text-[#E6E6E6] text-sm font-semibold">
              Select Token
            </span>
            <ChevronDown className="text-white ml-1" />
          </div>

          {isTokenAOpen && (
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 z-50 w-80">
              <SelectToken />
            </div>
          )}
        </div>
      </div>

      <div className="relative mb-4">
        <p className="text-gray-300 text-sm mb-1">Token B</p>
        <div className="flex justify-between items-center bg-[#0B1E13] rounded-lg p-3">
          <input
            type="number"
            placeholder="0.0"
            value={amountB}
            onChange={(e) => setAmountB(e.target.value)}
            className="bg-transparent text-white text-lg outline-none w-full"
          />
          <div
            onClick={() => setIsTokenBOpen(!isTokenBOpen)}
            className="flex items-center cursor-pointer bg-[#00C084] rounded-full py-1 px-3 ml-2"
          >
            <span className="text-[#E6E6E6] text-sm font-semibold">
              Select Token
            </span>
            <ChevronDown className="text-white ml-1" />
          </div>

          {isTokenBOpen && (
            <div className="absolute top-14 left-1/2 transform -translate-x-1/2 z-50 w-80">
              <SelectToken />
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-300 text-sm mb-1">Fee (%)</p>
        <input
          type="number"
          placeholder="0.3"
          className="w-full bg-[#0B1E13] rounded-lg p-3 text-white text-lg outline-none"
        />
      </div>

      <button className="w-full bg-[#00C084] text-[#E6E6E6] py-3 rounded-lg font-semibold text-lg hover:bg-[#00d494] transition-colors">
        Create Pool
      </button>
    </div>
  );
};

export default CreatePoolPage;
