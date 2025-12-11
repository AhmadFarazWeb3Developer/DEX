import { existsSync, mkdirSync, writeFileSync, writeSync } from "fs";
import hre from "hardhat";

const { ethers } = hre;

const deployContract = async () => {
  try {
    const UniswapV2Factory = await ethers.getContractFactory(
      "UniswapV2Factory"
    );
    // const UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair");
    const UniswapV2ERC20 = await ethers.getContractFactory("UniswapV2ERC20");

    const UniswapV2Router02Mock = await ethers.getContractFactory(
      "UniswapV2Router02Mock"
    );

    const DaiMock = await ethers.getContractFactory("DaiMock");
    const UsdtMock = await ethers.getContractFactory("UsdtMock");
    const WethMock = await ethers.getContractFactory("WethMock");
    const BnbMock = await ethers.getContractFactory("BnbMock");
    const AvalancheMock = await ethers.getContractFactory("AvalancheMock");
    const ChainlinkMock = await ethers.getContractFactory("ChainlinkMock");
    const PolkadotMock = await ethers.getContractFactory("PolkadotMock");
    const UsdcMock = await ethers.getContractFactory("UsdcMock");
    const PolygonMock = await ethers.getContractFactory("PolygonMock");

    const INITIAL_SUPPLY = ethers.parseUnits("1000000", 18); // 1M

    const dai = await DaiMock.deploy(INITIAL_SUPPLY);
    await dai.waitForDeployment();

    const usdt = await UsdtMock.deploy(INITIAL_SUPPLY);
    await usdt.waitForDeployment();

    const weth = await WethMock.deploy(INITIAL_SUPPLY);
    await weth.waitForDeployment();

    const avalanche = await AvalancheMock.deploy(INITIAL_SUPPLY);
    await avalanche.waitForDeployment();

    const bnb = await BnbMock.deploy(INITIAL_SUPPLY);
    await bnb.waitForDeployment();

    const chainlink = await ChainlinkMock.deploy(INITIAL_SUPPLY);
    await chainlink.waitForDeployment();

    const polkadot = await PolkadotMock.deploy(INITIAL_SUPPLY);
    await polkadot.waitForDeployment();

    const usdc = await UsdcMock.deploy(INITIAL_SUPPLY);
    await usdc.waitForDeployment();

    const polygon = await PolygonMock.deploy(INITIAL_SUPPLY);
    await polygon.waitForDeployment();

    const factory = await UniswapV2Factory.deploy(
      "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    );
    await factory.waitForDeployment();

    const router = await UniswapV2Router02Mock.deploy(
      factory.target,
      weth.target
    );
    await router.waitForDeployment();

    const uniswapV2ERC20 = await UniswapV2ERC20.deploy();
    await uniswapV2ERC20.waitForDeployment();

    const deployed = {
      UniswapV2FactoryAddress: factory.target,
      UniswapV2Router02MockAddress: router.target,
      UniswapV2ERC20Address: uniswapV2ERC20.target,
      DaiAddress: dai.target,
      UsdtAddress: usdt.target,
      WethAddress: weth.target,
      AvalancheAddress: avalanche.target,
      UsdcAddress: usdc.target,
      ChainlinkAddress: chainlink.target,
      PolkadotAddress: polkadot.target,
      BnbAddress: bnb.target,
      PolygonAddress: polygon.target,
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
