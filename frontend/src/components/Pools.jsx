const Pools = () => {
  const pools = [
    {
      pair: ["ETH", "USDC"],
      icons: [
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
      ],
      tvl: "$1.2M",
      fees: "0.3%",
      apy: "12%",
    },
    {
      pair: ["MATIC", "USDT"],
      icons: [
        "https://cryptologos.cc/logos/polygon-matic-logo.png",
        "https://cryptologos.cc/logos/tether-usdt-logo.png",
      ],
      tvl: "$850K",
      fees: "0.25%",
      apy: "9%",
    },
    {
      pair: ["BNB", "ETH"],
      icons: [
        "https://cryptologos.cc/logos/bnb-bnb-logo.png",
        "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      ],
      tvl: "$2.5M",
      fees: "0.2%",
      apy: "15%",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="flex px-3 py-3 text-gray-400 text-sm border-b border-[#1f3528]">
        <p className="flex-[0.5]">#</p>
        <p className="flex-[2]">Pool</p>
        <p className="flex-[1]">TVL</p>
        <p className="flex-[1]">Fee%</p>
        <p className="flex-[1]">APY</p>
      </div>

      {pools.map((pool, index) => (
        <div
          key={index}
          className="flex items-center px-3 py-4 bg-[#12291a] 
                     border border-[#1f3528] rounded-lg mt-2 
                     hover:bg-[#0B1E13] transition-colors shadow-md"
        >
          <p className="text-white flex-[0.5]">{index + 1}</p>

          <div className="flex items-center space-x-2 flex-[2]">
            {pool.icons.map((icon, idx) => (
              <img
                key={idx}
                src={icon}
                alt={pool.pair[idx]}
                className="w-7 h-7 rounded-full border border-gray-700"
              />
            ))}
            <span className="text-white font-semibold">
              {pool.pair.join(" / ")}
            </span>
          </div>

          <p className="text-gray-300 flex-[1]">{pool.tvl}</p>

          <p className="text-gray-300 flex-[1]">{pool.fees}</p>

          <p className="text-gray-300 flex-[1]">{pool.apy}</p>
        </div>
      ))}
    </div>
  );
};

export default Pools;
