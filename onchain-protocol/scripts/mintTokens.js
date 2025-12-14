import hre from "hardhat";
const { ethers } = hre;

import abis from "./helper/abis.cjs";
import addresses from "./helper/addresses.cjs";

async function main() {
  const [signer] = await ethers.getSigners(); // signer

  const tokens = [
    "Dai",
    "Usdt",
    "Weth",
    "Bnb",
    "Avalanche",
    "Chainlink",
    "Polkadot",
    "Usdc",
    "Polygon",
  ];

  const instances = {};

  tokens.forEach((token) => {
    const addressKey = `${token}Address`;
    const abiKey = `${token}MockAbi`;

    const address = addresses[addressKey];
    const abi = abis[abiKey];

    if (!address || !abi) {
      console.warn(`Skipping ${token}: missing address or ABI`);
      return;
    }

    instances[`${token.toLowerCase()}MockInstance`] = new ethers.Contract(
      address,
      abi,
      signer
    );
  });

  const to = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
  const tokensAmount = ethers.parseUnits("1000", 18);
  const routerAddress = addresses.UniswapV2Router02MockAddress;

  for (const [key, tokenInstance] of Object.entries(instances)) {
    console.log(
      `Transferring ${tokensAmount.toString()} of ${key} to ${to}...`
    );
    const tx = await tokenInstance.transferTokens(to, tokensAmount);
    await tx.wait();
    console.log(`${key} transferred successfully`);
  }

  // Approving the router for each token before sending liquidity
  for (const [key, tokenInstance] of Object.entries(instances)) {
    console.log(`Approving ${key} for router...`);
    const approveTx = await tokenInstance.approve(routerAddress, tokensAmount);
    await approveTx.wait();
    console.log(`${key} approved successfully`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
