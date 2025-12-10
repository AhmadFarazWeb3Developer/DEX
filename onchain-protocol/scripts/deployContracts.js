import { existsSync, mkdirSync, writeFileSync, writeSync } from "fs";
import hre from "hardhat";

const { ethers } = hre;

const deployContract = async () => {
  try {
    const UniswapV2Factory = await ethers.getContractFactory(
      "UniswapV2Factory"
    );

    const UniswapV2Router02Mock = await ethers.getContractFactory(
      "UniswapV2Router02Mock"
    );

    const DaiMock = await ethers.getContractFactory("DaiMock");
    const UsdtMock = await ethers.getContractFactory("UsdtMock");
    const WethMock = await ethers.getContractFactory("WethMock");

    const INITIAL_SUPPLY = ethers.parseUnits("1000000", 18); // 1M
    const Dai = await DaiMock.deploy(INITIAL_SUPPLY);
    await Dai.waitForDeployment();
    const Usdt = await UsdtMock.deploy(INITIAL_SUPPLY);
    await Usdt.waitForDeployment();
    const Weth = await WethMock.deploy(INITIAL_SUPPLY);
    await Weth.waitForDeployment();

    const factory = await UniswapV2Factory.deploy(
      "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    );

    await factory.waitForDeployment();

    const router = await UniswapV2Router02Mock.deploy(
      factory.target,
      Weth.target
    );
    await router.waitForDeployment();

    const deployed = {
      UniswapV2FactoryAddress: factory.target,
      UniswapV2Router02MockAddress: router.target,
      DaiAddress: Dai.target,
      UsdtAddress: Usdt.target,
      WethAddress: Weth.target,
    };

    const deploymentFolder = "./deployment";

    if (!existsSync(deploymentFolder)) {
      mkdirSync(deploymentFolder, { recursive: true });
      console.log(`Created folder: ${deploymentFolder}`);
    }

    writeFileSync(
      `${deploymentFolder}/ContractsAddresses.json`,
      JSON.stringify(deployed, null, 2)
    );

    console.log("Contracts deployed and addresses saved:", deployed);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

deployContract();
