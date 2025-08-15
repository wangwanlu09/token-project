export const WALLET_CONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

// 合约配置
export const CONTRACT_CONFIG = {
  // 这些值会被部署脚本动态更新
  address: process.env.NEXT_PUBLIC_CHEETOS_ADDRESS as `0x${string}` || '0x',
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
} as const;
