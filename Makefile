# Cheetos DeFi Project Makefile

# Default variables
RPC_URL = http://127.0.0.1:8545
CHAIN_ID = 11155111

# Help information
help:
	@echo "=== Cheetos DeFi Project Commands ==="
	@echo "start-local     - Start local test network (cross-platform)"
	@echo "build          - Compile contracts"
	@echo "test           - Run tests"
	@echo "deploy-local   - Deploy to local network"
	@echo "deploy-sepolia - Deploy to Sepolia testnet (cross-platform)"
	@echo "test-claim     - Test claim functionality"
	@echo "clean          - Clean compiled files"

# Start local test network (cross-platform)
start-local:
	@echo "Starting local Sepolia test network..."
	node scripts/start-local-testnet.js

# Compile contracts
build:
	@echo "🔨 Compiling contracts..."
	forge build

# Run tests
test:
	@echo "Running tests..."
	forge test -vvv

# Deploy to local network
deploy-local:
	@echo "Deploying to local network..."
	forge script script/DeployLocal.s.sol --rpc-url $(RPC_URL) --broadcast

# Deploy to Sepolia (cross-platform)
deploy-sepolia:
	@echo "Deploying to Sepolia testnet..."
	node scripts/deploy-sepolia.js

# Test claim functionality
test-claim:
	@echo "Testing claim functionality..."
	@if [ -z "$(CHEETOS_ADDRESS)" ]; then \
		echo "Please set CHEETOS_ADDRESS environment variable first"; \
		echo "Example: make test-claim CHEETOS_ADDRESS=0x..."; \
		exit 1; \
	fi
	CHEETOS_ADDRESS=$(CHEETOS_ADDRESS) forge script script/TestClaim.s.sol --rpc-url $(RPC_URL) --broadcast

# Clean
clean:
	@echo "🧹 Cleaning compiled files..."
	forge clean

.PHONY: help start-local build test deploy-local deploy-sepolia test-claim clean
