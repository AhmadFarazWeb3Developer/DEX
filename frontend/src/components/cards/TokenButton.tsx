import { ChevronDown } from "lucide-react";
import { TOKEN_ICONS } from "../../constants/tokenIcons";
import { TokenType } from "../../types/TokenType";

const TokenButton = ({
  token,
  onClick,
}: {
  token: TokenType | null;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="cursor-pointer w-1/2 flex justify-center items-center gap-2 bg-[#0E3A2A] hover:bg-[#114A36] transition px-3  py-2 rounded-full"
  >
    {token ? (
      <>
        <img
          src={TOKEN_ICONS[token.symbol.toLowerCase()]}
          alt={token.symbol}
          className="w-5 h-5 rounded-full"
        />
        <span className="text-white text-sm font-semibold">{token.symbol}</span>
      </>
    ) : (
      <span className="text-[#E6E6E6] text-sm font-semibold">Select Token</span>
    )}
    <ChevronDown className="text-white w-4 h-4" />
  </div>
);

export default TokenButton;
