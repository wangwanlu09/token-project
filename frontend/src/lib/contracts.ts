// Contract ABI and address management
import { CONTRACT_CONFIG } from './config';

// Deployed contract address on Sepolia testnet
const DEPLOYED_ADDRESS = "0x712e4F191Fa3516CA6f15a3F040f6be9BEaD5155" as const;

// Cheetos contract ABI
export const CHEETOS_ABI = [
  // ERC20 standard functions
  {
    inputs: [], // No input parameters
    name: 'name', // Returns the token name
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view', // Read-only function, does not modify state
    type: 'function',
  },
  {
    inputs: [], 
    name: 'symbol', // Returns the token symbol
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [], 
    name: 'decimals', // Returns the token decimals
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [], 
    name: 'totalSupply', // Returns the total supply
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }], 
    name: 'balanceOf', // Returns the balance of a given account
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  
  // Cheetos-specific functions
  {
    inputs: [], 
    name: 'claim', // Claim tokens function
    outputs: [], 
    stateMutability: 'nonpayable', // Modifies blockchain state
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }], 
    name: 'isEligible', // Check if account is eligible to claim
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }], 
    name: 'hasClaimed', // Check if account has already claimed
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [], 
    name: 'claimCount', // Returns the number of claims made
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [], 
    name: 'remainingClaims', // Returns the number of remaining claims
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [], 
    name: 'CLAIM_AMOUNT', // Amount of tokens per claim
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [], 
    name: 'MAX_CLAIMS', // Maximum number of claims allowed
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [], 
    name: 'minETHRequired', // Minimum ETH required to be eligible
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [], 
    name: 'maxTotalSupply', // Maximum total supply of tokens
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

// Contract configuration
export const CHEETOS_CONTRACT = {
  address: DEPLOYED_ADDRESS, // Contract address
  abi: CHEETOS_ABI, // Contract ABI
} as const;

