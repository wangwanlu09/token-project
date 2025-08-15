'use client';

import { ConnectWallet } from '@/components/ConnectWallet';
import { TokenInfo } from '@/components/TokenInfo';
import { ClaimToken } from '@/components/ClaimToken';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🧀 Cheetos Token
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            领取你的 Cheetos 代币 - 每个地址可领取 10 CHE
          </p>
          <ConnectWallet />
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Token Info */}
          {isConnected && (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                代币信息
              </h2>
              <TokenInfo />
            </div>
          )}

          {/* Claim Section */}
          <div className="max-w-md mx-auto">
            <ClaimToken />
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              使用说明
            </h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start">
                <span className="text-orange-500 font-bold mr-2">1.</span>
                <span>连接你的钱包（MetaMask、WalletConnect等）</span>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 font-bold mr-2">2.</span>
                <span>确保钱包中有至少 0.01 ETH（用于验证和支付Gas费）</span>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 font-bold mr-2">3.</span>
                <span>点击"领取 10 CHE"按钮并确认交易</span>
              </div>
              <div className="flex items-start">
                <span className="text-orange-500 font-bold mr-2">4.</span>
                <span>等待交易确认，代币将自动转入你的钱包</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">重要提醒</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• 每个地址只能领取一次</li>
                <li>• 总共限量 1000 次领取</li>
                <li>• 仅支持 Sepolia 测试网</li>
                <li>• 确保网络设置正确</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm mt-12">
          <p>
            Built with ❤️ using Next.js, Wagmi, Viem & RainbowKit
          </p>
          <p className="mt-1">
            Contract: Cheetos Token on Sepolia Testnet
          </p>
        </footer>
      </div>
    </main>
  );
}