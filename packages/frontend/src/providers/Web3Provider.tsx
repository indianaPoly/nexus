import React from "react";

import { WagmiProvider, createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = createConfig(
  getDefaultConfig({
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(
        `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`
      ),
    },
    walletConnectProjectId: import.meta.env.VITE_PROJECT_ID,
    appName: "nexus",
  })
);

interface Prop {
  children: React.ReactNode;
}

export const Web3Provider: React.FC<Prop> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
