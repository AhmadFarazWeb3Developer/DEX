import ContractsAddresses from "../../../../onchain-protocol/deployment/ContractsAddresses.json";

import UniswapV2Factory from "../../../../onchain-protocol/artifacts/contracts/UniswapV2Factory.sol/UniswapV2Factory.json";
import UniswapV2Router02Mock from "../../../../onchain-protocol/artifacts/contracts/mocks/UniswapV2Router02Mock.sol/UniswapV2Router02Mock.json";
import DaiMock from "../../../../onchain-protocol/artifacts/contracts/mocks/DaiMock.sol/DaiMock.json";
import UsdtMock from "../../../../onchain-protocol/artifacts/contracts/mocks/UsdtMock.sol/UsdtMock.json";
import WethMock from "../../../../onchain-protocol/artifacts/contracts/mocks/WethMock.sol/WethMock.json";
import { useAppKitNetwork } from "@reown/appkit/react";
import getProvider from "./getProvider";

import { Contract } from "ethers";

const useReadInstances = () => {
  const { chainId } = useAppKitNetwork();
  const readInstances = async () => {
    const provider = await getProvider(chainId);

    const uniswapV2FactoryIntance = new Contract(
      ContractsAddresses.UniswapV2FactoryAddress,
      UniswapV2Factory.abi,
      provider
    );

    const uniswapV2Router02MockInstance = new Contract(
      ContractsAddresses.UniswapV2Router02MockAddress,
      UniswapV2Router02Mock.abi,
      provider
    );

    const usdtMockInstance = new Contract(
      ContractsAddresses.DaiAddress,
      DaiMock.abi,
      provider
    );

    const daiMockInstance = new Contract(
      ContractsAddresses.UsdtAddress,
      UsdtMock.abi,
      provider
    );
    const wethMockInstance = new Contract(
      ContractsAddresses.WethAddress,
      WethMock.abi,
      provider
    );

    return {
      uniswapV2FactoryIntance,
      uniswapV2Router02MockInstance,
      daiMockInstance,
      usdtMockInstance,
      wethMockInstance,
    };
  };

  return { readInstances };
};

export default useReadInstances;
