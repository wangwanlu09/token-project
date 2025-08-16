# 前端配置说明

## 🐛 问题解决

### 之前的问题：
前端显示数据都是0，原因是：
1. **网络配置错误**：前端连接的是本地网络而不是Sepolia
2. **环境变量缺失**：没有正确的环境变量配置

### ✅ 已修复：

#### 1. 网络配置
```typescript
// ❌ 之前：连接本地网络
chains: [localSepolia] // http://127.0.0.1:8545

// ✅ 现在：连接真正的Sepolia
chains: [sepolia] // Sepolia测试网
```

#### 2. 合约地址配置
```typescript
// 直接使用部署的合约地址
address: '0x712e4F191Fa3516CA6f15a3F040f6be9BEaD5155'
```

## 🛠️ 前端环境配置

### 1. 创建环境变量文件
在 `frontend` 目录下创建 `.env.local`：

```bash
# Sepolia网络配置
NEXT_PUBLIC_CHAIN_ID=11155111

# 部署的合约地址
NEXT_PUBLIC_CHEETOS_ADDRESS=0x712e4F191Fa3516CA6f15a3F040f6be9BEaD5155

# WalletConnect项目ID（可选）
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
```

### 2. 启动前端
```bash
cd frontend
npm install  # 如果需要的话
npm run dev
```

### 3. 钱包配置
确保你的MetaMask：
- 已添加Sepolia测试网
- 钱包地址有至少0.01 Sepolia ETH
- 连接到正确的网络

## 🔗 重要链接

- **合约地址**: `0x712e4F191Fa3516CA6f15a3F040f6be9BEaD5155`
- **Etherscan**: https://sepolia.etherscan.io/address/0x712e4f191fa3516ca6f15a3f040f6be9bead5155
- **Sepolia水龙头**: https://sepoliafaucet.com/

## 🚀 现在应该正常工作了！

重启前端后，你应该能看到：
- 正确的合约数据
- 真实的领取状态
- 可以正常领取代币


