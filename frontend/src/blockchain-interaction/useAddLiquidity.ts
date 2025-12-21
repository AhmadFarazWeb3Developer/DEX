import { useState } from "react";
import useWriteInstances from "./helper/useWriteInstances";
import { decodeError } from "./helper/decodeError";
import { ethers } from "ethers";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useAddLiquidity = () => {
  const { writeInstances } = useWriteInstances();
  const [isAddingLiquidity, setIsAddingLiquidity] = useState(false);

  const navigate = useNavigate();

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

      const { uniswapV2Router02MockInstance, uniswapV2FactoryInstance } =
        instances;

      console.log("length : ", await uniswapV2FactoryInstance.allPairsLength());
      console.log(
        "pair : ",
        await uniswapV2FactoryInstance.getPair(tokenAAddress, tokenBAddress)
      );
      console.log(
        "pair : ",
        await uniswapV2FactoryInstance.getPair(tokenBAddress, tokenAAddress)
      );

      const decimals = 18;
      const amountAParsed = ethers.parseUnits(amountADesired, decimals);
      const amountBParsed = ethers.parseUnits(amountBDesired, decimals);

      console.log(tokenAAddress);
      console.log(tokenBAddress);
      console.log(amountAParsed);
      console.log(amountBParsed);

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
      if (recepit) {
        toast.success(
          `Liquidity added: ${amountADesired} / ${amountBDesired}`,
          { action: { label: "Close", onClick: () => {} } }
        );

        navigate("/explore-pools");
      }
    } catch (error) {
      decodeError(error);
    } finally {
      setIsAddingLiquidity(false);
    }
  };

  return { addLiquidity, isAddingLiquidity };
};

export default useAddLiquidity;
