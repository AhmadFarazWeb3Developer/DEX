// import abis from "./abis";
// import { getAddressesByChainId } from "./addresses";

import { useAppKitNetwork } from "@reown/appkit/react";

// const { chainId } = useAppKitNetwork();

// if (!chainId) return;

// const numericChainId =
//   typeof chainId === "string" ? parseInt(chainId) : chainId;

// const {
//   DaiAddress,
//   UsdtAddress,
//   WethAddress,
//   BnbAddress,
//   AvalancheAddress,
//   ChainlinkAddress,
//   PolkadotAddress,
//   UsdcAddress,
//   PolygonAddress,
// } = getAddressesByChainId(numericChainId);

// const addressToAbiMap = {
//   [DaiAddress]: abis.DaiMockAbi,
//   [UsdtAddress]: abis.UsdtMockAbi,
//   [WethAddress]: abis.WethMockAbi,
//   [BnbAddress]: abis.BnbMockAbi,
//   [AvalancheAddress]: abis.AvalancheMockAbi,
//   [ChainlinkAddress]: abis.ChainlinkMockAbi,
//   [PolkadotAddress]: abis.PolkadotMockAbi,
//   [UsdcAddress]: abis.UsdcMockAbi,
//   [PolygonAddress]: abis.PolygonMockAbi,
// };

// export default addressToAbiMap;

import abis from "./abis";
import { getAddressesByChainId } from "./addresses";

export const getAddressToAbiMap = (tokenAddress: string) => {
  const { chainId } = useAppKitNetwork();

  if (!chainId) return;

  const numericChainId =
    typeof chainId === "string" ? parseInt(chainId) : chainId;

  const {
    DaiAddress,
    UsdtAddress,
    WethAddress,
    BnbAddress,
    AvalancheAddress,
    ChainlinkAddress,
    PolkadotAddress,
    UsdcAddress,
    PolygonAddress,
  } = getAddressesByChainId(numericChainId);

  return {
    [DaiAddress]: abis.DaiMockAbi,
    [UsdtAddress]: abis.UsdtMockAbi,
    [WethAddress]: abis.WethMockAbi,
    [BnbAddress]: abis.BnbMockAbi,
    [AvalancheAddress]: abis.AvalancheMockAbi,
    [ChainlinkAddress]: abis.ChainlinkMockAbi,
    [PolkadotAddress]: abis.PolkadotMockAbi,
    [UsdcAddress]: abis.UsdcMockAbi,
    [PolygonAddress]: abis.PolygonMockAbi,
  };
};
