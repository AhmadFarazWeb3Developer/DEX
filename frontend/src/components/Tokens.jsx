const Tokens = () => {
  const tokens = [
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
      tokenAddress: "0x0000000000000000000000000000000000000000",
    },
    {
      chain: "Avalanche",
      tokenName: "AVAX",
      icon: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
      tokenAddress: "0x0000000000000000000000000000000000000000",
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
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex px-3 py-3 text-gray-400 text-sm border-b border-[#1f3528]">
        <p className="flex-[0.5]">#</p>
        <p className="flex-[2]">Token</p>
        <p className="flex-[2]">Address</p>
        <p className="flex-[1]">Price</p>
        <p className="flex-[1]">24h%</p>
        <p className="flex-[1]">Market Cap</p>
      </div>

      {tokens.map((token, index) => (
        <div
          key={index}
          className="flex items-center px-3 py-4 bg-[#12291a] \
                     border border-[#1f3528] rounded-lg mt-2 \
                     hover:bg-[#0B1E13] transition-colors shadow-md"
        >
          <p className="text-white flex-[0.5]">{index + 1}</p>

          <div className="flex items-center space-x-2 flex-[2]">
            <img
              src={token.icon}
              alt={token.symbol}
              className="w-7 h-7 rounded-full border border-gray-700"
            />
            <span className="text-white font-semibold">
              {token.chain} ({token.tokenName})
            </span>
          </div>

          <p className="text-gray-300 flex-[2] truncate">
            {token.tokenAddress}
          </p>

          <p className="text-gray-300 flex-[1]">{token.price}</p>

          <p
          // className={`flex-[1] ${
          //   token.change.startsWith("-") ? "text-red-400" : "text-green-400"
          // }`}
          >
            {token.change}
          </p>

          {/* Market Cap */}
          <p className="text-gray-300 flex-[1]">{token.marketCap}</p>
        </div>
      ))}
    </div>
  );
};

export default Tokens;
