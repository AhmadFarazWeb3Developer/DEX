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
    } catch (err) {
      console.error("Failed to create pair:", err);
    }
  };

  return { createPair };
};

export default useCreatePair;
