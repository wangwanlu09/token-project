// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script, console} from "../lib/openzeppelin-contracts/lib/forge-std/src/Script.sol";
import {Cheetos} from "../src/Cheetos.sol";

contract TestClaim is Script {
    function run() external {
        // 从环境变量获取合约地址，或使用默认地址
        address cheetosAddress = vm.envOr("CHEETOS_ADDRESS", address(0));
        require(cheetosAddress != address(0), "Please set CHEETOS_ADDRESS environment variable");
        
        Cheetos cheetos = Cheetos(cheetosAddress);
        
        // 使用不同的测试账户进行测试
        uint256[] memory testPrivateKeys = new uint256[](3);
        testPrivateKeys[0] = 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d; // 账户1
        testPrivateKeys[1] = 0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a; // 账户2 
        testPrivateKeys[2] = 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6; // 账户3
        
        console.log("=== Starting Claim Function Tests ===");
        console.log("Contract Address:", address(cheetos));
        console.log("Current Claim Count:", cheetos.claimCount());
        console.log("Remaining Claims:", cheetos.remainingClaims());
        
        for (uint i = 0; i < testPrivateKeys.length; i++) {
            address testAccount = vm.addr(testPrivateKeys[i]);
            console.log("\n--- Test Account", i + 1, "---");
            console.log("Address:", testAccount);
            console.log("ETH Balance:", testAccount.balance / 1e18, "ETH");
            console.log("Is Eligible:", cheetos.isEligible(testAccount));
            console.log("Has Claimed:", cheetos.hasClaimed(testAccount));
            
            if (cheetos.isEligible(testAccount) && !cheetos.hasClaimed(testAccount)) {
                vm.startBroadcast(testPrivateKeys[i]);
                
                try cheetos.claim() {
                    console.log("Claim successful!");
                    console.log("Token Balance:", cheetos.balanceOf(testAccount) / 1e18, "CHE");
                } catch Error(string memory reason) {
                    console.log("Claim failed:", reason);
                } catch {
                    console.log("Claim failed: Unknown error");
                }
                
                vm.stopBroadcast();
            } else {
                console.log("Skipped (not eligible or already claimed)");
            }
        }
        
        console.log("\n=== Tests Complete ===");
        console.log("Total Claims:", cheetos.claimCount());
        console.log("Remaining Claims:", cheetos.remainingClaims());
        console.log("Total Supply:", cheetos.totalSupply() / 1e18, "CHE");
    }
}
