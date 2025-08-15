import { useState, useCallback } from 'react';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { useClaimContract, useUserContract } from './useContract';
import { getErrorMessage } from '@/lib/utils';

export function useClaim() {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { claim, hash, error: contractError, isPending } = useClaimContract();
  const { isEligible, hasClaimed } = useUserContract(address);

  // 等待交易确认
  const { 
    isLoading: isConfirming, 
    isSuccess: isConfirmed,
    error: receiptError 
  } = useWaitForTransactionReceipt({
    hash,
  });

  // 检查是否可以领取
  const canClaim = isConnected && isEligible && !hasClaimed && !isPending && !isConfirming;

  // 领取函数
  const handleClaim = useCallback(async () => {
    if (!canClaim) {
      setErrorMessage('无法领取代币');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      claim();
    } catch (err) {
      setErrorMessage(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [canClaim, claim]);

  // 处理状态变化
  const status = (() => {
    if (isLoading || isPending) return 'pending';
    if (isConfirming) return 'confirming';
    if (isConfirmed) return 'success';
    if (contractError || receiptError) return 'error';
    return 'idle';
  })();

  // 处理错误消息
  const finalErrorMessage = contractError 
    ? getErrorMessage(contractError) 
    : receiptError 
    ? getErrorMessage(receiptError)
    : errorMessage;

  // 处理成功消息
  const finalSuccessMessage = isConfirmed ? '代币领取成功！' : successMessage;

  return {
    // 状态
    canClaim,
    status,
    hash,
    
    // 消息
    successMessage: finalSuccessMessage,
    errorMessage: finalErrorMessage,
    
    // 方法
    handleClaim,
    
    // 原始状态
    isLoading,
    isPending,
    isConfirming,
    isConfirmed,
  };
}
