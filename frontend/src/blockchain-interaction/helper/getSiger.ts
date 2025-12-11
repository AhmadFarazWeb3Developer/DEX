import getProvider from "./getProvider";

const getSigner = async (chainId: number) => {
  const provider = await getProvider(chainId);
  const signer = await provider.getSigner();

  return { signer };
};

export default getSigner;
