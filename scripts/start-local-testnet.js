#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('🚀 Starting local Sepolia test network...\n');

// Start anvil with the same parameters for all platforms
const anvil = spawn('anvil', [
    '--chain-id', '11155111',
    '--gas-limit', '30000000',
    '--gas-price', '20000000000',
    '--balance', '1000',
    '--accounts', '10',
    '--mnemonic', 'test test test test test test test test test test test test junk',
    '--host', '127.0.0.1',
    '--port', '8545'
], {
    stdio: 'inherit',
    shell: true
});

anvil.on('error', (error) => {
    console.error('❌ Failed to start anvil:', error.message);
    console.log('Make sure Foundry is installed: https://getfoundry.sh/');
    process.exit(1);
});

anvil.on('close', (code) => {
    console.log(`\nAnvil process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n🛑 Stopping local test network...');
    anvil.kill('SIGINT');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Stopping local test network...');
    anvil.kill('SIGTERM');
    process.exit(0);
});
