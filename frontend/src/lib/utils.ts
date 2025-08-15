import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatEther } from 'viem';

// Tailwind CSS类名合并工具
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 格式化ETH数量
export function formatETH(value: bigint, decimals: number = 4): string {
  const formatted = formatEther(value);
  const num = parseFloat(formatted);
  return num.toFixed(decimals);
}

// 格式化代币数量
export function formatTokens(value: bigint, decimals: number = 2): string {
  const formatted = formatEther(value); // CHE也是18位小数
  const num = parseFloat(formatted);
  return num.toFixed(decimals);
}

// 简化地址显示
export function shortenAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// 错误消息处理
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // 处理合约错误
    if (error.message.includes('AlreadyClaimed')) {
      return '您已经领取过代币了';
    }
    if (error.message.includes('NoSepoliaETH')) {
      return '账户ETH余额不足0.01 ETH';
    }
    if (error.message.includes('ExceedsMaxClaims')) {
      return '代币已全部领取完毕';
    }
    if (error.message.includes('User rejected')) {
      return '用户取消了交易';
    }
    if (error.message.includes('insufficient funds')) {
      return 'Gas费不足';
    }
    return error.message;
  }
  return '未知错误';
}
