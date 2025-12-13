import { useAppKitNetwork } from "@reown/appkit/react";
import getProvider from "./helper/getProvider";
import abis from "./helper/abis";
import { Contract } from "ethers";

const useSinglePool = () => {
  const { chainId } = useAppKitNetwork();
  const singlePool = async (poolAddress: string) => {
    if (!chainId) return;

    const numericChainId =
      typeof chainId === "string" ? parseInt(chainId) : chainId;
    const provider = await getProvider(numericChainId);

    const instance = new Contract(poolAddress, abis.UniswapV2PairAbi, provider);

    const reserves = await instance.getReserves();

    return { reserves };
  };

  return { singlePool };
};
export default useSinglePool;
