'use client';

import * as React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
// import { sepolia } from 'wagmi/chains'; // 注释掉真正的Sepolia
import { WALLET_CONNECT_PROJECT_ID } from '@/lib/config';

// 定义本地测试链（模拟Sepolia）
export const localSepolia = {
  id: 11155111,
  name: 'Local Sepolia',
  network: 'local-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
  blockExplorers: {
    default: { name: 'Local Explorer', url: 'http://localhost:8545' },
  },
  testnet: true,
} as const;

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'Cheetos Token DApp',
  projectId: WALLET_CONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  wallets,
  chains: [localSepolia], // 只使用本地网络
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
