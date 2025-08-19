import { useState, useCallback, useEffect } from 'react';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useClaimContract, useUserContract, useCheetosDynamicData } from './useContract';
import { getErrorMessage } from '@/lib/utils';

export function useClaim() {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Contract hooks
  const { claim, hash, error: contractError, isPending } = useClaimContract();
  const { isEligible, hasClaimed } = useUserContract(address);
  const { refetchAll } = useCheetosDynamicData();

  // Wait for transaction confirmation
  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: receiptError 
  } = useWaitForTransactionReceipt({
    hash,
  });

  // Determine if user can claim
  const canClaim = isConnected && isEligible && !hasClaimed && !isPending && !isConfirming;

  // Claim function
  const handleClaim = useCallback(async () => {
    if (!canClaim) {
      setErrorMessage('Cannot claim tokens');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      claim(); // Call contract claim function
    } catch (err) {
      setErrorMessage(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [canClaim, claim]);

  // Determine current status
  const status = (() => {
    if (isLoading || isPending) return 'pending'; // Transaction is being sent
    if (isConfirming) return 'confirming';       // Waiting for blockchain confirmation
    if (isConfirmed) return 'success';           // Transaction confirmed
    if (contractError || receiptError) return 'error'; // Transaction failed
    return 'idle';                               // Idle state
  })();

  // Determine final error message
  const finalErrorMessage = contractError 
    ? getErrorMessage(contractError) 
    : receiptError 
    ? getErrorMessage(receiptError)
    : errorMessage;

  // Refresh contract data when transaction is confirmed
  useEffect(() => {
    if (isConfirmed) {
      refetchAll(); // Refresh dynamic data
      setSuccessMessage('Token claimed successfully!');
    }
  }, [isConfirmed, refetchAll]);

  // Determine final success message
  const finalSuccessMessage = isConfirmed ? 'Token claimed successfully!' : successMessage;

  return {
    // Status
    canClaim,
    status,
    hash,
    
    // Messages
    successMessage: finalSuccessMessage,
    errorMessage: finalErrorMessage,
    
    // Methods
    handleClaim,
    
    // Raw state
    isLoading,
    isPending,
    isConfirming,
    isConfirmed,
  };
}

