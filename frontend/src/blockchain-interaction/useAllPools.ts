import { PairsAddrsArrayType } from "@/types/PairsAddrsType";
import useReadInstances from "./helper/useReadInstances";

const useAllPools = () => {
  const { readInstances } = useReadInstances();

  const allPools = async () => {
    const instances = await readInstances();
    if (!instances) return { pairsAddresses: [] };

    const { uniswapV2FactoryInstance } = instances;

    const length = await uniswapV2FactoryInstance.allPairsLength();
    const pairsAddresses: PairsAddrsArrayType = [];

    for (let i = 0; i < length; i++) {
      const pairAddress = await uniswapV2FactoryInstance.allPairs(i);
      pairsAddresses.push(pairAddress);
    }

    console.log("All pair addresses:", pairsAddresses);

    return { pairsAddresses };
  };

  return { allPools };
};

export default useAllPools;
