# Scripts Directory

This directory contains cross-platform scripts for the Cheetos project.

## 🚀 Cross-Platform Scripts

### Node.js Scripts (Recommended)
These scripts work on Windows, macOS, and Linux:

- **`deploy-sepolia.js`** - Deploy contracts to Sepolia testnet
- **`start-local-testnet.js`** - Start local Anvil test network

### Usage

```bash
# Deploy to Sepolia
make deploy-sepolia
# or
node scripts/deploy-sepolia.js

# Start local network
make start-local
# or
node scripts/start-local-testnet.js
```

## 📋 Requirements

- **Node.js** (v16+) - For cross-platform scripts
- **Foundry** - For blockchain operations

## 🎯 Benefits

- **Single codebase** - No need for separate Windows/Linux scripts
- **Better error handling** - More robust error messages
- **Consistent experience** - Same commands work everywhere
- **Easier maintenance** - Only one script to update

## 🔧 How It Works

The Node.js scripts use the `child_process` module to execute Foundry commands, providing:
- Cross-platform compatibility
- Better error handling
- Consistent output formatting
- Environment variable validation

## 📁 File Structure

```
scripts/
├── deploy-sepolia.js          # Cross-platform deployment script
├── start-local-testnet.js     # Cross-platform local network script
├── LOCAL_DEVELOPMENT.md       # Local development guide
├── local-test-commands.md     # Test commands reference
└── README.md                  # This file
```
