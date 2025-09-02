import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers.js";

import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs.js";
import { expect } from "chai";

import UtilsTest from "./Utils.test.js";

describe("UniswapV2Router02", () => {
  const deployUniswapV2Router02Fixture = async () => {
    const { factory, feeToSetter, Dai, Usdt, router } = await UtilsTest();
    return { factory, feeToSetter, Dai, Usdt, router };
  };

  describe("Router Interaction", function () {
    let factory, feeToSetter, Dai, Usdt;
    beforeEach(async () => {
      ({ factory, feeToSetter, Dai, Usdt, router } = await loadFixture(
        deployUniswapV2Router02Fixture
      ));
    });

    it("Should create pair for me", async () => {
      const { myAddress } = await ethers.getSigners();

      router.addLiquidity(Dai, Usdt, 10, 10, 2, 2, myAddress, 1000);
    });
  });
});
