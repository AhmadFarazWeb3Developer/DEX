import { toast } from "sonner";
import { decodeError } from "./helper/decodeError";
import useWriteInstances from "./helper/useWriteInstances";
import { useState } from "react";

const useCreatePair = () => {
  const { writeInstances } = useWriteInstances();
  const [isCreatingPair, setIsCreatingPair] = useState(false);

  const createPair = async (
    tokenAAddress: string,
    tokenBAddress: string,
    tokenASymbol: string,
    tokenBSymbol: string
  ) => {
    const instances = await writeInstances();
    if (!instances) return;

    const { uniswapV2FactoryInstance } = instances;
    try {
      setIsCreatingPair(true);
      const tx = await uniswapV2FactoryInstance.createPair(
        tokenAAddress,
        tokenBAddress
      );

      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      let pairAddress: string | undefined = undefined;

      for (const log of receipt.logs) {
        try {
          const parsed = uniswapV2FactoryInstance.interface.parseLog(log);
          if (parsed?.name === "PairCreated") {
            pairAddress = parsed.args.pair;
            break;
          }
        } catch (err) {
          setIsCreatingPair(false);
        }
      }

      console.log("Pair created at:", pairAddress);

      if (!pairAddress) {
        console.error("Pair address not found in event logs");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/pair/create-pair",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pairAddress,
            pair: [tokenAAddress, tokenBAddress],
            tokensSymbol: [tokenASymbol, tokenBSymbol],
          }),
        }
      );

      await response.json();

      if (response.status === 201) {
        toast.success("Pair Created", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
        return true;
      }
    } catch (err) {
      decodeError(err);
      setIsCreatingPair(false);
      return false;
    } finally {
      setIsCreatingPair(false);
    }
  };

  return { createPair, isCreatingPair };
};

export default useCreatePair;
