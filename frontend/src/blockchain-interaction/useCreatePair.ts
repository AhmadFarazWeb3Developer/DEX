import { toast } from "sonner";
import { decodeError } from "./helper/decodeError";
import useWriteInstances from "./helper/useWriteInstances";

const useCreatePair = () => {
  const { writeInstances } = useWriteInstances();

  const createPair = async (tokenA: string, tokenB: string) => {
    const instances = await writeInstances();
    if (!instances) return;

    const { uniswapV2FactoryInstance } = instances;
    try {
      const tx = await uniswapV2FactoryInstance.createPair(tokenA, tokenB);
      console.log("Transaction sent:", tx.hash);

      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      let pairAddress: string | undefined = undefined;

      for (const log of receipt.logs) {
        try {
          const parsed = uniswapV2FactoryInstance.interface.parseLog(log);
          if (parsed?.name === "PairCreated") {
            pairAddress = parsed.args.pair; // event arg named “pair”
            break;
          }
        } catch (err) {}
      }

      console.log("Pair created at:", pairAddress);

      if (!pairAddress) {
        console.error("Pair address not found in event logs");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/pair/createPair",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pairAddress,
            pair: [tokenA, tokenB],
          }),
        }
      );

      console.log("Backend response:", await response.json());
      const data = await response.json();

      if (data.status === 201) {
        toast.success("Pair Created", {
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      }
    } catch (err) {
      decodeError(err);
    }
  };

  return { createPair };
};

export default useCreatePair;

/*
"DaiAddress": "0x5FbDB2315678afecb367f032d93F642f64180aa3",
"UsdtAddress": "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",

"WethAddress": "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
"AvalancheAddress": "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
  
"UsdcAddress": "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
"ChainlinkAddress": "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",

"PolkadotAddress": "0x0165878A594ca255338adfa4d48449f69242Eb8F",
"BnbAddress": "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",

"PolygonAddress": "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"

*/
