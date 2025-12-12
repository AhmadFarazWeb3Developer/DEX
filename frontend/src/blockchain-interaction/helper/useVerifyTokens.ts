import addressToAbiMap from "./addressToAbiMap";
import { useAppKitNetwork } from "@reown/appkit/react";
import getProvider from "./getProvider";
import { Contract } from "ethers";
import { toast } from "sonner";

const useVerifyTokens = () => {
  const { chainId } = useAppKitNetwork();

  const verifyTokens = async (tokenAddress: string) => {
    if (!chainId) return;
    const numericChainId =
      typeof chainId === "string" ? parseInt(chainId) : chainId;

    const provider = await getProvider(numericChainId);

    const abi = addressToAbiMap[tokenAddress];

    if (!abi) toast.error("Token Does not Exists");
    const instance = new Contract(tokenAddress, abi, provider);
    const tokenName: string = await instance.symbol();

    return { tokenName };
  };

  return { verifyTokens };
};
export default useVerifyTokens;
