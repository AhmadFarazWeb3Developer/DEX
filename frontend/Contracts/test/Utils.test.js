import { ethers } from "ethers";

const UtilsTest = async () => {
  const [factoryOwner] = await ethers.getSigners();

  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const pair = await ethers.getContractFactory("UniswapV2Pair");

  const factory = UniswapV2Factory.deploy(factoryOwner);

  return { factory, factoryOwner };
};

export default UtilsTest;
