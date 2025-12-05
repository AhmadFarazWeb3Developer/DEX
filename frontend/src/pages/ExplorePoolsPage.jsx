import React from "react";

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

const ExplorePoolsPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto  h-screen">
      <h2 className="text-white text-2xl font-bold mb-4">Explore Pools</h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pools.map((pool, index) => (
          <div
            key={index}
            className="bg-[#12291a] border border-[#1f3528] rounded-lg p-4 shadow-lg hover:bg-[#0B1E13] transition-colors"
          >
            <div className="flex items-center space-x-2 mb-3">
              {pool.icons.map((icon, idx) => (
                <img
                  key={idx}
                  src={icon}
                  alt={pool.pair[idx]}
                  className="w-8 h-8 rounded-full border border-gray-700"
                />
              ))}
            </div>

            {/* Pair Name */}
            <p className="text-white font-semibold text-lg mb-2">
              {pool.pair.join(" / ")}
            </p>

            {/* Pool Info */}
            <div className="flex justify-between text-gray-300 text-sm">
              <div>
                <p className="font-medium">TVL</p>
                <p>{pool.tvl}</p>
              </div>
              <div>
                <p className="font-medium">Fees</p>
                <p>{pool.fees}</p>
              </div>
              <div>
                <p className="font-medium">APY</p>
                <p>{pool.apy}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePoolsPage;
