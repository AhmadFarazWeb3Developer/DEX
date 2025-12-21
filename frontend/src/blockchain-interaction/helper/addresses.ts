import Deployments from "../../../../onchain-protocol/deployment/ContractsAddresses.json";

type ChainDeployments = Record<number, any>;

const deployments = Deployments as ChainDeployments;

export const getAddressesByChainId = (chainId: number) => {
  const addresses = deployments[chainId];

  console.log("chain id : ", chainId);
  console.log("addresses : ", addresses);

  if (!addresses) {
    throw new Error(`Unsupported chainId: ${chainId}`);
  }

  return {
    UniswapV2FactoryAddress: addresses.UniswapV2FactoryAddress,
    UniswapV2ERC20Address: addresses.UniswapV2ERC20Address,
    UniswapV2Router02MockAddress: addresses.UniswapV2Router02MockAddress,

    DaiAddress: addresses.DaiAddress,
    UsdtAddress: addresses.UsdtAddress,
    WethAddress: addresses.WethAddress,
    BnbAddress: addresses.BnbAddress,
    AvalancheAddress: addresses.AvalancheAddress,
    ChainlinkAddress: addresses.ChainlinkAddress,
    PolkadotAddress: addresses.PolkadotAddress,
    UsdcAddress: addresses.UsdcAddress,
    PolygonAddress: addresses.PolygonAddress,
  };
};
