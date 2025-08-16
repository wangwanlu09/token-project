'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useReadContract } from 'wagmi';
import { CHEETOS_CONTRACT } from '@/lib/contracts';

// Define the type for contract data
interface CheetosContractData {
  name?: string;
  symbol?: string;
  totalSupply?: bigint;
  maxTotalSupply?: bigint;
  claimAmount?: bigint;
  maxClaims?: number;
  claimCount?: number;
  remainingClaims?: number;
  minETHRequired?: bigint;
}

// Create a Context
const CheetosContractContext = createContext<CheetosContractData>({});

// Provider component
export function CheetosContractProvider({ children }: { children: ReactNode }) {
  // Call all contract read functions only once here
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

  // Bundle all contract data into a single value
  const value = {
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

  // Provide the contract data to child components
  return (
    <CheetosContractContext.Provider value={value}>
      {children}
    </CheetosContractContext.Provider>
  );
}

// Custom hook to consume the contract context
export function useCheetosContractContext() {
  const context = useContext(CheetosContractContext);
  if (context === undefined) {
    throw new Error('useCheetosContractContext must be used within a CheetosContractProvider');
  }
  return context;
}
