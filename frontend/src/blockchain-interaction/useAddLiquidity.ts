import { useState } from "react";
import useWriteInstances from "./helper/useWriteInstances";
import { decodeError } from "./helper/decodeError";

const useAddLiquidity = () => {
  const { writeInstances } = useWriteInstances();
  const [isAddingLiquidity, setIsAddingLiquidity] = useState(false);

  const addLiquidity = async (
    tokenAAddress: string,
    tokenBAddress: string,
    amountADesired: string,
    amountBDesired: string,
    msgSender: string
  ) => {
    try {
      setIsAddingLiquidity(true);
      const instances = await writeInstances();
      if (!instances) return;

      const { uniswapV2Router02MockInstance } = instances;

      const tx = await uniswapV2Router02MockInstance.addLiquidity(
        tokenAAddress,
        tokenBAddress,
        amountADesired,
        amountBDesired,
        0, // amountAMin
        0, // amountBMin
        msgSender,
        0 // deadline
      );

      const recepit = await tx.wait();

      console.log(recepit);
    } catch (error) {
      decodeError(error);
    } finally {
      setIsAddingLiquidity(false);
    }
  };

  return { addLiquidity, isAddingLiquidity };
};

export default useAddLiquidity;
