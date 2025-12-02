import React, { useEffect, useState } from "react";
import { ChevronDown, SquaresExclude } from "lucide-react";

const Navbar = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [optValue, setOptValue] = useState("");
  useEffect(() => {
    setIsDropdown(true);
  }, [isDropdown]);

  return (
    <div className=" flex flex-row justify-between items-center w-full py-2  sm:py-3">
      <div className=" flex flex-row items-center gap-5  sm:gap-10">
        <div className="font-semibold  sm:text-lg text-white">
          <SquaresExclude size={20} />
        </div>

        <div className="flex flex-row items-center gap-2 text-white text-xs sm:text-lg">
          <div>
            <div
              onClick={() => setIsDropdown(true)}
              className=" flex flex-row items-center gap-1 "
            >
              <label value="">Pool</label>
              <ChevronDown size={18} />
            </div>
            {isDropdown && (
              <select defaultValue="" className=" bg-black">
                <option value="explore">Explore</option>
                <option value="create">Create</option>
              </select>
            )}
          </div>
          <div>
            <p>Add Liquidity</p>
          </div>
        </div>
      </div>
      <button className="bg-[#00C084] text-[#E6E6E6]   cursor-pointer text-sm font-semibold rounded-sm py-1 px-4 sm:px-6 sm:text-lg ">
        Connect
        <span className="hidden sm:inline"> Wallet </span>
      </button>
    </div>
  );
};

export default Navbar;
