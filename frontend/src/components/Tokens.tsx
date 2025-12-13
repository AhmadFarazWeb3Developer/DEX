import { useEffect, useState } from "react";
import useTokens from "../blockchain-interaction/helper/useTokens";
import { TokenType } from "../types/TokenType";
import { TOKEN_ICONS } from "../constants/tokenIcons";

const Tokens = () => {
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const { allTokens } = useTokens();

  useEffect(() => {
    const init = async () => {
      const { tokens } = await allTokens();
      const updatedTokens = tokens.map((token) => ({
        ...token,
        icon: TOKEN_ICONS[token.symbol.toLowerCase()],
      }));
      setTokens(updatedTokens);
    };
    init();
  }, []);

  return (
    <div className="flex flex-col w-full space-y-2">
      {/* Table Header */}
      <div className="flex px-4 py-3 text-gray-400 text-sm font-medium border-b border-[#1f3528]">
        <p className="flex-[0.5]">#</p>
        <p className="flex-[2]">Token</p>
        <p className="flex-[2]">Name</p>
        <p className="flex-[2]">Symbol</p>
        <p className="flex-[1]">Total Supply</p>
        <p className="flex-[2]">Address</p>
      </div>

      {tokens.map((token, index) => (
        <div
          key={token.address}
          className="flex items-center px-4 py-3 bg-[#12291a] border border-[#1f3528] rounded-lg hover:bg-[#0B1E13] transition-colors shadow-sm"
        >
          <p className=" text-gray-400 font-semibold flex-[0.5]">{index + 1}</p>

          <div className="flex items-center space-x-2 flex-[2]">
            <img
              src={token.icon}
              alt={token.symbol}
              className="w-7 h-7 rounded-full border border-gray-700"
            />
            <span className="text-white font-semibold truncate">
              {token.name}
            </span>
          </div>

          <p className="text-gray-300 flex-[2] truncate">{token.name}</p>

          <p className="text-gray-300 flex-[2] truncate">{token.symbol}</p>

          <p className="text-gray-300 flex-[1] truncate">{token.totalSupply}</p>

          <p className="text-gray-300 flex-[2] truncate">
            {`${token.address.slice(0, 6)}...${token.address.slice(-4)}`}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Tokens;
