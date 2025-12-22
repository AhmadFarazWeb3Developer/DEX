const ContractsAddresses = require("../../deployment/ContractsAddresses.json");

const contractsAddresses = ContractsAddresses[31337];

const addresses = {
  UniswapV2FactoryAddress: contractsAddresses.UniswapV2FactoryAddress,
  UniswapV2ERC20Address: contractsAddresses.UniswapV2ERC20Address,
  UniswapV2Router02MockAddress: contractsAddresses.UniswapV2Router02MockAddress,

  DaiAddress: contractsAddresses.DaiAddress,
  UsdtAddress: contractsAddresses.UsdtAddress,
  WethAddress: contractsAddresses.WethAddress,
  BnbAddress: contractsAddresses.BnbAddress,
  AvalancheAddress: contractsAddresses.AvalancheAddress,
  ChainlinkAddress: contractsAddresses.ChainlinkAddress,
  PolkadotAddress: contractsAddresses.PolkadotAddress,
  UsdcAddress: contractsAddresses.UsdcAddress,
  PolygonAddress: contractsAddresses.PolygonAddress,
};

module.exports = addresses;
