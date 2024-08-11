'use client';

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider, http } from 'wagmi';
import { celo, celoAlfajores } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '../components/Layout';
import { WorldIDProvider } from '@/contexts/WorldIDContext';
import { ApiProvider, Web3Provider, strategies } from '@allo-team/kit';
import '@allo-team/kit/styles.css';

const config = getDefaultConfig({
  appName: 'Celo Composer',
  chains: [celo, celoAlfajores],
  projectId:
    process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? '044601f65212332475a09bc14ceb3c34',
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <WorldIDProvider>
            <ApiProvider strategies={strategies}>
              <Web3Provider>
                <Layout>{children}</Layout>
              </Web3Provider>
            </ApiProvider>
          </WorldIDProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
