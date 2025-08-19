# 🧪 Local Development Environment Setup

This guide will help you simulate the Sepolia testnet locally to test the Cheetos token contract.

## 🚀 Quick Start

### 1. Start Local Test Network

Start Anvil local node in one terminal window:

```bash
# Method 1: Use Makefile (recommended, cross-platform)
make start-local

# Method 2: Use Node.js script directly
node scripts/start-local-testnet.js

# Method 3: Use anvil command directly
anvil --chain-id 11155111 --gas-limit 30000000 --balance 1000 --accounts 10
```

This will start a local blockchain network simulating Sepolia:
- Chain ID: 11155111 (same as real Sepolia)
- RPC URL: http://127.0.0.1:8545
- 10 test accounts, each with 1000 ETH

### 2. Compile and Deploy Contracts

In a new terminal window:

```bash
# Compile contracts
make build

# Deploy to local network
make deploy-local
```

After successful deployment, you'll see the contract address and related information.

### 3. Test Claim Functionality

```bash
# Set contract address and test (replace with actual address)
make test-claim CHEETOS_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## 📋 Default Test Accounts

Anvil will create 10 test accounts for you, here are the first few:

| Account | Address | Private Key |
|---------|---------|-------------|
| #0 | 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 |
| #1 | 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 | 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d |
| #2 | 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC | 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a |

## 🔗 MetaMask Configuration

To connect to local network in MetaMask:

1. Open MetaMask, click the network dropdown
2. Select "Add Network"
3. Enter the following information:
   - Network Name: Local Sepolia
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 11155111
   - Currency Symbol: ETH
   - Block Explorer URL: (leave empty)

4. Import test accounts:
   - Use the private keys from the table above to import accounts

## 🧪 Testing Process

### Test Cheetos Token Claim:

1. **Check ETH Balance**: Ensure account has enough ETH (at least 0.01 ETH)
2. **Check Claim Eligibility**: Call `isEligible(address)` function
3. **Execute Claim**: Call `claim()` function
4. **Verify Result**: Check token balance

### Common Test Commands:

```bash
# View contract status
cast call $CHEETOS_ADDRESS "remainingClaims()" --rpc-url http://127.0.0.1:8545

# Check if account has claimed
cast call $CHEETOS_ADDRESS "hasClaimed(address)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:8545

# View token balance
cast call $CHEETOS_ADDRESS "balanceOf(address)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:8545

# Execute claim (requires private key)
cast send $CHEETOS_ADDRESS "claim()" --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --rpc-url http://127.0.0.1:8545
```

## 📁 Generated Files

After deployment, a `frontend-config.ts` file will be generated containing:
- Contract address
- Chain ID
- RPC URL

This file can be used directly for frontend integration.

## 🐛 Common Issues

### 1. "insufficient funds" error
Ensure the account has enough ETH for transactions.

### 2. "AlreadyClaimed" error
This address has already claimed tokens.

### 3. "NoSepoliaETH" error
Account ETH balance is less than 0.01 ETH.

### 4. "ExceedsMaxClaims" error
Maximum claim limit has been reached.

### 5. Reset State
If you need to reset blockchain state, restart anvil.

## 🔄 Workflow

1. Start local network: `make start-local`
2. Compile contracts: `make build`
3. Run tests: `make test`
4. Deploy contracts: `make deploy-local`
5. Test functionality: `make test-claim CHEETOS_ADDRESS=<address>`

## 🎯 Next Steps

After setting up the local environment, you can:
1. Develop frontend application to connect to local network
2. Test different user scenarios
3. Debug contract logic
4. Prepare for deployment to real Sepolia testnet
