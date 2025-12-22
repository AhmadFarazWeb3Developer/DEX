import { useState } from "react";
import useWriteInstances from "./helper/useWriteInstances";
import { parseUnits, ZeroAddress } from "ethers";
import useSigner from "./helper/useSiger";
import { toast } from "sonner";

const useRemoveLiquidity = () => {
  const { writeInstances } = useWriteInstances();
  const [isRemovingLiquidity, setIsRemovingLiquidity] = useState(false);
  const { getSigner } = useSigner();

  const removeLiquidity = async (
    tokenA: string,
    tokenB: string,
    liquidity: string,
    to: string
  ) => {
    try {
      setIsRemovingLiquidity(true);

      const signer = getSigner();
      if (!signer) return toast.error("Signer not found");

      const instances = await writeInstances();
      if (!instances) return;

      const {
        uniswapV2Router02MockInstance,
        uniswapV2FactoryInstance,
        UniswapV2ERC20Instance,
      } = instances;

      const pairAddress = await uniswapV2FactoryInstance.getPair(
        tokenA,
        tokenB
      );

      if (!pairAddress || pairAddress === ZeroAddress)
        return toast.error("Pair not found");

      const lpToken = UniswapV2ERC20Instance.attach(pairAddress) as any;

      const liquidityInWei = parseUnits(liquidity, 18);

      // Approve router to spend LP tokens
      const allowance = await lpToken.allowance(
        to,
        uniswapV2Router02MockInstance.target
      );
      if (allowance < liquidityInWei) {
        const approveTx = await lpToken.approve(
          uniswapV2Router02MockInstance.target,
          liquidityInWei
        );
        await approveTx.wait();
        console.log("Router approved for LP tokens");
      }

      const tx = await uniswapV2Router02MockInstance.removeLiquidity(
        tokenA,
        tokenB,
        liquidityInWei,
        0, // amountAMin
        0, // amountBMin
        to,
        0 // deadline
      );

      const receipt = await tx.wait();
      console.log("Liquidity removed:", receipt);
      toast.success(`Removed ${liquidity} LP tokens successfully`, {
        action: { label: "Close", onClick: () => {} },
      });
    } catch (err) {
      console.error(err);
      toast.error("Remove liquidity failed");
    } finally {
      setIsRemovingLiquidity(false);
    }
  };

  return { removeLiquidity, isRemovingLiquidity };
};

export default useRemoveLiquidity;
