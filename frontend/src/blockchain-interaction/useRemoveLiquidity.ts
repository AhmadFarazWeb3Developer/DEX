import { useState } from "react";
import useWriteInstances from "./helper/useWriteInstances";
import { decodeError } from "./helper/decodeError";

const useRemoveLiquidity = () => {
  const { writeInstances } = useWriteInstances();
  const [isRemovingLiquidity, setIsRemovingLiquidity] = useState(false);

  const removeLiquidity = async (
    tokenA: string,
    tokenB: string,
    liquidity: string,
    to: string
  ) => {
    try {
      setIsRemovingLiquidity(true);
      const instances = await writeInstances();
      if (!instances) return;

      const { uniswapV2Router02MockInstance } = instances;

      const tx = await uniswapV2Router02MockInstance.removeLiquidity(
        tokenA,
        tokenB,
        liquidity,
        0, // amountAMin
        0, // amountBMin
        to,
        0 // deadline
      );

      const receipt = await tx.wait();
      console.log(receipt);
    } catch (err) {
      decodeError(err);
    } finally {
      setIsRemovingLiquidity(false);
    }
  };

  return { removeLiquidity, isRemovingLiquidity };
};

export default useRemoveLiquidity;
