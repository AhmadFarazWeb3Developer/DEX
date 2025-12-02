import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers.js";

import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs.js";
import { expect } from "chai";

import UtilsTest from "./Utils.test.js";

describe("UniswapV2FactoryTest", function () {
  const deployUniswapV2FactoryFixture = async () => {
    const { factory, feeToSetter, Dai, Usdt } = await UtilsTest();
    return { factory, feeToSetter, Dai, Usdt };
  };

  describe("Factory Interaction", function () {
    let factory, feeToSetter, Dai, Usdt;
    beforeEach(async () => {
      ({ factory, feeToSetter, Dai, Usdt } = await loadFixture(
        deployUniswapV2FactoryFixture
      ));
    });

    it("Should set factory owner", async () => {
      expect(await factory.feeToSetter()).to.be.eq(feeToSetter.address);
    });

    it("Factory should create a pair", async () => {
      // only factory can createPair
      const createPairTx = await factory.createPair(Dai.target, Usdt.target);
      expect(await factory.allPairsLength()).to.be.eq(1);
    });

    it("Should create pair for me", async () => {
      const tx = await factory.createPair(Dai.target, Usdt.target);
      const receipt = await tx.wait();
      let pairAddress;

      for (const log of receipt.logs) {
        try {
          const parsed = factory.interface.parseLog(log); // give event name and args
          pairAddress = parsed.args[2];
        } catch (err) {}
      }

      expect(await factory.getPair(Dai.target, Usdt.target)).is.be.eq(
        pairAddress
      );
    });
  });
});
