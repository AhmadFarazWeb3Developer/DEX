import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Wallet, ChevronDown } from "lucide-react";

import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
  useAppKitNetwork,
  useAppKitState,
} from "@reown/appkit/react";
import getChainName from "../blockchain-interaction/helper/getChainName";
import { getNetworkToken } from "../blockchain-interaction/helper/getNetworkToken";
import readInstances from "../blockchain-interaction/helper/readInstances";
import useReadInstances from "../blockchain-interaction/helper/readInstances";

const ConnectButton = () => {
  const { open, close } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { caipNetwork, chainId } = useAppKitNetwork();
  const { walletProvider } = useAppKitProvider("eip155");
  const { open: isModalOpen } = useAppKitState();

  const [balance, setBalance] = useState("0.00");
  const [nativeToken, setNativeToken] = useState({
    symbol: "ETH",
    name: "Ether",
  });
  const [previousChainId, setPreviousChainId] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { readInstances } = useReadInstances();

  useEffect(() => {
    if (
      previousChainId !== null &&
      previousChainId !== chainId &&
      isModalOpen
    ) {
      close();
    }
    setPreviousChainId(chainId);
  }, [chainId, isModalOpen, close, previousChainId]);

  useEffect(() => {
    if (chainId) {
      const token = getNetworkToken(chainId);
      setNativeToken(token);
    }
  }, [chainId]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (isConnected && address && walletProvider) {
        try {
          const provider = new ethers.BrowserProvider(walletProvider);
          const balanceWei = await provider.getBalance(address);
          const balanceEth = ethers.formatEther(balanceWei);
          setBalance(parseFloat(balanceEth).toFixed(4));
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance("0.00");
        }
      }
    };

    fetchBalance();
  }, [isConnected, address, chainId, walletProvider]);

  useEffect(() => {
    readInstances();
    setImageLoaded(false);
  }, [chainId, caipNetwork]);

  const getNetworkImageUrl = () => {
    if (!chainId) return null;
    const chainName = getChainName(chainId);

    if (chainName) {
      return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/${chainName}/info/logo.png`;
    }

    return null;
  };

  const networkImageUrl = getNetworkImageUrl();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoaded(false);
  };

  return (
    <div className="navbar flex flex-row  justify-between items-center text-white bg-dark-black tracking-wide font-chypre ">
      <div className="flex flex-row items-center gap-3 ">
        {isConnected ? (
          <div className="flex flex-row  items-center gap-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-xl p-1 shadow-lg cursor-pointer">
            <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 rounded-full">
              <div className="rounded-full flex items-center justify-center">
                <Wallet size={18} color="gray" strokeWidth="2px" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-white/60">{balance}</span>
                <span className="text-sm text-white/60">
                  {nativeToken.symbol}
                </span>
              </div>
            </div>

            {caipNetwork && (
              <button
                onClick={() => open({ view: "Networks" })}
                className="flex items-center gap-2 px-3 py-2 hover:bg-action-btn-green rounded-full group cursor-pointer hover:text-black  transition-all hover:scale-105 "
              >
                {networkImageUrl && (
                  <img
                    src={networkImageUrl}
                    alt={caipNetwork.name || "Network"}
                    className=" w-5 h-5 rounded-full ring-2 ring-white/10  group-hover:ring-action-btn-green/50 transition-all object-cover hover:text-black"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ display: imageLoaded ? "block" : "none" }}
                  />
                )}

                {(!networkImageUrl || !imageLoaded) && (
                  <div className=" w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white/10 group-hover:ring-action-btn-green/50 transition-all hover:text-black">
                    {caipNetwork.name?.charAt(0)?.toUpperCase() || "N"}
                  </div>
                )}

                <span className="text-sm   hover:text-black text-white/80 group-hover:text-white transition-colors ">
                  {caipNetwork.name}
                </span>
                <ChevronDown
                  size={14}
                  className="text-white/60  hover:text-black"
                />
              </button>
            )}

            <button
              onClick={() => open({ view: "Account" })}
              className="flex items-center gap-2 px-5 py-2.5 hover:bg-action-btn-green hover:text-black rounded-full font-normal text-white/70 transition-all hover:scale-105 shadow-2xl cursor-pointer"
            >
              <span className="text-sm">
                {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
              </span>
              <ChevronDown size={14} className="opacity-100" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => open()}
            className="bg-[#00C084] text-[#E6E6E6] cursor-pointer text-sm font-semibold 
             rounded-sm py-1 px-4 sm:px-6 sm:text-lg 
             flex flex-row items-center gap-2"
          >
            <Wallet size={18} />
            Connect
            <span className="hidden sm:inline"> Wallet </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectButton;
