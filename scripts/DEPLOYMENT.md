# Cheetos 合约部署指南

## 部署到 Sepolia 测试网

### 准备工作

1. **创建 .env 文件**
   在项目根目录创建 `.env` 文件，添加以下内容：
   ```
   # 你的钱包私钥 (不要包含0x前缀)
   PRIVATE_KEY=your_private_key_here
   
   # Infura API Key
   INFURA_API_KEY=your_infura_api_key_here
   
   # Etherscan API Key (用于验证合约)
   ETHERSCAN_API_KEY=your_etherscan_api_key_here
   ```

2. **获取必要的资源**
   - **Sepolia ETH**: 从水龙头获取测试ETH
     - https://sepoliafaucet.com/
     - https://faucet.quicknode.com/ethereum/sepolia
   - **Infura API Key**: 
     - 注册 https://infura.io/
     - 创建新项目，获取API Key
   - **Etherscan API Key** (可选，用于验证):
     - 注册 https://etherscan.io/
     - 创建API Key

### 部署步骤

1. **编译合约**
   ```bash
   forge build
   ```

2. **部署到 Sepolia**
   ```bash
   forge script script/DeployCheetos.s.sol --rpc-url sepolia --broadcast --verify
   ```

3. **验证部署**
   部署完成后，你会看到合约地址。可以在 Sepolia Etherscan 上查看：
   https://sepolia.etherscan.io/

### 故障排除

- 确保 `.env` 文件在项目根目录
- 确保私钥没有 `0x` 前缀
- 确保钱包有足够的 Sepolia ETH
- 如果验证失败，可以手动验证：
  ```bash
  forge verify-contract <contract_address> src/Cheetos.sol:Cheetos --chain sepolia
  ```
