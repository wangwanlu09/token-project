// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script, console} from "../lib/openzeppelin-contracts/lib/forge-std/src/Script.sol";
import {Cheetos} from "../src/Cheetos.sol";

contract DeployCheetos is Script {
    function run() external {
        // Read the deployer's private key from the .env file
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        // Start broadcasting transactions (send them to the network)
        vm.startBroadcast(deployerPrivateKey);

        // Deploy the Cheetos contract
        Cheetos cheetos = new Cheetos();

        // Stop broadcasting transactions
        vm.stopBroadcast();

        // Log the deployed contract address (useful during testing)
        console.log("Cheetos deployed at:", address(cheetos));
    }
}
