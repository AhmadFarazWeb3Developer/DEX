import { useState } from "react";
import { formatUnits } from "ethers";
import useReadInstances from "../helper/useReadInstances";

const useLpTokens = () => {
  const { readInstances } = useReadInstances();

  const [lpTokens, setLpTokens] = useState("0");

  const fetchLpTokens = async (
    tokenA?: string,
    tokenB?: string,
    user?: string
  ) => {
    if (!tokenA || !tokenB || !user) return;

    const instances = await readInstances();
    if (!instances) return;

    const { uniswapV2FactoryInstance, uniswapV2ERC20Instance } = instances;

    const pairAddress = await uniswapV2FactoryInstance.getPair(tokenA, tokenB);

    if (pairAddress === "0x0000000000000000000000000000000000000000") {
      setLpTokens("0");

      return;
    }

    const balance: bigint = await (
      uniswapV2ERC20Instance.attach(pairAddress) as any
    ).balanceOf(user);

    setLpTokens(formatUnits(balance, 18));
  };

  return { fetchLpTokens, lpTokens };
};

export default useLpTokens;
