# 🚀 本地测试命令速查表

## 基础测试命令

### 1. 运行所有测试 ✅
```bash
forge test -vvv
```

### 2. 启动本地测试网络（在单独终端）
```bash
# 启动Anvil本地节点，模拟Sepolia
anvil --chain-id 11155111 --balance 1000 --accounts 10
```

### 3. 编译合约
```bash
forge build
```

### 4. 运行特定测试
```bash
# 只运行领取功能测试
forge test --match-test testClaim -vvv

# 只运行fuzz测试
forge test --match-test testFuzz -vvv
```

## 与本地网络交互

### 1. 部署合约到本地网络
```bash
# 首先确保Anvil在运行，然后：
forge script script/DeployLocal.s.sol --rpc-url http://127.0.0.1:8545 --broadcast
```

### 2. 使用Cast命令交互
```bash
# 设置变量
CONTRACT_ADDRESS="0x合约地址"
USER_ADDRESS="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

# 查看合约状态
cast call $CONTRACT_ADDRESS "remainingClaims()" --rpc-url http://127.0.0.1:8545
cast call $CONTRACT_ADDRESS "claimCount()" --rpc-url http://127.0.0.1:8545
cast call $CONTRACT_ADDRESS "totalSupply()" --rpc-url http://127.0.0.1:8545

# 查看账户状态
cast call $CONTRACT_ADDRESS "isEligible(address)" $USER_ADDRESS --rpc-url http://127.0.0.1:8545
cast call $CONTRACT_ADDRESS "hasClaimed(address)" $USER_ADDRESS --rpc-url http://127.0.0.1:8545
cast call $CONTRACT_ADDRESS "balanceOf(address)" $USER_ADDRESS --rpc-url http://127.0.0.1:8545

# 执行领取
cast send $CONTRACT_ADDRESS "claim()" --private-key $PRIVATE_KEY --rpc-url http://127.0.0.1:8545
```

## 测试默认账户

Anvil提供的测试账户：

| 账户 | 地址 | 私钥 | ETH余额 |
|------|------|------|---------|
| #0 | 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 | 1000 ETH |
| #1 | 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 | 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d | 1000 ETH |
| #2 | 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC | 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a | 1000 ETH |

## 常见测试场景

### 1. 测试正常领取流程
```bash
# 运行包含多用户测试的测试
forge test --match-test testMultipleUsersClaim -vvv
```

### 2. 测试边界条件
```bash
# 测试最小ETH要求
forge test --match-test testClaimWithExactlyMinimumETH -vvv

# 测试重复领取
forge test --match-test testCannotClaimTwice -vvv
```

### 3. 测试供应量限制
```bash
forge test --match-test testMaxClaimsLimit -vvv
```

## 调试技巧

### 1. 详细日志输出
```bash
forge test -vvvv  # 最详细的输出
```

### 2. Gas使用情况
```bash
forge test --gas-report
```

### 3. 运行单个测试并查看详细trace
```bash
forge test --match-test testClaimWithSepoliaETH -vvvv
```

## 常见问题排查

### 1. "NoSepoliaETH" 错误
账户ETH余额不足0.01 ETH，使用vm.deal增加余额

### 2. "AlreadyClaimed" 错误
账户已经领取过，检查hasClaimed状态

### 3. "ExceedsMaxClaims" 错误
已达到1000次领取上限

### 4. Gas估算
所有测试都显示gas使用情况，正常领取约用110k gas

## 测试覆盖率

当前测试覆盖了：
- ✅ 基础领取功能
- ✅ ETH余额验证
- ✅ 重复领取防护
- ✅ 供应量限制
- ✅ 边界条件测试
- ✅ Fuzz测试（随机输入）
- ✅ 多用户场景
