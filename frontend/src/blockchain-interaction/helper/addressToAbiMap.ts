import addresses from "./addresses";
import abis from "./abis";

const addressToAbiMap = {
  [addresses.DaiAddress]: abis.DaiMockAbi,
  [addresses.UsdtAddress]: abis.UsdtMockAbi,
  [addresses.WethAddress]: abis.WethMockAbi,
  [addresses.BnbAddress]: abis.BnbMockAbi,
  [addresses.AvalancheAddress]: abis.AvalancheMockAbi,
  [addresses.ChainlinkAddress]: abis.ChainlinkMockAbi,
  [addresses.PolkadotAddress]: abis.PolkadotMockAbi,
  [addresses.UsdcAddress]: abis.UsdcMockAbi,
  [addresses.PolygonAddress]: abis.PolygonMockAbi,
};

export default addressToAbiMap;
