import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers.js";

import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs.js";
import { expect } from "chai";

import UtilsTest from "./Utils.test.js";

describe("UniswapV2FactoryTest", function () {
  async function deployUniswapV2FactoryFixture() {
    const { factory, factoryOwner } = UtilsTest();
    return { factory, factoryOwner };
  }

  describe("Deployment", function () {
    it("Should set factory owner", async function () {
      const { factory, factoryOwner } = await loadFixture(
        deployUniswapV2FactoryFixture
      );
    });
  });
});
