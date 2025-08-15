import { useReadContract, useWriteContract } from 'wagmi';
import { CHEETOS_CONTRACT } from '@/lib/contracts';

// 读取合约数据的hooks
export function useCheetosContract() {
  const { data: name } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'name',
  });

  const { data: symbol } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'symbol',
  });

  const { data: totalSupply } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'totalSupply',
  });

  const { data: maxTotalSupply } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'maxTotalSupply',
  });

  const { data: claimAmount } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'CLAIM_AMOUNT',
  });

  const { data: maxClaims } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'MAX_CLAIMS',
  });

  const { data: claimCount } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'claimCount',
  });

  const { data: remainingClaims } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'remainingClaims',
  });

  const { data: minETHRequired } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'minETHRequired',
  });

  return {
    name,
    symbol,
    totalSupply,
    maxTotalSupply,
    claimAmount,
    maxClaims,
    claimCount,
    remainingClaims,
    minETHRequired,
  };
}

// 用户相关数据的hooks
export function useUserContract(address?: `0x${string}`) {
  const { data: balance } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const { data: isEligible } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'isEligible',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const { data: hasClaimed } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'hasClaimed',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  return {
    balance,
    isEligible,
    hasClaimed,
  };
}

// 写入合约的hooks
export function useClaimContract() {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  const claim = () => {
    writeContract({
      ...CHEETOS_CONTRACT,
      functionName: 'claim',
    });
  };

  return {
    claim,
    hash,
    error,
    isPending,
  };
}
