'use client';

import { useCheetosContract } from '@/hooks/useContract';
import { formatTokens } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

export function TokenInfo() {
  // Use unified contract hook
  const { 
    maxTotalSupply, 
    claimCount, 
    remainingClaims, 
    maxClaims, 
    claimAmount 
  } = useCheetosContract();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Total Supply
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {maxTotalSupply ? formatTokens(maxTotalSupply) : '0'} CHE
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Claims Made
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
            Remaining Claims
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
            Claim Amount
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
