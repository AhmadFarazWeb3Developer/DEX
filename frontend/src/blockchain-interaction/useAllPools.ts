import { PairsAddrsArrayType } from "@/types/PairsAddrsType";
import useReadInstances from "./helper/useReadInstances";

const useAllPools = () => {
  const { readInstances } = useReadInstances();

  const allPools = async () => {
    try {
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

      const response = await fetch(
        "http://localhost:8000/api/pair/get-all-pairs"
      );

      console.log("db data : ", await response.json());

      return { pairsAddresses };
    } catch (error) {
    } finally {
    }
  };

  return { allPools };
};

export default useAllPools;
