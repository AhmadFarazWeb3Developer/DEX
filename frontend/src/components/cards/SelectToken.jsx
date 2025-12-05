import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const SelectToken = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    setTokens([
      {
        chain: "Ethereum",
        tokenName: "ETH",
        icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        tokenAddress: "0x0000000000000000000000000000000000000000",
      },
      {
        chain: "Polygon",
        tokenName: "MATIC",
        icon: "https://cryptologos.cc/logos/polygon-matic-logo.png",
        tokenAddress: "0x0000000000000000000000000000000000001010",
      },
      {
        chain: "Ethereum",
        tokenName: "USDT",
        icon: "https://cryptologos.cc/logos/tether-usdt-logo.png",
        tokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      },
      {
        chain: "Ethereum",
        tokenName: "USDC",
        icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
        tokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      },
      {
        chain: "BNB Chain",
        tokenName: "BNB",
        icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
        tokenAddress: "0x0000000000000000000000000000000000000000", // BNB native
      },
      {
        chain: "Avalanche",
        tokenName: "AVAX",
        icon: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
        tokenAddress: "0x0000000000000000000000000000000000000000", // AVAX native
      },
      {
        chain: "Solana",
        tokenName: "SOL",
        icon: "https://cryptologos.cc/logos/solana-sol-logo.png",
        tokenAddress: "So11111111111111111111111111111111111111112",
      },
      {
        chain: "Polkadot",
        tokenName: "DOT",
        icon: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
        tokenAddress: "0x0000000000000000000000000000000000000000",
      },
      {
        chain: "Cardano",
        tokenName: "ADA",
        icon: "https://cryptologos.cc/logos/cardano-ada-logo.png",
        tokenAddress: "0x0000000000000000000000000000000000000000",
      },
      {
        chain: "Ethereum",
        tokenName: "LINK",
        icon: "https://cryptologos.cc/logos/chainlink-link-logo.png",
        tokenAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
      },
    ]);
  }, []);

  return (
    <div className="rounded-md bg-[#2b4635] p-4 w-full">
      <div className="flex items-center bg-[#1f3324] rounded-md px-3 py-2 mb-4">
        <Search size={20} className="text-white mr-2" />
        <input
          type="text"
          placeholder="Search tokens"
          className="bg-transparent text-white placeholder-gray-300 focus:outline-none flex-1"
        />
      </div>

      <div className="max-h-[420px] overflow-y-auto pr-2 space-y-2">
        {tokens.map((token) => (
          <div
            key={token.tokenName}
            className="flex items-center justify-between p-3 rounded-md bg-[#1f3324] hover:bg-[#12291a] transition-colors"
          >
            <div className="flex items-center space-x-3">
              <img
                src={token.icon}
                alt={token.tokenName}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">
                  {token.chain}
                </p>
                <p className="text-white text-xs">{token.tokenName}</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs truncate max-w-[120px]">
              {token.tokenAddress}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectToken;
