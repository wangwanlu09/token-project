#!/bin/bash

echo "正在部署 Cheetos 合约到 Sepolia 测试网..."
echo

# 检查 .env 文件是否存在
if [ ! -f .env ]; then
    echo "错误: 找不到 .env 文件"
    echo "请先创建 .env 文件并配置以下变量:"
    echo "- PRIVATE_KEY=your_private_key_here"
    echo "- INFURA_API_KEY=your_infura_api_key_here"
    echo "- ETHERSCAN_API_KEY=your_etherscan_api_key_here"
    exit 1
fi

# 编译合约
echo "编译合约..."
forge build
if [ $? -ne 0 ]; then
    echo "编译失败"
    exit 1
fi

# 部署合约
echo
echo "部署合约到 Sepolia..."
forge script script/DeployCheetos.s.sol --rpc-url sepolia --broadcast --verify

if [ $? -eq 0 ]; then
    echo
    echo "部署成功！"
    echo "请检查上面的输出获取合约地址"
else
    echo
    echo "部署失败，请检查错误信息"
fi
