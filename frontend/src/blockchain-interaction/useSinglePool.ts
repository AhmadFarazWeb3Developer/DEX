import { useAppKitNetwork } from "@reown/appkit/react";
import getProvider from "./helper/getProvider";
import abis from "./helper/abis";
import { Contract, formatEther } from "ethers";
import useReadInstances from "./helper/useReadInstances";

const useSinglePool = () => {
  const { chainId } = useAppKitNetwork();
  const { readInstances } = useReadInstances();

  const singlePool = async (poolAddress: string) => {
    if (!chainId) return { reserves: ["0", "0"], lpTokens: "0" };

    const numericChainId =
      typeof chainId === "string" ? parseInt(chainId) : chainId;
    const provider = await getProvider(numericChainId);

    const instance = await readInstances();
    if (!instance) return { reserves: ["0", "0"], lpTokens: "0" };

    const uniswapV2PairInstance = new Contract(
      poolAddress,
      abis.UniswapV2PairAbi,
      provider
    );

    const reserves = await uniswapV2PairInstance.getReserves();
    const rawLPtokens = await uniswapV2PairInstance.totalSupply();
    const lpTokens = formatEther(rawLPtokens);

    return { reserves, lpTokens };
  };

  return { singlePool };
};

export default useSinglePool;
