// import { formatEther } from "ethers";

// const priceCache: Record<string, number> = {};
// const nameCache: Record<string, string> = {};

// export const calculateTVL = async (
//   reserves: string[],
//   tokensSymbol: string[]
// ) => {
//   let totalUSD = 0;

//   const resName = await fetch("https://api.coinpaprika.com/v1/coins");

//   const allTokens: any[] = await resName.json();

//   for (let i = 0; i < tokensSymbol.length; i++) {
//     const symbol = tokensSymbol[i];
//     const reserve = reserves[i];
//     if (!reserve) continue;

//     let tokenId = nameCache[symbol];
//     if (!tokenId) {
//       try {
//         const tokenData = allTokens.find(
//           (t) => t.symbol.toLowerCase() === symbol.toLowerCase()
//         );

//         tokenId = tokenData?.id;
//         nameCache[symbol] = tokenId ?? "";
//       } catch (err) {
//         console.error(`Failed to fetch token ID for ${symbol}`, err);
//         tokenId = "";
//       }
//     }

//     if (!tokenId) continue;

//     // getting USD price from CoinPaprika
//     let price = priceCache[symbol];
//     if (price === undefined) {
//       try {
//         const resPrice = await fetch(
//           `https://api.coinpaprika.com/v1/tickers/${tokenId}`
//         );
//         const data = await resPrice.json();
//         price = data?.quotes?.USD?.price ?? 0;
//         priceCache[symbol] = price;
//       } catch (err) {
//         console.error(`Failed to fetch price for ${symbol}`, err);
//         price = 0;
//         priceCache[symbol] = 0;
//       }
//     }

//     totalUSD += Number(formatEther(reserve)) * price;
//   }

//   return totalUSD;
// };

import { formatEther } from "ethers";

// Hardcoded prices in USD
const TOKEN_PRICES: Record<string, number> = {
  DAI: 1, // $1
  USDC: 1, // $1
  USDT: 1, // $1
  WETH: 1800, // $1800
  BNB: 300, // $300
  AVAX: 20, // $20
  LINK: 7, // $7
  DOT: 6, // $6
  MATIC: 1.2, // $1.2
};

export const calculateTVL = async (
  reserves: string[],
  tokensSymbol: string[]
) => {
  let totalUSD = 0;

  for (let i = 0; i < tokensSymbol.length; i++) {
    const symbol = tokensSymbol[i].toUpperCase();
    const reserve = reserves[i];
    if (!reserve) continue;

    const price = TOKEN_PRICES[symbol] || 0; // fallback 0 if not found
    totalUSD += Number(formatEther(reserve)) * price;
  }

  return totalUSD;
};
