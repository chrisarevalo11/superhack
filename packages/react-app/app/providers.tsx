'use client'

import { RainbowKitProvider, connectorsForWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import { injectedWallet } from '@rainbow-me/rainbowkit/wallets'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { celo, celoAlfajores } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from '../components/Layout'
import { WorldIDProvider } from '@/contexts/WorldIDContext'


const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [injectedWallet],
    },
  ],
  {
    appName: 'Celo Composer',
    projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? '044601f65212332475a09bc14ceb3c34',
  }
)

const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
  },
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <WorldIDProvider>
            <Layout>
              {children}
            </Layout>
          </WorldIDProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}