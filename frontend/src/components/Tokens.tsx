import { useEffect, useState } from "react";
import useTokens from "../blockchain-interaction/helper/useTokens";
import { TokenType } from "../types/TokenType";
import { TOKEN_ICONS } from "../constants/tokenIcons";
import { formatLargeNumber } from "../lib/formateLargeNumber";
import { formatEther } from "ethers";
import { CopyIcon, Loader2, Search } from "lucide-react";
import { toast } from "sonner";

interface SearchedValueProp {
  searchedValue: string;
}

const Tokens = ({ searchedValue }: SearchedValueProp) => {
  const [loading, setLoading] = useState(true);
  const [allTokensList, setAllTokensList] = useState<TokenType[]>([]);
  const [searchedTokens, setSearchedTokens] = useState<TokenType[]>([]);

  const { allTokens } = useTokens();

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const { tokens } = await allTokens();
      const updatedTokens = tokens.map((token) => ({
        ...token,
        icon: TOKEN_ICONS[token.symbol.toLowerCase()],
      }));

      setAllTokensList(updatedTokens);
      setSearchedTokens(updatedTokens);
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    const filtered = allTokensList.filter(
      (token) =>
        token.name.toLowerCase().includes(searchedValue.toLowerCase()) ||
        token.address.toLowerCase().includes(searchedValue.toLowerCase()) ||
        token.symbol.toLowerCase().includes(searchedValue.toLowerCase())
    );

    setSearchedTokens(filtered);
  }, [searchedValue]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-2 text-white text-xl">
        <Loader2 className="animate-spin h-5 w-5" />
        Loading pools...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full space-y-2">
      <div className="flex px-4 py-3 text-gray-400 text-sm font-medium border-b border-[#1f3528]">
        <p className="flex-[0.5]">#</p>
        <p className="flex-[2]">Token</p>
        <p className="flex-[2]">Name</p>
        <p className="flex-[2]">Symbol</p>
        <p className="flex-[2]">Total Supply</p>
        <p className="flex-[2]">Address</p>
      </div>

      {searchedTokens.map((token, index) => (
        <div
          key={token.address}
          className="flex items-center px-4 py-3 bg-[#12291a] border border-[#1f3528] rounded-lg hover:bg-[#0B1E13] transition-colors shadow-sm"
        >
          <p className="text-gray-400 font-semibold flex-[0.5]">{index + 1}</p>

          <div className="flex items-center space-x-2 flex-[2]">
            <img
              src={token.icon}
              alt={token.symbol}
              className="w-7 h-7 rounded-full border border-gray-700"
            />
            <span className="text-white font-semibold truncate">
              {token.symbol}
            </span>
          </div>

          <p className="text-gray-300 flex-[2] truncate">{token.name}</p>
          <p className="text-gray-300 flex-[2] truncate">{token.symbol}</p>
          <p className="text-gray-300 flex-[2]">
            {formatLargeNumber(formatEther(token.totalSupply))}
          </p>

          <p className="text-gray-300 flex-[2] flex flex-row items-center gap-2 truncate">
            {`${token.address.slice(0, 6)}...${token.address.slice(-4)}`}
            <CopyIcon
              size={16}
              className=" cursor-pointer text-gray-400"
              onClick={() => {
                navigator.clipboard.writeText(token.address);
                toast.success(`${token.address} Copied!`, {
                  action: { label: "Close", onClick: () => {} },
                });
              }}
            />
          </p>
        </div>
      ))}
    </div>
  );
};

export default Tokens;
