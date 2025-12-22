import { useState } from "react";
import useWriteInstances from "./helper/useWriteInstances";
import { decodeError } from "./helper/decodeError";
import { ethers, ZeroAddress } from "ethers";
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
    msgSender: string,
    tokenASymbol: string,
    tokenBSymbol: string
  ) => {
    try {
      setIsAddingLiquidity(true);
      const instances = await writeInstances();
      if (!instances) return;

      const { uniswapV2Router02MockInstance, uniswapV2FactoryInstance } =
        instances;

      console.log(
        "pair : ",
        await uniswapV2FactoryInstance.getPair(tokenBAddress, tokenAAddress)
      );

      let pairAddress = await uniswapV2FactoryInstance.getPair(
        tokenBAddress,
        tokenAAddress
      );

      const decimals = 18;
      const amountAParsed = ethers.parseUnits(amountADesired, decimals);
      const amountBParsed = ethers.parseUnits(amountBDesired, decimals);
      let receipt;
      if (pairAddress !== ZeroAddress) {
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

        receipt = await tx.wait();
        console.log(receipt);
      } else {
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

        receipt = await tx.wait();
        console.log(receipt);

        for (const log of receipt.logs) {
          try {
            const parsed = uniswapV2FactoryInstance.interface.parseLog(log);
            if (parsed?.name === "PairCreated") {
              pairAddress = parsed.args.pair;
              break;
            }
          } catch (err) {
            decodeError(err);
          }
        }

        if (!pairAddress || pairAddress === ZeroAddress) {
          pairAddress = await uniswapV2FactoryInstance.getPair(
            tokenAAddress,
            tokenBAddress
          );
        }

        if (pairAddress) {
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
                tokensSymbol: [
                  tokenASymbol.toLowerCase(),
                  tokenBSymbol.toLowerCase(),
                ],
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
          }
        }
      }

      if (receipt) {
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
