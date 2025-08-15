// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test} from "../lib/openzeppelin-contracts/lib/forge-std/src/Test.sol";
import {Cheetos} from "../src/Cheetos.sol";

contract CheetosETHOnlyTest is Test {
    Cheetos public cheetos;
    
    address public owner = address(0x123);
    address public user1 = address(0x456);
    address public user2 = address(0x789);
    address public user3 = address(0xABC);

    function setUp() public {
        // Deploy Cheetos contract as owner
        vm.prank(owner);
        cheetos = new Cheetos();
        
        // Give test addresses some Sepolia ETH
        vm.deal(user1, 1 ether);
        vm.deal(user2, 0.5 ether);
        vm.deal(user3, 0 ether); // No ETH - should fail
    }

    // ==================== Basic Sepolia ETH Claim Tests ====================

    function testClaimWithSepoliaETH() public {
        // user1 has Sepolia ETH, should be able to claim
        assertTrue(cheetos.isEligible(user1));
        
        vm.prank(user1);
        cheetos.claim();
        
        assertEq(cheetos.balanceOf(user1), cheetos.CLAIM_AMOUNT());
        assertTrue(cheetos.hasClaimed(user1));
        assertEq(cheetos.claimCount(), 1);
    }

    function testCannotClaimWithoutSepoliaETH() public {
        // user3 has no Sepolia ETH, should fail
        assertFalse(cheetos.isEligible(user3));
        
        vm.prank(user3);
        vm.expectRevert(Cheetos.NoSepoliaETH.selector);
        cheetos.claim();
    }

    function testCannotClaimTwice() public {
        // First claim succeeds
        vm.prank(user1);
        cheetos.claim();
        assertTrue(cheetos.hasClaimed(user1));
        
        // Second claim fails
        vm.prank(user1);
        vm.expectRevert(Cheetos.AlreadyClaimed.selector);
        cheetos.claim();
    }

    function testMultipleUsersClaim() public {
        // user1 claims
        vm.prank(user1);
        cheetos.claim();
        
        // user2 claims  
        vm.prank(user2);
        cheetos.claim();
        
        assertEq(cheetos.balanceOf(user1), cheetos.CLAIM_AMOUNT());
        assertEq(cheetos.balanceOf(user2), cheetos.CLAIM_AMOUNT());
        assertEq(cheetos.claimCount(), 2);
        assertEq(cheetos.remainingClaims(), cheetos.MAX_CLAIMS() - 2);
    }

    // ==================== Supply Limit Tests ====================

    function testMaxClaimsLimit() public {
        uint16 maxClaims = cheetos.MAX_CLAIMS();
        assertEq(maxClaims, 1000); // 10000 CHE / 10 CHE = 1000 claims
        
        // Simulate some claims
        uint256 testClaims = 10;
        for (uint256 i = 0; i < testClaims; i++) {
            address tempUser = address(uint160(i + 1000));
            vm.deal(tempUser, 1 ether); // Give Sepolia ETH
            vm.prank(tempUser);
            cheetos.claim();
        }
        
        assertEq(cheetos.claimCount(), testClaims);
        assertEq(cheetos.remainingClaims(), maxClaims - testClaims);
    }

    function testClaimCountingWorks() public {
        // Simulate claims
        uint16 testClaims = 5;
        for (uint16 i = 0; i < testClaims; i++) {
            address tempUser = address(uint160(i + 2000));
            vm.deal(tempUser, 1 ether);
            vm.prank(tempUser);
            cheetos.claim();
        }
        
        assertEq(cheetos.claimCount(), testClaims);
        assertEq(cheetos.remainingClaims(), cheetos.MAX_CLAIMS() - testClaims);
        assertFalse(cheetos.allTokensClaimed());
    }

    // ==================== View Function Tests ====================

    function testIsEligibleFunction() public view {
        assertTrue(cheetos.isEligible(user1));  // Has Sepolia ETH
        assertTrue(cheetos.isEligible(user2));  // Has Sepolia ETH
        assertFalse(cheetos.isEligible(user3)); // No Sepolia ETH
    }

    function testContractConstants() public view {
        assertEq(cheetos.CLAIM_AMOUNT(), 10e18);      // 10 CHE per claim
        assertEq(cheetos.maxTotalSupply(), 10000e18); // 10,000 CHE total
        assertEq(cheetos.MAX_CLAIMS(), 1000);         // 1000 max claims
        assertEq(cheetos.minETHRequired(), 1);        // 1 wei minimum
    }

    function testOwnerIsSet() public view {
        assertEq(cheetos.owner(), owner);
    }

    // ==================== Edge Cases ====================

    function testClaimWithExactlyOneWei() public {
        address oneWeiUser = address(0x999);
        vm.deal(oneWeiUser, 1 wei); // Exactly minimum required
        
        assertTrue(cheetos.isEligible(oneWeiUser));
        
        vm.prank(oneWeiUser);
        cheetos.claim();
        
        assertEq(cheetos.balanceOf(oneWeiUser), cheetos.CLAIM_AMOUNT());
    }

    function testCannotClaimWithZeroETH() public {
        address zeroUser = address(0x888);
        // Don't give any ETH (balance = 0)
        
        assertFalse(cheetos.isEligible(zeroUser));
        
        vm.prank(zeroUser);
        vm.expectRevert(Cheetos.NoSepoliaETH.selector);
        cheetos.claim();
    }

    // ==================== Fuzz Tests ====================

    function testFuzzClaimWithETH(address randomUser, uint256 ethAmount) public {
        vm.assume(randomUser != address(0));
        vm.assume(randomUser.code.length == 0); // Not a contract
        vm.assume(!cheetos.hasClaimed(randomUser)); // Haven't claimed yet
        vm.assume(ethAmount >= 1 wei && ethAmount <= 1000 ether); // Reasonable range
        
        // Give random user Sepolia ETH
        vm.deal(randomUser, ethAmount);
        
        // Should be eligible and able to claim
        assertTrue(cheetos.isEligible(randomUser));
        
        vm.prank(randomUser);
        cheetos.claim();
        
        assertEq(cheetos.balanceOf(randomUser), cheetos.CLAIM_AMOUNT());
        assertTrue(cheetos.hasClaimed(randomUser));
    }

    function testFuzzCannotClaimWithoutETH(address randomUser) public {
        vm.assume(randomUser != address(0));
        vm.assume(randomUser.balance == 0); // No ETH
        
        // Should not be eligible
        assertFalse(cheetos.isEligible(randomUser));
        
        vm.prank(randomUser);
        vm.expectRevert(Cheetos.NoSepoliaETH.selector);
        cheetos.claim();
    }
}
