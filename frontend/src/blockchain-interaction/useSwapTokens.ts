import { Contract, parseUnits } from "ethers";
import addressToAbiMap from "./helper/addressToAbiMap";
import { decodeError } from "./helper/decodeError";
import useWriteInstances from "./helper/useWriteInstances";
import useSigner from "./helper/useSiger";
import { useState } from "react";

const useSwapTokens = () => {
  const { writeInstances } = useWriteInstances();
  const [isSwapping, setIsSwapping] = useState(false);
  const { getSigner } = useSigner();
  const swapTokens = async (
    amountIn: string,
    amountOutMin: string,
    path: string[],
    to: string
  ) => {
    try {
      setIsSwapping(true);
      const instance = await writeInstances();
      if (!instance) return;
      const { uniswapV2Router02MockInstance } = instance;

      const result = await getSigner();
      if (!result) return;

      const tokenA_Abi = addressToAbiMap[path[0]];

      const tokenA = new Contract(path[0], tokenA_Abi, result.signer);

      await tokenA.approve(
        uniswapV2Router02MockInstance.target,
        parseUnits(amountIn)
      );

      const tx = await uniswapV2Router02MockInstance.swapExactTokensForTokens(
        parseUnits(amountIn),
        parseUnits(amountOutMin),
        path,
        to,
        0
      );

      const receipt = await tx.wait();
      console.log(receipt);
    } catch (error) {
      decodeError(error);
      setIsSwapping(false);
    } finally {
      setIsSwapping(false);
    }
  };
  return { swapTokens, isSwapping };
};

export default useSwapTokens;
