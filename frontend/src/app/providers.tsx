'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains'; // add more chains
import { WALLET_CONNECT_PROJECT_ID } from '@/lib/config';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'Cheetos Token DApp',
  projectId: WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  wallets,
  chains: [sepolia], 
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
