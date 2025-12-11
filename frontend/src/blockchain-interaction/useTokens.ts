import useReadInstances from "./helper/useReadInstances";

const useTokens = () => {
  const { readInstances } = useReadInstances();

  const tokens = async () => {
    const instances = await readInstances();

    if (!instances) throw new Error("Failed to load contract instances");

    const {
      daiMockInstance,
      usdtMockInstance,
      wethMockInstance,
      bnbMockInstance,
      avalancheMockInstance,
      chainlinkMockInstance,
      polkadotMockInstance,
      usdcMockInstance,
    } = instances;
  };
};

export default useTokens;
