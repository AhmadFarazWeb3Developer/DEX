import { Contract } from "ethers";

import { useAppKitNetwork } from "@reown/appkit/react";

import abis from "./abis";
import addresses from "./addresses";
import getSigner from "./getSiger";

const useWriteInstances = () => {
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
  } = addresses;

  const writeInstances = async () => {
    if (!chainId) return;

    const numericChainId =
      typeof chainId === "string" ? parseInt(chainId) : chainId;
    const { signer } = await getSigner(numericChainId);

    // FACTORY & ROUTER
    const uniswapV2FactoryInstance = new Contract(
      UniswapV2FactoryAddress,
      UniswapV2FactoryAbi,
      signer
    );
    const UniswapV2ERC20Instance = new Contract(
      UniswapV2ERC20Address,
      UniswapV2ERC20Abi,
      signer
    );

    const uniswapV2Router02MockInstance = new Contract(
      UniswapV2Router02MockAddress,
      UniswapV2Router02MockAbi,
      signer
    );

    // TOKENS
    const daiMockInstance = new Contract(DaiAddress, DaiMockAbi, signer);
    const usdtMockInstance = new Contract(UsdtAddress, UsdtMockAbi, signer);
    const wethMockInstance = new Contract(WethAddress, WethMockAbi, signer);
    const bnbMockInstance = new Contract(BnbAddress, BnbMockAbi, signer);
    const usdcMockInstance = new Contract(UsdcAddress, UsdcMockAbi, signer);

    const avalancheMockInstance = new Contract(
      AvalancheAddress,
      AvalancheMockAbi,
      signer
    );

    const chainlinkMockInstance = new Contract(
      ChainlinkAddress,
      ChainlinkMockAbi,
      signer
    );

    const polkadotMockInstance = new Contract(
      PolkadotAddress,
      PolkadotMockAbi,
      signer
    );

    return {
      uniswapV2FactoryInstance,
      UniswapV2ERC20Instance,
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

  return { writeInstances };
};

export default useWriteInstances;
