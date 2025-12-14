import { useEffect, useState } from "react";
import { TOKEN_ICONS } from "../constants/tokenIcons";
import { CopyIcon } from "lucide-react";
import { PoolType } from "@/types/PoolType";
import { formatEther } from "ethers";
import useSinglePool from "../blockchain-interaction/useSinglePool";
import useAllPools from "../blockchain-interaction/useAllPools";
import { calculateTVL } from "../lib/calculateTVL";

const Pools = () => {
  const [pools, setPools] = useState<PoolType[]>([]);
  const { allPools } = useAllPools();
  const { singlePool } = useSinglePool();

  useEffect(() => {
    const fetchPoolsAndReserves = async () => {
      const poolsData = await allPools();
      if (!poolsData) return;

      const pairs: PoolType[] = poolsData.pairs;
      const formattedPools: PoolType[] = await Promise.all(
        pairs.map(async (pair) => {
          const poolReserves = await singlePool(pair.pairAddress);
          const reserves = poolReserves?.reserves || ["0", "0"];

          console.log("symbol : ", pair.tokensSymbol);

          const tvl = await calculateTVL(reserves, pair.tokensSymbol);

          return {
            pair: pair.pair,
            pairAddress: pair.pairAddress,
            tokensSymbol: pair.tokensSymbol,
            poolReserves: reserves,
            tvl,
          };
        })
      );

      setPools(formattedPools);
    };

    fetchPoolsAndReserves();
  }, []);

  const truncateAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <div className="min-h-screen bg-[#0b1e13] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-1">
            Liquidity Pools
          </h1>
          <p className="text-gray-400 text-sm">
            Explore and manage your liquidity positions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#12291a] rounded-2xl p-6 hover:bg-[#0B1E13] transition-all">
            <div className="text-gray-400 text-sm mb-1">Total Pools</div>
            <div className="text-white text-3xl font-bold">{pools.length}</div>
          </div>
          <div className="bg-[#12291a] rounded-2xl p-6 hover:bg-[#0B1E13] transition-all">
            <div className="text-gray-400 text-sm mb-1">Active Pairs</div>
            <div className="text-white text-3xl font-bold">{pools.length}</div>
          </div>
          <div className="bg-[#12291a] rounded-2xl p-6 hover:bg-[#0B1E13] transition-all">
            <div className="text-gray-400 text-sm mb-1">Total TVL</div>
            <div className="text-white text-3xl font-bold">$0.00</div>
          </div>
        </div>

        <div className="bg-[#12291a] rounded-2xl overflow-hidden">
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-[#0b1e13] border-b border-gray-700/50 text-xs text-gray-400 uppercase font-semibold">
              <tr>
                <th className="p-4 w-[5%] text-left">#</th>
                <th className="p-4 w-[35%] text-left">Pool</th>
                <th className="p-4 w-[25%] text-left">Reserves</th>
                <th className="p-4 w-[25%] text-left">TVL</th>
                <th className="p-4 w-[35%] text-left">Address</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700/20">
              {pools.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-gray-400">
                    No pools available yet
                  </td>
                </tr>
              ) : (
                pools.map((attribute, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#0A1A0F] transition-all duration-200"
                  >
                    <td className="p-4 text-gray-400 font-semibold">
                      {index + 1}
                    </td>

                    <td className="p-4 flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {attribute.tokensSymbol.map((tokensSymbol, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full bg-[#0b1e13] border-2 border-gray-700 flex items-center justify-center overflow-hidden"
                          >
                            {TOKEN_ICONS[tokensSymbol] ? (
                              <img
                                src={TOKEN_ICONS[tokensSymbol]}
                                alt={tokensSymbol}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-bold text-white">
                                {tokensSymbol.slice(0, 2)}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="font-semibold text-white">
                        {attribute.tokensSymbol.join(" / ").toUpperCase()}
                      </div>
                    </td>

                    <td className="p-4 text-white font-semibold">
                      {attribute.poolReserves
                        ? `${formatEther(
                            attribute.poolReserves[0]
                          )} / ${formatEther(attribute.poolReserves[1])}`
                        : "-"}
                    </td>

                    <td className="p-4 text-white font-semibold">
                      {formatLargeNumber(attribute.tvl)}
                    </td>

                    <td className="p-4 flex items-center gap-2">
                      <code className="py-1.5 rounded-lg text-white text-sm font-mono truncate">
                        {truncateAddress(attribute.pairAddress)}
                      </code>
                      <CopyIcon
                        onClick={() =>
                          navigator.clipboard.writeText(attribute.pairAddress)
                        }
                        className="text-gray-500 w-4 h-4 cursor-pointer hover:text-gray-300"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pools;

export const formatLargeNumber = (value: number | string): string => {
  const num = Number(value);
  if (isNaN(num)) return "0";

  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(2) + "K";

  return num.toString();
};
