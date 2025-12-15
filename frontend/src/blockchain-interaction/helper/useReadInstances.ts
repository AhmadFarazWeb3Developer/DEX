import { Contract } from "ethers";

import { useAppKitNetwork } from "@reown/appkit/react";
import getProvider from "./getProvider";

import abis from "./abis";
import addresses from "./addresses";

const useReadInstances = () => {
  const { chainId } = useAppKitNetwork();

  const {
    UniswapV2FactoryAbi,
    UniswapV2ERC20Abi,
    UniswapV2Router02MockAbi,

    DaiMockAbi,
    UsdtMockAbi,
    WethMockAbi,
    BnbMockAbi,
    AvalancheMockAbi,
    ChainlinkMockAbi,
    PolkadotMockAbi,
    UsdcMockAbi,
    PolygonMockAbi,
  } = abis;

  const {
    UniswapV2FactoryAddress,
    UniswapV2ERC20Address,
    UniswapV2Router02MockAddress,
    DaiAddress,
    UsdtAddress,
    WethAddress,
    BnbAddress,
    AvalancheAddress,
    ChainlinkAddress,
    PolkadotAddress,
    UsdcAddress,
    PolygonAddress,
  } = addresses;

  const readInstances = async () => {
    if (!chainId) return;

    const numericChainId =
      typeof chainId === "string" ? parseInt(chainId) : chainId;
    const provider = await getProvider(numericChainId);

    // FACTORY & ROUTER
    const uniswapV2FactoryInstance = new Contract(
      UniswapV2FactoryAddress,
      UniswapV2FactoryAbi,
      provider
    );
    const uniswapV2ERC20Instance = new Contract(
      UniswapV2ERC20Address,
      UniswapV2ERC20Abi,
      provider
    );

    const uniswapV2Router02MockInstance = new Contract(
      UniswapV2Router02MockAddress,
      UniswapV2Router02MockAbi,
      provider
    );

    // TOKENS
    const daiMockInstance = new Contract(DaiAddress, DaiMockAbi, provider);
    const usdtMockInstance = new Contract(UsdtAddress, UsdtMockAbi, provider);
    const wethMockInstance = new Contract(WethAddress, WethMockAbi, provider);
    const bnbMockInstance = new Contract(BnbAddress, BnbMockAbi, provider);
    const usdcMockInstance = new Contract(UsdcAddress, UsdcMockAbi, provider);

    const avalancheMockInstance = new Contract(
      AvalancheAddress,
      AvalancheMockAbi,
      provider
    );

    const chainlinkMockInstance = new Contract(
      ChainlinkAddress,
      ChainlinkMockAbi,
      provider
    );

    const polkadotMockInstance = new Contract(
      PolkadotAddress,
      PolkadotMockAbi,
      provider
    );
    const polygonMockInstance = new Contract(
      PolygonAddress,
      PolygonMockAbi,
      provider
    );

    return {
      uniswapV2FactoryInstance,
      uniswapV2ERC20Instance,
      uniswapV2Router02MockInstance,

      daiMockInstance,
      usdtMockInstance,
      wethMockInstance,
      bnbMockInstance,
      avalancheMockInstance,
      chainlinkMockInstance,
      polkadotMockInstance,
      usdcMockInstance,
      polygonMockInstance,
    };
  };

  return { readInstances };
};

export default useReadInstances;
