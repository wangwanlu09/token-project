import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatEther } from 'viem';

// Utility to merge Tailwind CSS class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format ETH value from bigint to string with fixed decimals
export function formatETH(value: bigint, decimals: number = 4): string {
  const formatted = formatEther(value);
  const num = parseFloat(formatted);
  return num.toFixed(decimals);
}

// Format token value (CHE) from bigint to string with fixed decimals
export function formatTokens(value: bigint, decimals: number = 2): string {
  const formatted = formatEther(value); // CHE also has 18 decimals
  const num = parseFloat(formatted);
  return num.toFixed(decimals);
}

// Shorten a wallet address for display (e.g., 0x1234...abcd)
export function shortenAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Handle and convert errors to human-readable messages
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Contract-specific errors
    if (error.message.includes('AlreadyClaimed')) {
      return 'Token has already been claimed';
    }
    if (error.message.includes('NoSepoliaETH')) {
      return 'Insufficient ETH balance (minimum 0.01 ETH required)';
    }
    if (error.message.includes('ExceedsMaxClaims')) {
      return 'All tokens have been claimed';
    }
    if (error.message.includes('User rejected')) {
      return 'Transaction was cancelled by user';
    }
    if (error.message.includes('insufficient funds')) {
      return 'Not enough gas';
    }
    return error.message;
  }
  return 'Unknown error';
}

