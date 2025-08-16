'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

export function ConnectWallet() {
  const { isConnected } = useAccount();

  return (
    <div className="flex justify-center">
      <div className={isConnected ? "" : "[&_button]:!bg-orange-600 [&_button]:!text-white [&_button]:!shadow [&_button]:!hover:bg-orange-700 [&_button]:!border-orange-600 [&_button]:!rounded-md [&_button]:!px-6 [&_button]:!py-2 [&_button]:!font-medium [&_button]:!transition-colors"}>
        <ConnectButton 
          chainStatus="icon"
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
        />
      </div>
    </div>
  );
}

