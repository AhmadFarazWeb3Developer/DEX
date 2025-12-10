import getProvider from "./getProvider";

const getSigner = async (chainId) => {
  const provider = await getProvider(chainId);
  const signer = await provider.getSigner();
};

export default getSigner;
