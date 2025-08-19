# Frontend Configuration Guide

## 🐛 Problem Resolution

### Previous Issues:
The frontend was showing all data as 0, the reasons were:
1. **Network Configuration Error**: Frontend was connecting to local network instead of Sepolia
2. **Missing Environment Variables**: No proper environment variable configuration

### ✅ Fixed:

#### 1. Network Configuration
```typescript
// ❌ Before: Connecting to local network
chains: [localSepolia] // http://127.0.0.1:8545

// ✅ Now: Connecting to real Sepolia
chains: [sepolia] // Sepolia testnet
```

#### 2. Contract Address Configuration
```typescript
// Directly use the deployed contract address
address: '0x712e4F191Fa3516CA6f15a3F040f6be9BEaD5155'
```

## 🛠️ Frontend Environment Configuration

### 1. Create Environment Variables File
Create `.env.local` in the `frontend` directory:

```bash
# Sepolia network configuration
NEXT_PUBLIC_CHAIN_ID=11155111

# Deployed contract address
NEXT_PUBLIC_CHEETOS_ADDRESS=0x712e4F191Fa3516CA6f15a3F040f6be9BEaD5155

# WalletConnect project ID (optional)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

### 2. Start Frontend
```bash
cd frontend
npm install  # if needed
npm run dev
```

### 3. Wallet Configuration
Make sure your MetaMask:
- Has Sepolia testnet added
- Wallet address has at least 0.01 Sepolia ETH
- Is connected to the correct network

## 🔗 Important Links

- **Contract Address**: `0x712e4F191Fa3516CA6f15a3F040f6be9BEaD5155`
- **Etherscan**: https://sepolia.etherscan.io/address/0x712e4f191fa3516ca6f15a3f040f6be9bead5155
- **Sepolia Faucet**: https://sepoliafaucet.com/

## 🚀 Should Work Now!

After restarting the frontend, you should see:
- Correct contract data
- Real claim status
- Can claim tokens normally



