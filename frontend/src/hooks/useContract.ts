import { useReadContract, useWriteContract } from 'wagmi';
import { CHEETOS_CONTRACT } from '@/lib/contracts';

// Hooks for static contract data (rarely changing data)
export function useCheetosStaticData() {
  // Get the token name
  const { data: name } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'name',
  });

  // Get the token symbol
  const { data: symbol } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'symbol',
  });

  // Get the maximum total supply
  const { data: maxTotalSupply } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'maxTotalSupply',
  });

  // Get the token amount for each claim
  const { data: claimAmount } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'CLAIM_AMOUNT',
  });

  // Get the maximum number of claims allowed
  const { data: maxClaims } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'MAX_CLAIMS',
  });

  // Get the minimum ETH required to claim
  const { data: minETHRequired } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'minETHRequired',
  });

  return {
    name,
    symbol,
    maxTotalSupply,
    claimAmount,
    maxClaims,
    minETHRequired,
  };
}

// Hooks for dynamic contract data (frequently changing data)
export function useCheetosDynamicData() {
  // Get the current total token supply
  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'totalSupply',
  });

  // Get the current number of claims made
  const { data: claimCount, refetch: refetchClaimCount } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'claimCount',
  });

  // Get the remaining number of claims
  const { data: remainingClaims, refetch: refetchRemainingClaims } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'remainingClaims',
  });

  // Function to refetch all dynamic data
  const refetchAll = () => {
    refetchTotalSupply();
    refetchClaimCount();
    refetchRemainingClaims();
  };

  return {
    totalSupply,
    claimCount,
    remainingClaims,
    refetchAll,
  };
}

// Convenience hook combining both static and dynamic contract data
export function useCheetosContract() {
  const staticData = useCheetosStaticData();
  const dynamicData = useCheetosDynamicData();

  return {
    ...staticData,
    ...dynamicData,
  };
}

// Hooks to read user-specific contract data
export function useUserContract(address?: `0x${string}`) {
  // Get the user's token balance
  const { data: balance } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  // Check if the user is eligible to claim tokens
  const { data: isEligible } = useReadContract({
    ...CHEETOS_CONTRACT,
    functionName: 'isEligible',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  // Check if the user has already claimed tokens
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

// Hooks to write to the contract (e.g., claiming tokens)
export function useClaimContract() {
  const { writeContract, data: hash, error, isPending } = useWriteContract();

  // Function to call the claim method
  const claim = () => {
    writeContract({
      ...CHEETOS_CONTRACT,
      functionName: 'claim',
    });
  };

  return {
    claim,    // Function to claim tokens
    hash,     // Transaction hash of the claim
    error,    // Error object if transaction fails
    isPending // Boolean indicating if transaction is pending
  };
}

