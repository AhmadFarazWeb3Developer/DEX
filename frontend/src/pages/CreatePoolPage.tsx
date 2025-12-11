import React, { useState } from "react";
import useCreatePair from "../blockchain-interaction/useCreatePair";

const CreatePoolPage = () => {
  const [tokenAAddress, setTokenAAddress] = useState("");
  const [tokenBAddress, setTokenBAddress] = useState("");

  const { createPair } = useCreatePair();

  const isValidAddress = (address: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(address);

  const handleCreatePool = async () => {
    if (!isValidAddress(tokenAAddress) || !isValidAddress(tokenBAddress)) {
      alert("Please enter valid token addresses");
      return;
    }
    console.log("Creating pool with:", tokenAAddress, tokenBAddress);

    await createPair(tokenAAddress, tokenBAddress);
  };

  return (
    <div className=" h-screen w-full flex flex-row items-center justify-center">
      <div className="w-1/2 bg-[#12291a]  rounded-lg p-6 shadow-xl ">
        <h2 className="text-white text-2xl font-bold mb-6">Create a Pool</h2>

        <div className="mb-4">
          <p className="text-gray-300 text-sm mb-1">Token A Address</p>
          <input
            placeholder="0x..."
            value={tokenAAddress}
            onChange={(e) => setTokenAAddress(e.target.value)}
            className="w-full bg-[#0B1E13] rounded-lg p-3 text-white text-lg outline-none"
          />
        </div>

        <div className="mb-4">
          <p className="text-gray-300 text-sm mb-1">Token B Address</p>
          <input
            placeholder="0x..."
            value={tokenBAddress}
            onChange={(e) => setTokenBAddress(e.target.value)}
            className="w-full bg-[#0B1E13] rounded-lg p-3 text-white text-lg outline-none"
          />
        </div>

        <button
          onClick={handleCreatePool}
          className="w-full bg-[#00C084] text-[#E6E6E6] py-3 rounded-lg font-semibold text-lg hover:bg-[#00d494] transition-colors"
        >
          Create Pool
        </button>
      </div>
    </div>
  );
};

export default CreatePoolPage;
