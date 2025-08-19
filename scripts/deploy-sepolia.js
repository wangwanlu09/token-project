#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Deploying Cheetos contract to Sepolia testnet...\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
    console.error('❌ Error: .env file not found');
    console.log('Please create .env file first and configure the following variables:');
    console.log('- PRIVATE_KEY=your_private_key_here');
    console.log('- INFURA_API_KEY=your_infura_api_key_here');
    console.log('- ETHERSCAN_API_KEY=your_etherscan_api_key_here');
    process.exit(1);
}

try {
    // Compile contracts
    console.log('🔨 Compiling contracts...');
    execSync('forge build', { stdio: 'inherit' });
    
    // Deploy contract
    console.log('\n🚀 Deploying contract to Sepolia...');
    execSync('forge script script/DeployCheetos.s.sol --rpc-url sepolia --broadcast --verify', { 
        stdio: 'inherit' 
    });
    
    console.log('\n✅ Deployment successful!');
    console.log('Please check the output above for the contract address');
    
} catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
    process.exit(1);
}
