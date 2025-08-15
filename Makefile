# Cheetos DeFi项目 Makefile

# 默认变量
RPC_URL = http://127.0.0.1:8545
CHAIN_ID = 11155111

# 帮助信息
help:
	@echo "=== Cheetos DeFi 项目命令 ==="
	@echo "start-local     - 启动本地测试网络"
	@echo "build          - 编译合约"
	@echo "test           - 运行测试"
	@echo "deploy-local   - 部署到本地网络"
	@echo "test-claim     - 测试领取功能"
	@echo "clean          - 清理编译文件"

# 启动本地测试网络
start-local:
	@echo "🚀 启动本地Sepolia测试网络..."
	anvil --chain-id $(CHAIN_ID) --gas-limit 30000000 --gas-price 20000000000 --balance 1000 --accounts 10 --mnemonic "test test test test test test test test test test test junk" --host 127.0.0.1 --port 8545

# 编译合约
build:
	@echo "🔨 编译合约..."
	forge build

# 运行测试
test:
	@echo "🧪 运行测试..."
	forge test -vvv

# 部署到本地网络
deploy-local:
	@echo "🚀 部署到本地网络..."
	forge script script/DeployLocal.s.sol --rpc-url $(RPC_URL) --broadcast

# 测试领取功能
test-claim:
	@echo "🎯 测试领取功能..."
	@if [ -z "$(CHEETOS_ADDRESS)" ]; then \
		echo "❌ 请先设置CHEETOS_ADDRESS环境变量"; \
		echo "例如: make test-claim CHEETOS_ADDRESS=0x..."; \
		exit 1; \
	fi
	CHEETOS_ADDRESS=$(CHEETOS_ADDRESS) forge script script/TestClaim.s.sol --rpc-url $(RPC_URL) --broadcast

# 清理
clean:
	@echo "🧹 清理编译文件..."
	forge clean

# Windows版本的命令
start-local-windows:
	@echo "🚀 启动本地Sepolia测试网络 (Windows)..."
	scripts/start-local-testnet.bat

.PHONY: help start-local build test deploy-local test-claim clean start-local-windows
