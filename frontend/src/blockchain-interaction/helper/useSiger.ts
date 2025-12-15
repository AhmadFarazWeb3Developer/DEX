import { useAppKitProvider } from "@reown/appkit/react";
import { BrowserProvider, Eip1193Provider } from "ethers";

const useSigner = () => {
  const { walletProvider } = useAppKitProvider("eip155");

  const getSigner = async () => {
    if (!walletProvider) throw new Error("Provider not available");

    const provider = new BrowserProvider(walletProvider as Eip1193Provider);
    const signer = await provider.getSigner();

    return { signer };
  };

  return { getSigner };
};

export default useSigner;
