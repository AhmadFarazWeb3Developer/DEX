// import ContractsAddresses from "../../deployment/ContractsAddresses.json";

const ContractsAddresses = require("../../deployment/ContractsAddresses.json");

const addresses = {
  UniswapV2FactoryAddress: ContractsAddresses.UniswapV2FactoryAddress,
  UniswapV2ERC20Address: ContractsAddresses.UniswapV2ERC20Address,
  UniswapV2Router02MockAddress: ContractsAddresses.UniswapV2Router02MockAddress,

  DaiAddress: ContractsAddresses.DaiAddress,
  UsdtAddress: ContractsAddresses.UsdtAddress,
  WethAddress: ContractsAddresses.WethAddress,
  BnbAddress: ContractsAddresses.BnbAddress,
  AvalancheAddress: ContractsAddresses.AvalancheAddress,
  ChainlinkAddress: ContractsAddresses.ChainlinkAddress,
  PolkadotAddress: ContractsAddresses.PolkadotAddress,
  UsdcAddress: ContractsAddresses.UsdcAddress,
  PolygonAddress: ContractsAddresses.PolygonAddress,
};

module.exports = addresses;
