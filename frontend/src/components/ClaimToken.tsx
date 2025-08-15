'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CHEETOS_CONTRACT } from '@/lib/contracts';
import { formatETH, formatTokens, getErrorMessage } from '@/lib/utils';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

export function ClaimToken() {
  const { address, isConnected } = useAccount();
  const [isClaimLoading, setIsClaimLoading] = useState(false);

  // 读取用户状态
  const { data: balance } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const { data: isEligible } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'isEligible',
    args: address ? [address] : undefined,
  });

  const { data: hasClaimed } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'hasClaimed',
    args: address ? [address] : undefined,
  });

  const { data: minETHRequired } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'minETHRequired',
  });

  // 写入合约
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  // 等待交易确认
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleClaim = async () => {
    if (!isConnected || !address) {
      alert('请先连接钱包');
      return;
    }

    try {
      setIsClaimLoading(true);
      writeContract({
        ...CHEETOS_CONTRACT,
        functionName: 'claim',
      });
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
    return (
      <Card>
        <CardHeader>
          <CardTitle>领取 Cheetos 代币</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">请先连接您的钱包以领取代币</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>领取 Cheetos 代币</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 用户状态信息 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">ETH 余额要求:</span>
            <span className="text-sm">
              ≥ {minETHRequired ? formatETH(minETHRequired) : '0.01'} ETH
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">是否符合条件:</span>
            <span className={`text-sm ${isEligible ? 'text-green-600' : 'text-red-600'}`}>
              {isEligible ? '✅ 符合' : '❌ 不符合'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">是否已领取:</span>
            <span className={`text-sm ${hasClaimed ? 'text-orange-600' : 'text-green-600'}`}>
              {hasClaimed ? '已领取' : '未领取'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">当前代币余额:</span>
            <span className="text-sm font-medium">
              {balance ? formatTokens(balance) : '0'} CHE
            </span>
          </div>
        </div>

        {/* 交易状态 */}
        {hash && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              交易已提交: <code className="text-xs">{hash.slice(0, 20)}...</code>
            </p>
            {isConfirming && (
              <p className="text-sm text-blue-600 mt-1">等待确认中...</p>
            )}
            {isSuccess && (
              <p className="text-sm text-green-600 mt-1">✅ 领取成功！</p>
            )}
          </div>
        )}

        {/* 错误信息 */}
        {error && (
          <div className="p-3 bg-red-50 rounded-lg">
            <p className="text-sm text-red-800">
              {getErrorMessage(error)}
            </p>
          </div>
        )}

        {/* 领取按钮 */}
        <Button
          onClick={handleClaim}
          disabled={!canClaim || isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              {isPending ? '确认交易...' : isConfirming ? '等待确认...' : '处理中...'}
            </>
          ) : hasClaimed ? (
            '已领取'
          ) : !isEligible ? (
            'ETH余额不足'
          ) : (
            '领取 10 CHE'
          )}
        </Button>

        {/* 提示信息 */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• 每个地址只能领取一次</p>
          <p>• 需要至少 0.01 ETH 余额</p>
          <p>• 每次可领取 10 CHE 代币</p>
          <p>• 总共限量 1000 次领取</p>
        </div>
      </CardContent>
    </Card>
  );
}
