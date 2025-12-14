import { formatEther } from "ethers";

const priceCache: Record<string, number> = {};
const nameCache: Record<string, string> = {};

export const calculateTVL = async (
  reserves: string[],
  tokensSymbol: string[]
) => {
  let totalUSD = 0;

  for (let i = 0; i < tokensSymbol.length; i++) {
    const symbol = tokensSymbol[i];
    const reserve = reserves[i];
    if (!reserve) continue;

    // Getting token name against symbol
    let tokenId = nameCache[symbol];
    if (!tokenId) {
      try {
        const resName = await fetch(
          `https://api.coingecko.com/api/v3/coins/list`
        );
        const allTokens = await resName.json();
        const tokenData = allTokens.find(
          (t: any) => t.symbol.toLowerCase() === symbol.toLowerCase()
        );
        tokenId = tokenData?.id;
        nameCache[symbol] = tokenId ?? "";
      } catch (err) {
        console.error(`Failed to fetch token ID for ${symbol}`, err);
        tokenId = "";
      }
    }

    if (!tokenId) continue;

    // Getting USD price
    let price = priceCache[symbol];
    if (price === undefined) {
      try {
        const resPrice = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
        );
        const data = await resPrice.json();
        price = data[tokenId]?.usd ?? 0;
        priceCache[symbol] = price;
      } catch (err) {
        console.error(`Failed to fetch price for ${symbol}`, err);
        price = 0;
        priceCache[symbol] = 0;
      }
    }

    totalUSD += Number(formatEther(reserve)) * price;
  }

  return totalUSD;
};
