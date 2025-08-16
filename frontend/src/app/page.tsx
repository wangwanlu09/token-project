'use client';

import { ConnectWallet } from '@/components/ConnectWallet';
import { TokenInfo } from '@/components/TokenInfo';
import { ClaimToken } from '@/components/ClaimToken';
import { useAccount } from 'wagmi';
import { NavBar } from '@/components/NavBar';
import { motion } from 'framer-motion';
import Head from 'next/head';

const BACKGROUND_IMAGE_URL =
  'https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export default function Home() {
  const { isConnected } = useAccount();

  return (
   <div className="relative flex flex-col min-h-screen">
  {/* Navigation bar */}
  <NavBar className="z-10" />

  <main className="relative flex-1 overflow-hidden min-h-screen">
    {/* Animated background image */}
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: 1.1 }}
      transition={{ duration: 20, ease: 'easeOut' }}
      className="absolute inset-0 -z-10"
    >
      <img
        src={BACKGROUND_IMAGE_URL}
        alt="Background"
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/50" />
    </motion.div>

    <div className="container mx-auto px-4 py-8">
      {!isConnected ? (
        // When wallet is not connected: only title is centered
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center pt-20 md:pt-0">
          <h1 className="text-4xl font-bold text-white mb-2">🧀 Cheetos Token</h1>
          <p className="text-lg text-white mb-6">
            Claim your Cheetos tokens – each address can claim 10 CHE!
          </p>
          <ConnectWallet />
        </div>
      ) : (
        // When wallet is connected: all content is centered
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center space-y-8 pt-20 md:pt-0">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">🧀 Cheetos Token</h1>
            <p className="text-lg text-white mb-6">
              Claim your Cheetos tokens – each address can claim 10 CHE!
            </p>
            <ConnectWallet />
          </div>
          
          <div className="max-w-6xl w-full space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Token Information</h2>
              <TokenInfo />
            </div>
            <div className="max-w-md mx-auto">
              <ClaimToken />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-gray-300 text-sm mt-8">
        <p>Welcome! Claim your Cheetos tokens 🧀 </p>
        <p className="mt-1">Contract: Cheetos Token on Sepolia Testnet</p>
      </footer>
    </div>
  </main>
</div>

  );
}