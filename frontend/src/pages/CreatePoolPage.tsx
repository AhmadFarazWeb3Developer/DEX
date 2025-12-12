import React, { useEffect, useState } from "react";
import useCreatePair from "../blockchain-interaction/useCreatePair";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import useVerifyTokens from "../blockchain-interaction/helper/useVerifyTokens";

const CreatePoolPage = () => {
  const [tokenAAddress, setTokenAAddress] = useState("");
  const [tokenBAddress, setTokenBAddress] = useState("");

  const { createPair, isCreatingPair } = useCreatePair();
  const { verifyTokens } = useVerifyTokens();

  const isValidAddress = (address: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(address);

  const handleCreatePool = async () => {
    if (!isValidAddress(tokenAAddress) || !isValidAddress(tokenBAddress)) {
      toast.error("Must fill both addresses", {
        action: { label: "Close", onClick: () => {} },
      });
      return;
    }

    const bool = await createPair(tokenAAddress, tokenBAddress);
    if (bool === true) setTokenAAddress("");
    if (bool === true) setTokenBAddress("");
  };

  useEffect(() => {
    const verify = async () => {
      const addresses = [
        "0x5fbdb2315678afecb367f032d93f642f64180aa3",
        "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512",
      ];

      await verifyTokens(addresses);
    };

    verify();
  }, []);
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

        {!isCreatingPair ? (
          <button
            onClick={handleCreatePool}
            disabled={isCreatingPair}
            className="w-full bg-[#00C084] text-[#E6E6E6] py-3 rounded-lg font-semibold text-lg hover:bg-[#00d494] transition-colors"
          >
            Create Pool
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-[#00C084] text-[#E6E6E6] py-3 rounded-lg font-semibold text-lg flex justify-center items-center gap-2 cursor-not-allowed"
          >
            <Loader2 className="animate-spin h-5 w-5" />
            Creating...
          </button>
        )}
      </div>
    </div>
  );
};

export default CreatePoolPage;
