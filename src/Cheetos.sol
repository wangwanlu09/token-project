// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract Cheetos is ERC20 {
    uint256 public constant CLAIM_AMOUNT = 10 * 10 ** 18;
    uint256 public constant MAX_TOTAL_SUPPLY = 10000 * 10 ** 18;
    uint16 public constant MAX_CLAIMS = uint16(MAX_TOTAL_SUPPLY / CLAIM_AMOUNT); // 1000 claims

    // Minimum ETH required to claim 
    uint256 public constant MIN_ETH_REQUIRED = 0.01 * 10**18; // 0.01 ETH = 10^16 wei

    address public immutable owner;

    // Track which addresses have already claimed
    mapping(address => bool) public hasClaimed;
    
    // Use uint16 for claim count (max 65535, we only need 1000)
    uint16 public claimCount;

    // Custom errors for gas efficiency
    error AlreadyClaimed();
    error NoSepoliaETH();
    error ExceedsMaxClaims();

    constructor() ERC20("Cheetos", "CHE") {
        owner = msg.sender;
    }

    /**
     * @notice Check if address is eligible to claim
     * @dev Must hold at least 1 wei of Sepolia ETH
     */
    function isEligible(address account) public view returns (bool) {
        return account.balance >= MIN_ETH_REQUIRED;
    }

    /**
     * @notice Claim Cheetos tokens if eligible
     * @dev Each address can claim only once. Must hold Sepolia ETH.
     */
    function claim() external {
        // Check if already claimed
        if (hasClaimed[msg.sender]) revert AlreadyClaimed();
        
        // Check if max claims reached
        if (claimCount >= MAX_CLAIMS) revert ExceedsMaxClaims();
        
        // Check Sepolia ETH requirement
        if (msg.sender.balance < MIN_ETH_REQUIRED) revert NoSepoliaETH();

        // Mark caller as claimed
        hasClaimed[msg.sender] = true;

        // Increment claim count
        unchecked {
            ++claimCount; // Safe because of MAX_CLAIMS check above
        }

        // Mint claim amount directly to caller
        _mint(msg.sender, CLAIM_AMOUNT);
    }

    /**
     * @notice Get remaining claimable tokens
     */
    function remainingClaims() external view returns (uint16) {
        return MAX_CLAIMS - claimCount;
    }

    /**
     * @notice Get total supply limit
     */
    function maxTotalSupply() external pure returns (uint256) {
        return MAX_TOTAL_SUPPLY;
    }
    
    /**
     * @notice Check if all tokens have been claimed
     */
    function allTokensClaimed() external view returns (bool) {
        return claimCount >= MAX_CLAIMS;
    }
    
    /**
     * @notice Get minimum ETH required to claim
     */
    function minETHRequired() external pure returns (uint256) {
        return MIN_ETH_REQUIRED;
    }
}

