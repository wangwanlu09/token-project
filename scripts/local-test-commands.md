# 🚀 Local Test Commands Quick Reference

## Basic Test Commands

### 1. Run All Tests ✅
```bash
forge test -vvv
```

### 2. Start Local Test Network (in separate terminal)
```bash
# Start Anvil local node, simulate Sepolia
anvil --chain-id 11155111 --balance 1000 --accounts 10
```

### 3. Compile Contracts
```bash
forge build
```

### 4. Run Specific Tests
```bash
# Only run claim functionality tests
forge test --match-test testClaim -vvv

# Only run fuzz tests
forge test --match-test testFuzz -vvv
```

## Interact with Local Network

### 1. Deploy Contract to Local Network
```bash
# First ensure Anvil is running, then:
forge script script/DeployLocal.s.sol --rpc-url http://127.0.0.1:8545 --broadcast
```

### 2. Use Cast Commands for Interaction
```bash
# Set variables
CONTRACT_ADDRESS="0xcontract_address"
USER_ADDRESS="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

# View contract status
cast call $CONTRACT_ADDRESS "remainingClaims()" --rpc-url http://127.0.0.1:8545
cast call $CONTRACT_ADDRESS "claimCount()" --rpc-url http://127.0.0.1:8545
cast call $CONTRACT_ADDRESS "totalSupply()" --rpc-url http://127.0.0.1:8545

# View account status
cast call $CONTRACT_ADDRESS "isEligible(address)" $USER_ADDRESS --rpc-url http://127.0.0.1:8545
cast call $CONTRACT_ADDRESS "hasClaimed(address)" $USER_ADDRESS --rpc-url http://127.0.0.1:8545
cast call $CONTRACT_ADDRESS "balanceOf(address)" $USER_ADDRESS --rpc-url http://127.0.0.1:8545

# Execute claim
cast send $CONTRACT_ADDRESS "claim()" --private-key $PRIVATE_KEY --rpc-url http://127.0.0.1:8545
```

## Test Default Accounts

Anvil provided test accounts:

| Account | Address | Private Key | ETH Balance |
|---------|---------|-------------|-------------|
| #0 | 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 | 1000 ETH |
| #1 | 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 | 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d | 1000 ETH |
| #2 | 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC | 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a | 1000 ETH |

## Common Test Scenarios

### 1. Test Normal Claim Process
```bash
# Run tests including multi-user testing
forge test --match-test testMultipleUsersClaim -vvv
```

### 2. Test Boundary Conditions
```bash
# Test minimum ETH requirement
forge test --match-test testClaimWithExactlyMinimumETH -vvv

# Test duplicate claims
forge test --match-test testCannotClaimTwice -vvv
```

### 3. Test Supply Limits
```bash
forge test --match-test testMaxClaimsLimit -vvv
```

## Debugging Tips

### 1. Detailed Log Output
```bash
forge test -vvvv  # Most detailed output
```

### 2. Gas Usage
```bash
forge test --gas-report
```

### 3. Run Single Test with Detailed Trace
```bash
forge test --match-test testClaimWithSepoliaETH -vvvv
```

## Common Issue Troubleshooting

### 1. "NoSepoliaETH" Error
Account ETH balance insufficient (less than 0.01 ETH), use vm.deal to increase balance

### 2. "AlreadyClaimed" Error
Account has already claimed, check hasClaimed status

### 3. "ExceedsMaxClaims" Error
Reached 1000 claim limit

### 4. Gas Estimation
All tests show gas usage, normal claim uses about 110k gas

## Test Coverage

Current tests cover:
- ✅ Basic claim functionality
- ✅ ETH balance verification
- ✅ Duplicate claim protection
- ✅ Supply limit enforcement
- ✅ Boundary condition testing
- ✅ Fuzz testing (random inputs)
- ✅ Multi-user scenarios
