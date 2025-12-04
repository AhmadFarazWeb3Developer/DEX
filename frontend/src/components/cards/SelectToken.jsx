import { useEffect, useState } from "react";

const SelectToken = () => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    setTokens([
      {
        tokenName: "ETH",
        icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      },
      {
        tokenName: "MATIC",
        icon: "https://cryptologos.cc/logos/polygon-matic-logo.png",
      },
      {
        tokenName: "USDT",
        icon: "https://cryptologos.cc/logos/tether-usdt-logo.png",
      },
      {
        tokenName: "USDC",
        icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
      },
      {
        tokenName: "BNB",
        icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
      },
      {
        tokenName: "AVAX",
        icon: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
      },
      {
        tokenName: "SOL",
        icon: "https://cryptologos.cc/logos/solana-sol-logo.png",
      },
      {
        tokenName: "DOT",
        icon: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
      },
      {
        tokenName: "ADA",
        icon: "https://cryptologos.cc/logos/cardano-ada-logo.png",
      },
      {
        tokenName: "LINK",
        icon: "https://cryptologos.cc/logos/chainlink-link-logo.png",
      },
    ]);
  }, []);

  return (
    <div className="w-1/3 rounded-sm">
      {tokens.map((token) => (
        <div
          key={token.tokenName}
          className="flex items-center justify-between p-3 border-y-1 bg-gray-900/40 hover:bg-gray-900/60 transition"
        >
          <p className="text-white font-medium">{token.tokenName}</p>
          <img
            src={token.icon}
            alt={token.tokenName}
            className="size-6 rounded-full"
          />
        </div>
      ))}
    </div>
  );
};

export default SelectToken;
