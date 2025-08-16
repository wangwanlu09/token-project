'use client';

import { useState } from 'react';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useCheetosContract, useUserContract, useClaimContract } from '@/hooks/useContract';
import { formatETH, formatTokens, getErrorMessage } from '@/lib/utils';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

export function ClaimToken() {
  const { address, isConnected } = useAccount();
  const [isClaimLoading, setIsClaimLoading] = useState(false);

  // 使用统一的合约hooks
  const { minETHRequired } = useCheetosContract();
  const { balance, isEligible, hasClaimed } = useUserContract(address);
  const { claim, hash, error, isPending } = useClaimContract();

  // 等待交易确认
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleClaim = async () => {
    if (!isConnected || !address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setIsClaimLoading(true);
      claim(); // 使用hook中的claim函数
    } catch (err) {
      console.error('Claim error:', err);
    } finally {
      setIsClaimLoading(false);
    }
  };

  // 状态判断
  const canClaim = isConnected && isEligible && !hasClaimed;
  const isProcessing = isPending || isConfirming || isClaimLoading;

  if (!isConnected) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim Cheetos Tokens</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* User status information */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">ETH Balance Required:</span>
            <span className="text-sm">
              ≥ {minETHRequired ? formatETH(minETHRequired) : '0.01'} ETH
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Eligible:</span>
            <span className={`text-sm ${isEligible ? 'text-green-600' : 'text-red-600'}`}>
              {isEligible ? '✅ Yes' : '❌ No'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Already Claimed:</span>
            <span className={`text-sm ${hasClaimed ? 'text-orange-600' : 'text-green-600'}`}>
              {hasClaimed ? 'Yes' : 'No'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Current Token Balance:</span>
            <span className="text-sm font-medium">
              {balance ? formatTokens(balance) : '0'} CHE
            </span>
          </div>
        </div>

        {/* Transaction status */}
        {hash && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Transaction submitted: <code className="text-xs">{hash.slice(0, 20)}...</code>
            </p>
            {isConfirming && (
              <p className="text-sm text-blue-600 mt-1">Waiting for confirmation...</p>
            )}
            {isSuccess && (
              <p className="text-sm text-green-600 mt-1">✅ Claim successful!</p>
            )}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              {getErrorMessage(error)}
            </p>
          </div>
        )}

        {/* Claim button */}
        <Button
          onClick={handleClaim}
          disabled={!canClaim || isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              {isPending ? 'Confirming transaction...' : isConfirming ? 'Waiting for confirmation...' : 'Processing...'}
            </>
          ) : hasClaimed ? (
            'Already Claimed'
          ) : !isEligible ? (
            'Insufficient ETH Balance'
          ) : (
            'Claim 10 CHE'
          )}
        </Button>

        {/* Tips */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• Each address can only claim once</p>
          <p>• Requires at least 0.01 ETH balance</p>
          <p>• Claim 10 CHE tokens per address</p>
          <p>• Limited to 1000 total claims</p>
        </div>
      </CardContent>
    </Card>
  );
}
