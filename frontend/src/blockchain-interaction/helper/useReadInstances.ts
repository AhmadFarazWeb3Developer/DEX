import { Contract } from "ethers";

import { useAppKitNetwork } from "@reown/appkit/react";
import getProvider from "./getProvider";

import abis from "./abis";
import addresses from "./addresses";

const useReadInstances = () => {
  const { chainId } = useAppKitNetwork();

  const {
    UniswapV2FactoryAbi,
    UniswapV2Router02MockAbi,

    DaiMockAbi,
    UsdtMockAbi,
    WethMockAbi,
    BnbMockAbi,
    AvalancheMockAbi,
    ChainlinkMockAbi,
    PolkadotMockAbi,
    UsdcMockAbi,
  } = abis;

  const {
    UniswapV2FactoryAddress,
    UniswapV2Router02MockAddress,
    DaiAddress,
    UsdtAddress,
    WethAddress,
    BnbAddress,
    AvalancheAddress,
    ChainlinkAddress,
    PolkadotAddress,
    UsdcAddress,
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

    return {
      uniswapV2FactoryInstance,
      uniswapV2Router02MockInstance,

      daiMockInstance,
      usdtMockInstance,
      wethMockInstance,
      bnbMockInstance,
      avalancheMockInstance,
      chainlinkMockInstance,
      polkadotMockInstance,
      usdcMockInstance,
    };
  };

  return { readInstances };
};

export default useReadInstances;
