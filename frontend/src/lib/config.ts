// WalletConnect project ID from environment variables
export const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

// Contract configuration
export const CONTRACT_CONFIG = {
  // Using deployed contract address on Sepolia testnet
  address: (process.env.NEXT_PUBLIC_CHEETOS_ADDRESS || '0x712e4F191Fa3516CA6f15a3F040f6be9BEaD5155') as `0x${string}`,
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'), // Sepolia testnet
} as const;

