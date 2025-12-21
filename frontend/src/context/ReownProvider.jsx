import { AppKitProvider, createAppKit } from "@reown/appkit/react";

import {
  hardhat,
  polygonAmoy,
  bscTestnet,
  arbitrumSepolia,
  avalancheFuji,
  optimismSepolia,
  mainnet,
  polygon,
  zksync,
  avalanche,
  arbitrum,
} from "@reown/appkit/networks";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";

const projectId = import.meta.env.VITE_CONNECT_PROJECT_ID;

createAppKit({
  autoConnect: false,
  adapters: [new EthersAdapter()],
  networks: [
    hardhat,
    mainnet,
    polygon,
    zksync,
    avalanche,
    arbitrum,
    optimismSepolia,
    polygonAmoy,
    bscTestnet,
    arbitrumSepolia,
    avalancheFuji,
  ], //   add any network here, harhdat , polygonAmoy, bscTestnet, arbitrumSepolia, avalancheFuji
  projectId,
  features: {
    analytics: true,
  },
});

const ReownProvider = ({ children }) => {
  return <AppKitProvider>{children}</AppKitProvider>;
};

export default ReownProvider;
