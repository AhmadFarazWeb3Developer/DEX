import React, { useState } from "react";
import { ChevronDown, SquaresExclude } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openPool, setOpenPool] = useState(false);
  const [openLiq, setOpenLiq] = useState(false);

  const [poolValue, setPoolValue] = useState("");
  const [liqValue, setLiqValue] = useState("");

  const navigate = useNavigate();

  const handlePoolSelect = (value) => {
    setPoolValue(value);
    setOpenPool(false);
  };

  const handleLiqSelect = (value) => {
    setLiqValue(value);
    setOpenLiq(false);
  };

  return (
    <div className="flex flex-row justify-between items-center w-full py-2 sm:py-3">
      <div className="flex flex-row items-center gap-5 sm:gap-10">
        <div className="font-semibold sm:text-lg text-white sm:hidden">
          <SquaresExclude size={24} />
        </div>
        <div className="font-semibold sm:text-lg text-white hidden sm:block">
          <SquaresExclude size={30} />
        </div>

        <div className="relative flex flex-row items-center font-semibold gap-4 text-xs sm:text-lg">
          <div
            onClick={() => {
              setOpenPool(!openPool);
              setOpenLiq(false);
            }}
            className={`flex items-center gap-1 cursor-pointer select-none ${
              openPool ? "text-white" : "text-gray-400"
            }`}
          >
            <label className="cursor-pointer text-sm sm:text-lg">Pool</label>
            <ChevronDown
              size={14}
              strokeWidth={3}
              className={`transition-transform sm:hidden duration-300 ${
                openPool ? "rotate-180" : ""
              }`}
            />

            <ChevronDown
              size={18}
              strokeWidth={3}
              className={`transition-transform hidden sm:block duration-300 ${
                openPool ? "rotate-180" : ""
              }`}
            />
          </div>

          <div
            className={`absolute top-6 left-0 mt-2 w-40
              bg-[#0B1E13]
              border border-[#1f3528]
              rounded-md shadow-xl
              text-gray-300 backdrop-blur-sm
              overflow-hidden transition-all duration-300
               text-sm sm:text-lg
              ${openPool ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div
              onClick={() => {
                handlePoolSelect("explore");
                navigate("explore-pools");
              }}
              className="px-4 py-2 hover:bg-[#12291a]  transition-colors duration-200 cursor-pointer"
            >
              Explore
            </div>
            <div className="h-px bg-[#2b4635]" />
            <div
              onClick={() => {
                handlePoolSelect("create");
                navigate("create-pool");
              }}
              className="px-4 py-2 hover:bg-[#12291a]  transition-colors duration-200 cursor-pointer"
            >
              Create
            </div>
          </div>

          <div
            onClick={() => {
              setOpenLiq(!openLiq);
              setOpenPool(false);
            }}
            className={`flex items-center gap-1 cursor-pointer select-none ${
              openLiq ? "text-white" : "text-gray-400"
            }`}
          >
            <label className="cursor-pointer text-sm sm:text-lg">
              Liquidity
            </label>
            <ChevronDown
              size={14}
              strokeWidth={3}
              className={`transition-transform duration-300 sm:hidden ${
                openLiq ? "rotate-180" : ""
              }`}
            />
            <ChevronDown
              size={18}
              strokeWidth={3}
              className={`transition-transform duration-300 hidden sm:block ${
                openLiq ? "rotate-180" : ""
              }`}
            />
          </div>

          <div
            className={`absolute top-6 left-19 mt-2 w-48
              bg-[#0B1E13]
              border border-[#1f3528]
              rounded-md shadow-xl
              text-gray-300 backdrop-blur-sm
              overflow-hidden transition-all duration-300 text-sm sm:text-lg
              ${openLiq ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div
              onClick={() => handleLiqSelect("add")}
              className="px-4 py-2 hover:bg-[#12291a] sm:text-lg transition-colors duration-200 cursor-pointer"
            >
              Add Liquidity
            </div>
            <div className="h-px bg-[#2b4635]" />
            <div
              onClick={() => handleLiqSelect("remove")}
              className="px-4 py-2  hover:bg-[#12291a] sm:text-lg transition-colors duration-200 cursor-pointer"
            >
              Remove Liquidity
            </div>
          </div>
        </div>
      </div>

      <button className="bg-[#00C084] text-[#E6E6E6] cursor-pointer text-sm font-semibold rounded-sm py-1 px-4 sm:px-6 sm:text-lg">
        Connect
        <span className="hidden sm:inline"> Wallet </span>
      </button>
    </div>
  );
};

export default Navbar;
