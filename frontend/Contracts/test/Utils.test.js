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

  const INITIAL_SUPPLY = ethers.parseUnits("1000000", 18); // 1M
  const Dai = await DaiMock.deploy(INITIAL_SUPPLY);
  const Usdt = await UsdtMock.deploy(INITIAL_SUPPLY);
  const Weth = await WethMock.deploy(INITIAL_SUPPLY);

  const factory = await UniswapV2Factory.deploy(feeToSetter.address);

  const router = await UniswapV2Router02Mock.deploy(
    factory.target,
    Weth.target
  );

  return { factory, feeToSetter, Dai, Weth, Usdt, router };
};

export default UtilsTest;
