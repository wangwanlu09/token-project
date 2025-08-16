@echo off
echo 正在部署 Cheetos 合约到 Sepolia 测试网...
echo.

REM 检查 .env 文件是否存在
if not exist .env (
    echo 错误: 找不到 .env 文件
    echo 请先创建 .env 文件并配置以下变量:
    echo - PRIVATE_KEY=your_private_key_here
    echo - INFURA_API_KEY=your_infura_api_key_here
    echo - ETHERSCAN_API_KEY=your_etherscan_api_key_here
    pause
    exit /b 1
)

REM 编译合约
echo 编译合约...
forge build
if %errorlevel% neq 0 (
    echo 编译失败
    pause
    exit /b 1
)

REM 部署合约
echo.
echo 部署合约到 Sepolia...
forge script script/DeployCheetos.s.sol --rpc-url sepolia --broadcast --verify

if %errorlevel% equ 0 (
    echo.
    echo 部署成功！
    echo 请检查上面的输出获取合约地址
) else (
    echo.
    echo 部署失败，请检查错误信息
)

pause
