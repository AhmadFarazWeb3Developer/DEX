import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers.js";



import UtilsTest from "./Utils.test.js";

describe("UniswapV2Router02", () => {
  const deployUniswapV2Router02Fixture = async () => {
    const { factory, feeToSetter, Dai, Usdt, router } = await UtilsTest();
    return { factory, feeToSetter, Dai, Usdt, router };
  };

  describe("Router Interaction", function () {
    let factory, feeToSetter, Dai, Usdt, router;
    beforeEach(async () => {
      ({ factory, feeToSetter, Dai, Usdt, router } = await loadFixture(
        deployUniswapV2Router02Fixture
      ));
    });

    it("Should add my liquidity", async () => {
      const [myAddress] = await ethers.getSigners();
      const liquidityAmount = ethers.parseUnits("10", 18); // 10 tokens

      await Dai.transferTokens(myAddress, liquidityAmount);
      await Usdt.transferTokens(myAddress, liquidityAmount);

      // Approve router
      await Dai.connect(myAddress).approve(router.target, liquidityAmount);
      await Usdt.connect(myAddress).approve(router.target, liquidityAmount);

      // MINIMUM_LIQUIDITY = 1000 LP tokens

      const tx = await router.addLiquidity(
        Dai.target,
        Usdt.target,
        liquidityAmount,
        liquidityAmount,
        0,
        0,
        myAddress,
        0
      );

     
      const myPairAddress = await factory.getPair(Dai.target, Usdt.target);

      const UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair");
      const pair = UniswapV2Pair.attach(myPairAddress);

      console.log(await pair.balanceOf(myAddress.address));
    });

    it("Should remove my liquidity", async () => {
      const [myAddress] = await ethers.getSigners();
      const liquidityAmount = ethers.parseUnits("10", 18); // 10 tokens

      await Dai.transferTokens(myAddress, liquidityAmount);
      await Usdt.transferTokens(myAddress, liquidityAmount);

      // Approve router
      await Dai.connect(myAddress).approve(router.target, liquidityAmount);
      await Usdt.connect(myAddress).approve(router.target, liquidityAmount);

      // MINIMUM_LIQUIDITY = 1000 LP tokens

      await router.addLiquidity(
        Dai.target,
        Usdt.target,
        liquidityAmount,
        liquidityAmount,
        0,
        0,
        myAddress,
        0
      );

      const myPairAddress = await factory.getPair(Dai.target, Usdt.target);

      const UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair");
      const pair = UniswapV2Pair.attach(myPairAddress);

      console.log("Before : ", await pair.balanceOf(myAddress.address));

      await pair.connect(myAddress).approve(router.target, liquidityAmount); // approve pool to burn LPs

      const tx = await router.removeLiquidity(
        Dai.target,
        Usdt.target,
        liquidityAmount / 2n, // LP token to burn
        0,
        0,
        myAddress,
        0
      );

      const receipt = await tx.wait();
      for (const log of receipt.logs) {
        try {
          const parsed = pair.interface.parseLog(log);
          console.log("name: ", parsed.name);
          console.log("logs", parsed.args);
        } catch (error) {}
      }
      console.log("After : ", await pair.balanceOf(myAddress.address));
    });

    it("should swap token for another token", async () => {
      const [myAddress] = await ethers.getSigners();
      const bigLiquidity = ethers.parseUnits("1000", 18);

      await Dai.transferTokens(myAddress.address, bigLiquidity);
      await Usdt.transferTokens(myAddress.address, bigLiquidity);

      await Dai.connect(myAddress).approve(router.target, bigLiquidity);
      await Usdt.connect(myAddress).approve(router.target, bigLiquidity);

      // First Add Liquidity
      await router.addLiquidity(
        Dai.target,
        Usdt.target,
        bigLiquidity,
        bigLiquidity,
        0,
        0,
        myAddress.address,
        0
      );

      const swapAmount = ethers.parseUnits("10", 18);

      await Dai.transferTokens(myAddress.address, swapAmount);
      await Dai.connect(myAddress).approve(router.target, swapAmount);

      console.log("Dai before:", await Dai.balanceOf(myAddress.address));
      console.log("Usdt before:", await Usdt.balanceOf(myAddress.address));

      await router.swapExactTokensForTokens(
        swapAmount,
        0,
        [Dai.target, Usdt.target],
        myAddress.address,
        0
      );

      console.log("Dai after:", await Dai.balanceOf(myAddress.address));
      console.log("Usdt after:", await Usdt.balanceOf(myAddress.address));
    });



    
  });
});
