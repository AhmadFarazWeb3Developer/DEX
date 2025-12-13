import UniswapV2Factory from "../../../../onchain-protocol/artifacts/contracts/UniswapV2Factory.sol/UniswapV2Factory.json";
import UniswapV2Pair from "../../../../onchain-protocol/artifacts/contracts/UniswapV2Pair.sol/UniswapV2Pair.json";
import UniswapV2ERC20 from "../../../../onchain-protocol/artifacts/contracts/UniswapV2ERC20.sol/UniswapV2ERC20.json";
import UniswapV2Router02Mock from "../../../../onchain-protocol/artifacts/contracts/mocks/router/UniswapV2Router02Mock.sol/UniswapV2Router02Mock.json";
import DaiMock from "../../../../onchain-protocol/artifacts/contracts/mocks/tokens/DaiMock.sol/DaiMock.json";
import UsdtMock from "../../../../onchain-protocol/artifacts/contracts/mocks/tokens/UsdtMock.sol/UsdtMock.json";
import WethMock from "../../../../onchain-protocol/artifacts/contracts/mocks/tokens/WethMock.sol/WethMock.json";
import BnbMock from "../../../../onchain-protocol/artifacts/contracts/mocks/tokens/BnbMock.sol/BnbMock.json";
import AvalancheMock from "../../../../onchain-protocol/artifacts/contracts/mocks/tokens/AvalancheMock.sol/AvalancheMock.json";
import ChainlinkMock from "../../../../onchain-protocol/artifacts/contracts/mocks/tokens/ChainlinkMock.sol/ChainlinkMock.json";
import PolkadotMock from "../../../../onchain-protocol/artifacts/contracts/mocks/tokens/PolkadotMock.sol/PolkadotMock.json";
import UsdcMock from "../../../../onchain-protocol/artifacts/contracts/mocks/tokens/UsdcMock.sol/UsdcMock.json";
import PolygonMock from "../../../../onchain-protocol/artifacts/contracts/mocks/tokens/PolygonMock.sol/PolygonMock.json";

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

export default abis;
