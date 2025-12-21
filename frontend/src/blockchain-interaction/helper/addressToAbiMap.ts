import abis from "./abis";
import { getAddressesByChainId } from "./addresses";
import { InterfaceAbi } from "ethers";

export const getAddressToAbiMap = (
  chainId: number
): Record<string, InterfaceAbi> => {
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
  } = getAddressesByChainId(chainId);

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
