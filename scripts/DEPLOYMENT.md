# Cheetos Contract Deployment Guide

## Deploy to Sepolia Testnet

### Prerequisites

1. **Create .env file**
   Create a `.env` file in the project root directory with the following content:
   ```
   # Your wallet private key (without 0x prefix)
   PRIVATE_KEY=your_private_key_here
   
   # Infura API Key
   INFURA_API_KEY=your_infura_api_key_here
   
   # Etherscan API Key (for contract verification)
   ETHERSCAN_API_KEY=your_etherscan_api_key_here
   ```

2. **Get required resources**
   - **Sepolia ETH**: Get test ETH from faucet
     - https://sepoliafaucet.com/
     - https://faucet.quicknode.com/ethereum/sepolia
   - **Infura API Key**: 
     - Register at https://infura.io/
     - Create new project, get API Key
   - **Etherscan API Key** (optional, for verification):
     - Register at https://etherscan.io/
     - Create API Key

### Deployment Steps

1. **Compile contracts**
   ```bash
   forge build
   ```

2. **Deploy to Sepolia**
   ```bash
   # Method 1: Use Makefile (recommended, cross-platform)
   make deploy-sepolia
   
   # Method 2: Use Node.js script directly
   node scripts/deploy-sepolia.js
   
   # Method 3: Use forge command directly
   forge script script/DeployCheetos.s.sol --rpc-url sepolia --broadcast --verify
   ```

3. **Verify deployment**
   After deployment, you will see the contract address. You can view it on Sepolia Etherscan:
   https://sepolia.etherscan.io/

### Troubleshooting

- Make sure `.env` file is in the project root directory
- Make sure private key doesn't have `0x` prefix
- Make sure wallet has enough Sepolia ETH
- If verification fails, you can verify manually:
  ```bash
  forge verify-contract <contract_address> src/Cheetos.sol:Cheetos --chain sepolia
  ```
