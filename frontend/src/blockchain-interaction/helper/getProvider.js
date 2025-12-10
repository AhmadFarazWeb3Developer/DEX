import { JsonRpcProvider } from "ethers";

const getProvider = async (chainId) => {
  const getLocalRpcUrl = () => {
    return "http://127.0.0.1:8545";
  };
  const localRpcUrl = getLocalRpcUrl();

  const apiKey = import.meta.env.VITE_ALCHEMY_RPC_API_KEY;

  switch (chainId) {
    // Mainnets
    case 1:
      return new JsonRpcProvider(
        `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`,
        "any"
      );
    case 137:
      return new JsonRpcProvider(
        `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`,
        "any"
      );
    case 56:
      return new JsonRpcProvider("https://bsc-dataseed.binance.org/", "any");
    case 42161:
      return new JsonRpcProvider(
        `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`,
        "any"
      );
    case 10:
      return new JsonRpcProvider(
        `https://opt-mainnet.g.alchemy.com/v2/${apiKey}`,
        "any"
      );
    case 43114:
      return new JsonRpcProvider(
        `https://avax-mainnet.g.alchemy.com/v2/${apiKey}`,
        "any"
      );
    case 8453:
      return new JsonRpcProvider(
        `https://base-mainnet.g.alchemy.com/v2/${apiKey}`,
        "any"
      );

    // Testnets
    case 11155111:
      return new JsonRpcProvider(
        `https://eth-sepolia.g.alchemy.com/v2/${apiKey}`,
        "any"
      );
    case 80002:
      return new JsonRpcProvider("https://rpc-amoy.polygon.technology", "any");
    case 97:
      return new JsonRpcProvider(
        `https://bnb-testnet.g.alchemy.com/v2/${apiKey}`,
        "any"
      );
    case 421614:
      return new JsonRpcProvider(
        `https://arb-sepolia.g.alchemy.com/v2/${apiKey}`,
        "any"
      );
    case 43113:
      return new JsonRpcProvider(
        `https://avax-fuji.g.alchemy.com/v2/${apiKey}`,
        "any"
      );
    case 11155420:
      return new JsonRpcProvider(
        `https://opt-sepolia.g.alchemy.com/v2/${apiKey}`,
        "any"
      );
    case 84532:
      return new JsonRpcProvider(
        `https://base-sepolia.g.alchemy.com/v2/${apiKey}`,
        "any"
      );

    case 31337:
      return new JsonRpcProvider(localRpcUrl);

    default:
      throw new Error(`No provider configured for chainId ${chainId}`);
  }
};

export default getProvider;
