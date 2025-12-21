import React, { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import useTokens from "../../blockchain-interaction/helper/useTokens";
import { TokenType } from "../../types/TokenType";
import { TOKEN_ICONS } from "../../constants/tokenIcons";
import { setTokenProp } from "../../interfaces/setTokenProp";

const SelectToken = ({ setToken }: setTokenProp) => {
  const [tokens, setTokens] = useState<TokenType[]>([]);
  const [searchedTokens, setSearchedTokens] = useState<TokenType[]>([]);

  const { allTokens, isLoading } = useTokens();

  useEffect(() => {
    const init = async () => {
      const { tokens } = await allTokens();

      const updatedTokens = tokens.map((token) => {
        return {
          ...token,
          icon: TOKEN_ICONS[token.symbol.toLowerCase()],
        };
      });
      console.log(updatedTokens);

      setTokens(updatedTokens);
      setSearchedTokens(updatedTokens);
    };
    init();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const filtered = tokens.filter(
      (token) =>
        token.symbol.toLowerCase().includes(value.toLowerCase()) ||
        token.name.toLowerCase().includes(value.toLowerCase()) ||
        token.address.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedTokens(filtered);
  };

  return (
    <div className="rounded-md bg-[#2b4635] p-4 w-full cursor-pointer">
      <div className="flex items-center bg-[#1f3324] rounded-md px-3 py-2 mb-4">
        <Search size={20} className="text-white mr-2" />
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Search tokens"
          className="bg-transparent text-white placeholder-gray-300 focus:outline-none flex-1"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-1 text-white text-sm">
          <Loader2 size={16} className=" animate-spin" />
          Loading tokens...
        </div>
      ) : (
        <div className="max-h-[420px] overflow-y-auto pr-2 space-y-2">
          {searchedTokens.map((token: TokenType) => (
            <div
              onClick={() => setToken(token)}
              key={token.name}
              className="flex items-center justify-between p-3 rounded-md bg-[#1f3324] hover:bg-[#12291a] transition-colors"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={token.icon}
                  alt={token.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="text-white font-semibold text-sm">
                    {token.symbol}
                  </p>
                  <p className="text-white text-xs">{token.name}</p>
                </div>
              </div>
              <p className="text-gray-300 text-xs truncate max-w-[120px]">
                {`${token.address.slice(0, 6)}....${token.address.slice(-6)}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectToken;
