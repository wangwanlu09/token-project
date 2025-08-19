# 🧀 Cheetos Token - Ethereum Token Project

A complete Ethereum token project built with Foundry and Next.js, featuring smart contracts and a modern frontend interface.

## Project Overview

**Cheetos (CHE)** is an ERC-20 token project with the following features:

- **Limited Supply**: 10,000 CHE tokens total
- **Free Claim**: Each address can claim 10 CHE
- **Claim Requirements**: Must hold at least 0.01 Sepolia ETH
- **Gas Optimized**: Smart contracts optimized with Foundry
- **Modern Frontend**: Responsive interface built with Next.js and Tailwind CSS

## Tech Stack

### Backend (Smart Contracts)
- **Foundry**: Ethereum development framework
- **Solidity**: Smart contract language (^0.8.26)
- **OpenZeppelin**: Secure contract library
- **Sepolia Testnet**: Test network

### Frontend (Web Application)
- **Next.js 15**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling framework
- **RainbowKit**: Wallet connection
- **Wagmi**: React Hooks for Ethereum
- **Viem**: Ethereum client

## Quick Start

### Prerequisites

- **Node.js** (v18+)
- **Foundry** (latest version)
- **Git**

### 1. Clone the Project

```bash
git clone <your-repo-url>
cd MyFirstFoundryProject
```

### 2. Install Dependencies

```bash
# Install Foundry dependencies
forge install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Environment Configuration

#### Backend Configuration
Create a `.env` file in the project root:

```bash
# Private key (for deployment)
PRIVATE_KEY=your_private_key_here

# RPC endpoints
INFURA_API_KEY=your_infura_api_key
# or
ALCHEMY_API_KEY=your_alchemy_api_key
```

#### Frontend Configuration
Create a `.env.local` file in the `frontend` directory:

```bash
# Sepolia network configuration
NEXT_PUBLIC_CHAIN_ID=11155111

# Contract address (update after deployment)
NEXT_PUBLIC_CHEETOS_ADDRESS=0x712e4F191Fa3516CA6f15a3F040f6be9BEaD5155

# WalletConnect project ID (optional)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

## Development Commands

### Smart Contracts

```bash
# Compile contracts
forge build

# Run tests
forge test

# Format code
forge fmt

# Generate gas reports
forge snapshot

# Start local node
anvil

# Deploy to local network
forge script script/DeployLocal.s.sol --rpc-url http://127.0.0.1:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast

# Deploy to Sepolia
forge script script/DeployCheetos.s.sol --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY --broadcast --verify
```

### Frontend Application

```bash
cd frontend

# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Code linting
npm run lint
```

## Contract Information

### Deployed Contract
- **Network**: Sepolia Testnet
- **Contract Address**: `0x712e4F191Fa3516CA6f15a3F040f6be9BEaD5155`
- **Etherscan**: [View Contract](https://sepolia.etherscan.io/address/0x712e4f191fa3516ca6f15a3f040f6be9bead5155)

### Contract Features
- **Token Name**: Cheetos
- **Token Symbol**: CHE
- **Total Supply**: 10,000 CHE
- **Claim Amount**: 10 CHE per claim
- **Maximum Claims**: 1,000 claims
- **Claim Requirement**: Hold ≥ 0.01 Sepolia ETH
- **Per Address Limit**: One claim per address

## Usage Guide

### 1. Get Sepolia ETH
Visit [Sepolia Faucet](https://sepoliafaucet.com/) to get test ETH

### 2. Connect Wallet
- Ensure MetaMask has Sepolia testnet added
- Connect to Sepolia network (Chain ID: 11155111)

### 3. Claim Tokens
- Visit the frontend application
- Connect your wallet
- Click "Claim Tokens" button
- Confirm the transaction

## Project Structure

```
MyFirstFoundryProject/
├── src/                    # Smart contract source code
│   └── Cheetos.sol        # Main contract
├── script/                 # Deployment scripts
│   ├── DeployCheetos.s.sol
│   ├── DeployLocal.s.sol
│   └── TestClaim.s.sol
├── test/                   # Test files
│   └── CheetosETHOnly.t.sol
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utility functions
│   └── public/            # Static assets
├── lib/                    # Dependencies
├── cache/                  # Foundry cache
├── out/                    # Compilation output
└── foundry.toml           # Foundry configuration
```

## Configuration

### Foundry Configuration (`foundry.toml`)
- Enable compiler optimization (reduce gas usage)
- Configure RPC endpoints
- Set test parameters

### Frontend Configuration
- Multi-wallet support (RainbowKit)
- Responsive design (Tailwind CSS)
- TypeScript type safety

## Testing

```bash
# Run all tests
forge test

# Run specific test
forge test --match-test testClaim

# Generate test coverage
forge coverage
```

## Documentation

- [Foundry Book](https://book.getfoundry.sh/)
- [Next.js Documentation](https://nextjs.org/docs)
- [RainbowKit Documentation](https://www.rainbowkit.com/)
- [Wagmi Documentation](https://wagmi.sh/)

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues, please:

1. Check the [Issues](../../issues) page
2. Review the [Deployment Summary](scripts/DEPLOYMENT_SUMMARY.md)
3. Check the [Frontend Setup Guide](frontend/FRONTEND_SETUP.md)

---

