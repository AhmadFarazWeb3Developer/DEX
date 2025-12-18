import Deployments from "../../../../onchain-protocol/deployment/ContractsAddresses.json";

type ChainDeployments = Record<number, any>;

const deployments = Deployments as ChainDeployments;

export const getAddressesByChainId = (chainId: number) => {
  const addresses = deployments[chainId];

  if (!addresses) {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }

  return {
    UniswapV2FactoryAddress: addresses.UniswapV2Factory,
    UniswapV2ERC20Address: addresses.UniswapV2ERC20,
    UniswapV2Router02MockAddress: addresses.UniswapV2Router02Mock,

    DaiAddress: addresses.Dai,
    UsdtAddress: addresses.Usdt,
    WethAddress: addresses.Weth,
    BnbAddress: addresses.Bnb,
    AvalancheAddress: addresses.Avalanche,
    ChainlinkAddress: addresses.Chainlink,
    PolkadotAddress: addresses.Polkadot,
    UsdcAddress: addresses.Usdc,
    PolygonAddress: addresses.Polygon,
  };
};
