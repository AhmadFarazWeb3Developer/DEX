import addresses from "./addresses";
import abis from "./abis";
import addressToAbiMap from "./addressToAbiMap";
import { useAppKitNetwork } from "@reown/appkit/react";
import getProvider from "./getProvider";
import { Contract } from "ethers";
import { toast } from "sonner";
import { useState } from "react";

const useVerifyTokens = () => {
  const { chainId } = useAppKitNetwork();
  const [tokenName, setTokenName] = useState("");
  const verifyTokens = async (tokenAddress: string) => {
    const numericChainId =
      typeof chainId === "string" ? parseInt(chainId) : chainId;

    const provider = await getProvider(numericChainId);

    const abi = addressToAbiMap[tokenAddress];

    if (!abi) toast.error("Token Does not Exists");
    const instance = new Contract(tokenAddress, abi, provider);
    setTokenName(await instance.symbol());
  };

  return { verifyTokens, tokenName };
};
export default useVerifyTokens;
