import hre from "hardhat";

const { ethers } = hre;

const UtilsTest = async () => {
  const [feeToSetter] = await ethers.getSigners();

  // Getting Contracts
  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");

  const UniswapV2Router02Mock = await ethers.getContractFactory(
    "UniswapV2Router02Mock"
  );

  const DaiMock = await ethers.getContractFactory("DaiMock");
  const UsdtMock = await ethers.getContractFactory("UsdtMock");
  const WethMock = await ethers.getContractFactory("WethMock");

  // Deploying
  const Dai = await DaiMock.deploy();
  const Usdt = await UsdtMock.deploy();

  const Weth = await WethMock.deploy();

  const factory = await UniswapV2Factory.deploy(feeToSetter.address);

  const router = await UniswapV2Router02Mock.deploy(
    factory.target,
    Weth.target
  );

  return { factory, feeToSetter, Dai, Weth, Usdt, router };
};

export default UtilsTest;
