import { useState } from "react";
import useWriteInstances from "./helper/useWriteInstances";
import { decodeError } from "./helper/decodeError";
import { ethers } from "ethers";

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

      const decimals = 18;
      const amountAParsed = ethers.parseUnits(amountADesired, decimals);
      const amountBParsed = ethers.parseUnits(amountBDesired, decimals);

      const tx = await uniswapV2Router02MockInstance.addLiquidity(
        tokenAAddress,
        tokenBAddress,
        amountAParsed,
        amountBParsed,
        0,
        0,
        msgSender,
        Math.floor(Date.now() / 1000) + 60 * 10 //  10 min deadline
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
