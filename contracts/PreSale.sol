// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Contract: PresaleSmartContract
// -------------------------------------
// Variables:
//     - token (the ERC20 token contract being sold)
//     - rate (the number of tokens a buyer gets per 1 ETH)
//     - presaleStart (timestamp for when presale starts)
//     - presaleEnd (timestamp for when presale ends)
//     - isPresaleActive (flag to check if presale is active)

// Events:
//     - TokensPurchased (buyer, tokenAmount, ethCost)

// Modifiers:
//     - whenPresaleActive: Check if presale is ongoing (between start and end time)

// Functions:

// 1. Constructor:
//     - Set the token address, rate, presale start time, and presale end time.
//     - Set presale as active.

// 2. BuyTokens Function:
//     - Ensure that the presale is active (check time window).
//     - Ensure the buyer sends ETH (check if ETH > 0).
//     - Calculate the number of tokens the buyer gets based on the rate.
//     - Ensure the presale contract has enough tokens to give to the buyer.
//     - Transfer tokens to the buyer.
//     - Emit TokensPurchased event (buyer, amount, cost in ETH).

// 3. Withdraw ETH (Owner function):
//     - Allow the owner to withdraw ETH accumulated during the presale.

// 4. Withdraw Remaining Tokens (Owner function):
//     - After the presale ends, allow the owner to withdraw any unsold tokens from the contract.

// 5. Stop Presale (Owner function):
//     - The owner can manually stop the presale if needed.

// 6. Update Presale Period (Owner function):
//     - Allow the owner to update the presale start and end times.

// 7. Check Presale Status (Public function):
//     - Check if the presale is active (between start and end time).

// Flow:
// - When a buyer wants to purchase tokens:
//     - Buyer sends ETH to the contract.
//     - The contract checks if the presale is active.
//     - The contract calculates the token amount based on the rate.
//     - If enough tokens are available, the contract transfers tokens to the buyer.
//     - The contract emits a "TokensPurchased" event.

// - After the presale ends:
//     - The owner can withdraw any unsold tokens.
//     - The owner can withdraw any ETH raised during the presale.

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract FmcTokenPresale is Ownable {

    IERC20 public token;  // The token being sold
    uint256 public rate;  // Number of tokens per Ether (ETH)
    uint256 public presaleStart;  // Presale start timestamp
    uint256 public presaleEnd;    // Presale end timestamp
    bool public isPresaleActive; 



    uint256 public totalTokensSold;  // Total tokens sold during the presale
    uint256 public totalETHRaised;  // Total ETH raised during the presale
    uint256 public totalBuyers;     // Total number of unique buyers

    mapping(address => bool) public hasPurchased; 



    constructor(IERC20 _token, uint256 _rate, uint256 _start, uint256 _end) Ownable(msg.sender){
        token = _token;
        rate = _rate;
        presaleStart = _start;
        presaleEnd = _end;
        isPresaleActive = true;
    }

     modifier whenPresaleActive() {
        // require(isPresaleActive, "Presale is not active");
        // require(block.timestamp >= presaleStart, "Presale has not started yet");
        // require(block.timestamp <= presaleEnd, "Presale has ended");
        _;
    }


    // Function to buy tokens during the presale
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);
    function buyTokens() external payable whenPresaleActive {
        require(msg.value > 0, "You must send ETH to purchase tokens");

        uint256 tokenAmount = msg.value * rate;
        uint256 cost = msg.value;  // Cost in ETH

        // Ensure that the contract has enough tokens for the sale
        uint256 contractBalance = token.balanceOf(address(this));
        require(contractBalance >= tokenAmount, "Insufficient tokens in the presale contract");

        // Transfer tokens to the buyer
        token.transfer(msg.sender, tokenAmount);

        // Emit event
        emit TokensPurchased(msg.sender, tokenAmount, cost);
    }


    // Owner can withdraw Ether from the presale contract
    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No Ether to withdraw");
        payable(owner()).transfer(balance);
    }


    // Owner can withdraw unsold tokens from the presale contract after the presale ends
    function withdrawRemainingTokens() external onlyOwner {
        require(block.timestamp > presaleEnd, "Presale has not ended yet");
        uint256 remainingTokens = token.balanceOf(address(this));
        require(remainingTokens > 0, "No tokens to withdraw");
        token.transfer(owner(), remainingTokens);
    }

       function stopPresale() external onlyOwner {
        isPresaleActive = false;
    }

    // Function to update the presale rate (tokens per ETH)
    function setRate(uint256 newRate) external onlyOwner {
        rate = newRate;
    }
//Function to update presale start and end time
    function updatePresalePeriod(uint256 newStart, uint256 newEnd) external onlyOwner {
        presaleStart = newStart;
        presaleEnd = newEnd;
    }

  // Function to check if presale is still active (helper function)
    function checkPresaleStatus() external view returns (bool) {
        return isPresaleActive && block.timestamp >= presaleStart && block.timestamp <= presaleEnd;
    }


     // Analytics function to get total tokens sold
    function getTotalTokensSold() external view returns (uint256) {
        return totalTokensSold;
    }

    // Analytics function to get total ETH raised
    function getTotalETHRaised() external view returns (uint256) {
        return totalETHRaised;
    }

    // Analytics function to get the total number of unique buyers
    function getTotalBuyers() external view returns (uint256) {
        return totalBuyers;
    }

    // Analytics function to get remaining tokens in the presale contract
    function getRemainingTokens() external view returns (uint256) {
        return token.balanceOf(address(this));
    }
}