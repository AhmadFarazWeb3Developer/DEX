import { useAppKitNetwork } from "@reown/appkit/react";
import getProvider from "./helper/getProvider";
import abis from "./helper/abis";
import { Contract, N } from "ethers";

const useSinglePool = () => {
  const { chainId } = useAppKitNetwork();
  const singlePool = async (poolAddress: string) => {
    if (!chainId) return;

    const numericChainId =
      typeof chainId === "string" ? parseInt(chainId) : chainId;
    const provider = await getProvider(numericChainId);

    const instance = new Contract(poolAddress, abis.UniswapV2PairAbi, provider);

    const reserves: [string, string] = await instance.getReserves();
    if (!reserves) return ["0", "0"];
    return { reserves };
  };

  return { singlePool };
};
export default useSinglePool;
