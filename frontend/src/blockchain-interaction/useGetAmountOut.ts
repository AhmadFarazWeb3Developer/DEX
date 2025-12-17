import abis from "./helper/abis";
import { Contract, formatUnits, parseUnits } from "ethers";
import useReadInstances from "./helper/useReadInstances";
import getProvider from "./helper/getProvider";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useState } from "react";
import { decodeError } from "./helper/decodeError";

const useGetAmountOut = () => {
  const { chainId } = useAppKitNetwork();
  const { readInstances } = useReadInstances();
  const [gettingAmountOutMax, setGettingAmountOutMax] = useState(false);

  const getAmountOut = async (
    tokenA: string,
    tokenB: string,
    amountIn: string,
    decimalsIn = 18,
    decimalsOut = 18
  ) => {
    try {
      setGettingAmountOutMax(true);

      const instance = await readInstances();
      if (!instance || !chainId) return "0";

      const { uniswapV2FactoryInstance } = instance;

      const poolAddress = await uniswapV2FactoryInstance.getPair(
        tokenA,
        tokenB
      );

      if (poolAddress === "0x0000000000000000000000000000000000000000") {
        return "0";
      }

      const numericChainId =
        typeof chainId === "string" ? parseInt(chainId) : chainId;
      const provider = await getProvider(numericChainId);

      const pair = new Contract(poolAddress, abis.UniswapV2PairAbi, provider);

      const [reserve0, reserve1] = await pair.getReserves();
      const token0 = await pair.token0();

      let reserveIn: bigint;
      let reserveOut: bigint;

      if (tokenA.toLowerCase() === token0.toLowerCase()) {
        reserveIn = reserve0;
        reserveOut = reserve1;
      } else {
        reserveIn = reserve1;
        reserveOut = reserve0;
      }

      const amountInParsed = parseUnits(amountIn, decimalsIn);

      const amountOut = getAmountOutLocal(
        amountInParsed,
        reserveIn,
        reserveOut
      );

      return formatUnits(amountOut, decimalsOut);
    } catch (error) {
      console.log(error);
      decodeError(error);
      return "0";
    } finally {
      setGettingAmountOutMax(false);
    }
  };

  // AMM formula (frontend)

  const getAmountOutLocal = (
    amountIn: bigint,
    reserveIn: bigint,
    reserveOut: bigint
  ): bigint => {
    if (amountIn === 0n) return 0n;
    if (reserveIn === 0n || reserveOut === 0n) return 0n;

    const amountInWithFee = amountIn * 997n;
    const numerator = amountInWithFee * reserveOut;
    const denominator = reserveIn * 1000n + amountInWithFee;

    return numerator / denominator;
  };

  return { getAmountOut, gettingAmountOutMax };
};

export default useGetAmountOut;
