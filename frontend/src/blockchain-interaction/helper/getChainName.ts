const getChainName = (chainId: number) => {
  switch (chainId) {
    case 1:
      return "ethereum";
    case 137:
      return "polygon";
    case 56:
      return "smartchain";
    case 42161:
      return "arbitrum";
    case 10:
      return "optimism";
    case 43114:
      return "avalanchec";
    case 8453:
      return "base";
    case 250:
      return "fantom";
    case 100:
      return "gnosis";
    case 11155111: // sepolia chain id
      return "ethereum";
    case 80002: // polygon amoy
      return "polygon";
    case 97: // bnb testnet
      return "bnb";
    case 421614: // arbitrum sepolia
      return "arbitrum";
    case 43113: // avalanche fuji
      return "avalanchec";
    case 11155420: // aptimism sepolia
      return "optimism";
    case 84532: // base sepolia
      return "base";
    case 31337:
      return "hardhat";
    default:
      return "Unknown Network";
  }
};

export default getChainName;
