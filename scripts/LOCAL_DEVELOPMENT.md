# 🧪 本地开发环境设置

本指南将帮助你在本地模拟Sepolia测试网，测试Cheetos代币合约。

## 🚀 快速开始

### 1. 启动本地测试网络

在一个终端窗口中启动Anvil本地节点：

```bash
# 方法1: 使用Makefile (推荐)
make start-local

# 方法2: 直接使用anvil命令
anvil --chain-id 11155111 --gas-limit 30000000 --balance 1000 --accounts 10

# 方法3: Windows用户使用批处理脚本
scripts/start-local-testnet.bat
```

这将启动一个模拟Sepolia的本地区块链网络：
- 链ID: 11155111 (与真实Sepolia相同)
- RPC URL: http://127.0.0.1:8545
- 10个测试账户，每个账户有1000 ETH

### 2. 编译和部署合约

在新的终端窗口中：

```bash
# 编译合约
make build

# 部署到本地网络
make deploy-local
```

部署成功后，你会看到合约地址和相关信息。

### 3. 测试领取功能

```bash
# 设置合约地址并测试 (替换为实际地址)
make test-claim CHEETOS_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

## 📋 默认测试账户

Anvil会为你创建10个测试账户，以下是前几个：

| 账户 | 地址 | 私钥 |
|------|------|------|
| #0 | 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 | 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 |
| #1 | 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 | 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d |
| #2 | 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC | 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a |

## 🔗 MetaMask配置

要在MetaMask中连接到本地网络：

1. 打开MetaMask，点击网络下拉菜单
2. 选择"添加网络"
3. 输入以下信息：
   - 网络名称: Local Sepolia
   - RPC URL: http://127.0.0.1:8545
   - 链ID: 11155111
   - 货币符号: ETH
   - 区块浏览器URL: (留空)

4. 导入测试账户：
   - 使用上面表格中的私钥导入账户

## 🧪 测试流程

### 测试Cheetos代币领取：

1. **检查ETH余额**: 确保账户有足够的ETH (至少0.01 ETH)
2. **检查领取条件**: 调用 `isEligible(address)` 函数
3. **执行领取**: 调用 `claim()` 函数
4. **验证结果**: 检查代币余额

### 常用测试命令：

```bash
# 查看合约状态
cast call $CHEETOS_ADDRESS "remainingClaims()" --rpc-url http://127.0.0.1:8545

# 查看账户是否已领取
cast call $CHEETOS_ADDRESS "hasClaimed(address)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:8545

# 查看代币余额
cast call $CHEETOS_ADDRESS "balanceOf(address)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --rpc-url http://127.0.0.1:8545

# 执行领取 (需要私钥)
cast send $CHEETOS_ADDRESS "claim()" --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --rpc-url http://127.0.0.1:8545
```

## 📁 生成的文件

部署完成后，会生成 `frontend-config.ts` 文件，包含：
- 合约地址
- 链ID
- RPC URL

这个文件可以直接用于前端集成。

## 🐛 常见问题

### 1. "insufficient funds" 错误
确保账户有足够的ETH进行交易。

### 2. "AlreadyClaimed" 错误  
该地址已经领取过代币。

### 3. "NoSepoliaETH" 错误
账户ETH余额少于0.01 ETH。

### 4. "ExceedsMaxClaims" 错误
已达到最大领取数量限制。

### 5. 重置状态
如果需要重置区块链状态，重新启动anvil即可。

## 🔄 工作流程

1. 启动本地网络: `make start-local`
2. 编译合约: `make build`  
3. 运行测试: `make test`
4. 部署合约: `make deploy-local`
5. 测试功能: `make test-claim CHEETOS_ADDRESS=<地址>`

## 🎯 下一步

设置好本地环境后，你可以：
1. 开发前端应用连接到本地网络
2. 测试不同的用户场景
3. 调试合约逻辑
4. 准备部署到真实的Sepolia测试网
