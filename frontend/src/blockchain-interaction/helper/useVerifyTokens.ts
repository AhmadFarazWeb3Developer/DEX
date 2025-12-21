import { getAddressToAbiMap } from "./addressToAbiMap";
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

    console.log(tokenAddress);

    const abiMap = getAddressToAbiMap(numericChainId);
    console.log(abiMap);
    const abi = abiMap[tokenAddress];

    if (!abi) {
      toast.error("Token does not exist on this network", {
        action: { label: "Close", onClick: () => {} },
      });
      return;
    }

    const instance = new Contract(tokenAddress, abi, provider);

    const tokenName = await instance.symbol();

    return { tokenName };
  };

  return { verifyTokens };
};

export default useVerifyTokens;
