// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script, console} from "../lib/openzeppelin-contracts/lib/forge-std/src/Script.sol";
import {Cheetos} from "../src/Cheetos.sol";

contract DeployLocal is Script {
    function run() external {
        // 使用本地测试私钥 (Anvil默认账户)
        uint256 deployerPrivateKey = vm.envOr("PRIVATE_KEY", uint256(0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80));
        
        vm.startBroadcast(deployerPrivateKey);
        
        // 部署Cheetos合约
        Cheetos cheetos = new Cheetos();
        
        console.log("=== Local Deployment Complete ===");
        console.log("Cheetos Contract Address:", address(cheetos));
        console.log("Deployer Address:", cheetos.owner());
        console.log("Token Name:", cheetos.name());
        console.log("Token Symbol:", cheetos.symbol());
        console.log("Max Total Supply:", cheetos.maxTotalSupply());
        console.log("Claim Amount:", cheetos.CLAIM_AMOUNT());
        console.log("Min ETH Required:", cheetos.minETHRequired());
        
        vm.stopBroadcast();
        
        // 保存合约地址到文件
        string memory contractInfo = string.concat(
            "export const CHEETOS_CONTRACT_ADDRESS = \"",
            vm.toString(address(cheetos)),
            "\";\n",
            "export const CHAIN_ID = 11155111;\n",
            "export const RPC_URL = \"http://127.0.0.1:8545\";\n"
        );
        
        vm.writeFile("./frontend-config.ts", contractInfo);
        console.log("Contract config saved to frontend-config.ts");
    }
}
