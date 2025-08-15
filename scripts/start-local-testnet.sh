#!/bin/bash

# 启动本地测试网络，模拟Sepolia环境
# Chain ID 11155111 是Sepolia的链ID

echo "🚀 启动本地Sepolia测试网络..."

anvil \
  --chain-id 11155111 \
  --gas-limit 30000000 \
  --gas-price 20000000000 \
  --balance 1000 \
  --accounts 10 \
  --mnemonic "test test test test test test test test test test test junk" \
  --host 127.0.0.1 \
  --port 8545
