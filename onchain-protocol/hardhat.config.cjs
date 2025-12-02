const { enabled } = require("ansi-colors");
const { version } = require("yargs");

require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: {
    compilers: [{ version: "0.5.16" }, { version: "0.6.6" }],
  },
  gasReporter: {
    enabled: false,
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  paths: {
    sources: "./contracts",
  },
};
