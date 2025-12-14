import React, { useEffect, useState } from "react";
import useCreatePair from "../blockchain-interaction/useCreatePair";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import useVerifyTokens from "../blockchain-interaction/helper/useVerifyTokens";
import { TOKEN_ICONS } from "../constants/tokenIcons";
import Navbar from "../components/Navbar";

const CreatePoolPage = () => {
  const [tokenAAddress, setTokenAAddress] = useState("");
  const [tokenBAddress, setTokenBAddress] = useState("");
  const [tokenASymbol, setTokenASymbol] = useState("");
  const [tokenBSymbol, setTokenBSymbol] = useState("");

  const [tokenIcon, setTokenIcon] = useState({
    tokenAIcon: "",
    tokenBIcon: "",
  });

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

    const bool = await createPair(
      tokenAAddress,
      tokenBAddress,
      tokenASymbol,
      tokenBSymbol
    );
    if (bool === true) setTokenAAddress("");
    if (bool === true) setTokenBAddress("");
  };

  useEffect(() => {
    const verify = async () => {
      if (!isValidAddress(tokenAAddress)) {
        setTokenIcon((prev) => ({ ...prev, tokenAIcon: "" }));
        return;
      }

      const result = await verifyTokens(tokenAAddress);
      if (!result) return;

      const tokenName = result?.tokenName.toLowerCase();

      const icon = TOKEN_ICONS[tokenName];

      setTokenIcon((prev) => ({ ...prev, tokenAIcon: icon }));
      setTokenASymbol(tokenName);
    };

    verify();
  }, [tokenAAddress]);

  useEffect(() => {
    const verify = async () => {
      if (!isValidAddress(tokenBAddress)) {
        setTokenIcon((prev) => ({ ...prev, tokenBIcon: "" }));
        return;
      }

      const result = await verifyTokens(tokenBAddress);
      if (!result) return;

      const tokenName = result?.tokenName.toLowerCase();

      const icon = TOKEN_ICONS[tokenName];

      setTokenIcon((prev) => ({ ...prev, tokenBIcon: icon }));
      setTokenBSymbol(tokenName);
    };

    verify();
  }, [tokenBAddress]);

  return (
    <div className=" w-full">
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center  bg-gradient-to-br from-[#0a1f14] via-[#0d1a12] to-[#08150e] p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00C084] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00C084] opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-md">
          <div className="relative bg-gradient-to-b from-[#12291a] to-[#0f231a] rounded-2xl p-8 shadow-2xl border border-[#1a3d28]/50 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#00C084]/5 to-transparent pointer-events-none"></div>

            <div className="relative z-10">
              <div className="mb-8">
                <h2 className="text-white text-3xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Create a Pool
                </h2>
                <p className="text-gray-400 text-sm">
                  Deploy a new liquidity pool
                </p>
              </div>

              <div className="mb-5">
                <label className="text-gray-400 text-sm font-medium mb-2 block">
                  Token A Address
                </label>
                <div className="relative group">
                  <input
                    placeholder="0x..."
                    value={tokenAAddress}
                    onChange={(e) => setTokenAAddress(e.target.value)}
                    className="w-full bg-[#0a1e13] rounded-xl p-4 pr-16 text-white text-base outline-none border border-[#1a3d28] focus:border-[#00C084]/50 hover:border-[#00C084]/30 transition-all placeholder:text-gray-600"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {tokenIcon.tokenAIcon ? (
                      <img
                        src={tokenIcon.tokenAIcon}
                        className="w-9 h-9 rounded-full border-2 border-[#1a3d28] shadow-lg"
                        alt="tokenA"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-[#1a3d28]" />
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <label className="text-gray-400 text-sm font-medium mb-2 block">
                  Token B Address
                </label>
                <div className="relative group">
                  <input
                    placeholder="0x..."
                    value={tokenBAddress}
                    onChange={(e) => setTokenBAddress(e.target.value)}
                    className="w-full bg-[#0a1e13] rounded-xl p-4 pr-16 text-white text-base outline-none border border-[#1a3d28] focus:border-[#00C084]/50 hover:border-[#00C084]/30 transition-all placeholder:text-gray-600"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {tokenIcon.tokenBIcon ? (
                      <img
                        src={tokenIcon.tokenBIcon}
                        className="w-9 h-9 rounded-full border-2 border-[#1a3d28] shadow-lg"
                        alt="tokenB"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-[#1a3d28]" />
                    )}
                  </div>
                </div>
              </div>

              {!isCreatingPair ? (
                <button
                  onClick={handleCreatePool}
                  disabled={isCreatingPair}
                  className="w-full bg-gradient-to-r from-[#00C084] to-[#00d494] text-white py-4 rounded-xl font-semibold text-lg hover:from-[#00d494] hover:to-[#00e8a8] transition-all shadow-lg shadow-[#00C084]/20 hover:shadow-[#00C084]/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  Create Pool
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gradient-to-r from-[#00C084] to-[#00d494] text-white py-4 rounded-xl font-semibold text-lg flex justify-center items-center gap-3 cursor-not-allowed opacity-80"
                >
                  <Loader2 className="animate-spin h-5 w-5" />
                  Creating...
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePoolPage;
