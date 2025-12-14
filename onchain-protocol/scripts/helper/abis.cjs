// import UniswapV2Factory = "../../artifacts/contracts/UniswapV2Factory.sol/UniswapV2Factory.json";
// import UniswapV2Pair from "../../artifacts/contracts/UniswapV2Pair.sol/UniswapV2Pair.json";
// import UniswapV2ERC20 from "../../artifacts/contracts/UniswapV2ERC20.sol/UniswapV2ERC20.json";
// import UniswapV2Router02Mock from "../../artifacts/contracts/mocks/router/UniswapV2Router02Mock.sol/UniswapV2Router02Mock.json";

// import DaiMock from "../../artifacts/contracts/mocks/tokens/DaiMock.sol/DaiMock.json";
// import UsdtMock from "../../artifacts/contracts/mocks/tokens/UsdtMock.sol/UsdtMock.json";
// import WethMock from "../../artifacts/contracts/mocks/tokens/WethMock.sol/WethMock.json";
// import BnbMock from "../../artifacts/contracts/mocks/tokens/BnbMock.sol/BnbMock.json";
// import AvalancheMock from "../../artifacts/contracts/mocks/tokens/AvalancheMock.sol/AvalancheMock.json";
// import ChainlinkMock from "../../artifacts/contracts/mocks/tokens/ChainlinkMock.sol/ChainlinkMock.json";
// import PolkadotMock from "../../artifacts/contracts/mocks/tokens/PolkadotMock.sol/PolkadotMock.json";
// import UsdcMock from "../../artifacts/contracts/mocks/tokens/UsdcMock.sol/UsdcMock.json";
// import PolygonMock from "../../artifacts/contracts/mocks/tokens/PolygonMock.sol/PolygonMock.json";

const UniswapV2Factory = require("../../artifacts/contracts/UniswapV2Factory.sol/UniswapV2Factory.json");
const UniswapV2Pair = require("../../artifacts/contracts/UniswapV2Pair.sol/UniswapV2Pair.json");
const UniswapV2ERC20 = require("../../artifacts/contracts/UniswapV2ERC20.sol/UniswapV2ERC20.json");
const UniswapV2Router02Mock = require("../../artifacts/contracts/mocks/router/UniswapV2Router02Mock.sol/UniswapV2Router02Mock.json");

const DaiMock = require("../../artifacts/contracts/mocks/tokens/DaiMock.sol/DaiMock.json");
const UsdtMock = require("../../artifacts/contracts/mocks/tokens/UsdtMock.sol/UsdtMock.json");
const WethMock = require("../../artifacts/contracts/mocks/tokens/WethMock.sol/WethMock.json");
const BnbMock = require("../../artifacts/contracts/mocks/tokens/BnbMock.sol/BnbMock.json");
const AvalancheMock = require("../../artifacts/contracts/mocks/tokens/AvalancheMock.sol/AvalancheMock.json");
const ChainlinkMock = require("../../artifacts/contracts/mocks/tokens/ChainlinkMock.sol/ChainlinkMock.json");
const PolkadotMock = require("../../artifacts/contracts/mocks/tokens/PolkadotMock.sol/PolkadotMock.json");
const UsdcMock = require("../../artifacts/contracts/mocks/tokens/UsdcMock.sol/UsdcMock.json");
const PolygonMock = require("../../artifacts/contracts/mocks/tokens/PolygonMock.sol/PolygonMock.json");

const abis = {
  UniswapV2FactoryAbi: UniswapV2Factory.abi,
  UniswapV2PairAbi: UniswapV2Pair.abi,
  UniswapV2ERC20Abi: UniswapV2ERC20.abi,

  UniswapV2Router02MockAbi: UniswapV2Router02Mock.abi,

  DaiMockAbi: DaiMock.abi,
  UsdtMockAbi: UsdtMock.abi,
  WethMockAbi: WethMock.abi,
  BnbMockAbi: BnbMock.abi,
  AvalancheMockAbi: AvalancheMock.abi,
  ChainlinkMockAbi: ChainlinkMock.abi,
  PolkadotMockAbi: PolkadotMock.abi,
  UsdcMockAbi: UsdcMock.abi,
  PolygonMockAbi: PolygonMock.abi,
};
module.exports = abis;
