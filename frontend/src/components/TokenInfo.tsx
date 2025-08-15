'use client';

import { useReadContract } from 'wagmi';
import { CHEETOS_CONTRACT } from '@/lib/contracts';
import { formatTokens } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

export function TokenInfo() {
  // 读取合约数据
  const { data: totalSupply } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'totalSupply',
  });

  const { data: claimCount } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'claimCount',
  });

  const { data: remainingClaims } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'remainingClaims',
  });

  const { data: maxClaims } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'MAX_CLAIMS',
  });

  const { data: claimAmount } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'CLAIM_AMOUNT',
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            总供应量
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalSupply ? formatTokens(totalSupply) : '0'} CHE
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            已领取数量
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {claimCount?.toString() || '0'} / {maxClaims?.toString() || '1000'}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            剩余可领取
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {remainingClaims?.toString() || '0'}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            每次领取量
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {claimAmount ? formatTokens(claimAmount) : '10'} CHE
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
