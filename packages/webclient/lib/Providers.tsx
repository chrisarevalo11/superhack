"use client";

import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { celoAlfajores, celo } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const config = getDefaultConfig({
  appName: "EasyFarm",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "",
  chains: [celoAlfajores, celo],
  ssr: true,
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={lightTheme({
            accentColor: "#08a045",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
