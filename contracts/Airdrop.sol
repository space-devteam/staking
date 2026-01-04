// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// CONTRACT: AirdropSmartContract
//--------------------------------
// VARIABLES:
// - token: IERC20 (The token to be distributed in the airdrop)
// - whitelistedAddresses: mapping(address => bool) (Whitelist for eligible addresses)
// - owner: address (Owner of the contract)
// - event: Airdrop(address recipient, uint256 amount) (Event to track airdrop activity)

// FUNCTIONS:

// 1. CONSTRUCTOR(token: IERC20):
//    - Initialize the contract with the token address

// 2. FUNCTION setWhitelist(address[] addresses, bool status):
//    - OnlyOwner can add or remove addresses from the whitelist
//    - Loop through each address in 'addresses':
//      - Set the status of the address in whitelistedAddresses to 'status'

// 3. FUNCTION airdrop(address[] recipients, uint256 amountPerRecipient):
//    - OnlyOwner can perform the airdrop
//    - Check that the contract has enough tokens to perform the airdrop
//    - Calculate the total tokens required for the airdrop
//    - Loop through each recipient in 'recipients':
//      - Check if the recipient is whitelisted (if applicable)
//      - Transfer the specified amount of tokens to the recipient
//      - Emit the Airdrop event for the recipient and amount

// 4. FUNCTION withdrawRemainingTokens():
//    - OnlyOwner can withdraw tokens from the contract
//    - Calculate the remaining tokens in the contract
//    - Transfer the remaining tokens to the owner’s address

// 5. EVENT: Airdrop(address recipient, uint256 amount):
//    - Triggered when tokens are successfully distributed to a recipient

// ---

// ### Workflow in the Contract:

// 1. The **constructor** is called to initialize the contract with the specified token.
// 2. The **setWhitelist** function allows the owner to manage the whitelist of addresses eligible for the airdrop.
// 3. The **airdrop** function allows the owner to distribute tokens to multiple addresses at once. It checks if the recipients are whitelisted (if applicable) and transfers the specified number of tokens.
// 4. The **withdrawRemainingTokens** function lets the owner withdraw any unused tokens left in the contract after the airdrop is complete.

// ---

// ### High-Level Airdrop Process:

// 1. **Owner Sets the Whitelist** (optional):
//    - The owner can set eligible addresses in the whitelist to receive tokens.

// 2. **Owner Initiates the Airdrop**:
//    - The owner triggers the airdrop function with a list of recipients and the amount of tokens each should receive.

// 3. **Token Distribution**:
//    - The contract transfers tokens to each recipient, ensuring there are enough tokens in the contract.

// 4. **Event Emission**:
//    - For each recipient, an `Airdrop` event is emitted with the recipient’s address and the amount of tokens sent.

// 5. **Withdraw Remaining Tokens**:
//    - The owner can withdraw any remaining tokens in the contract.

// ---

// ### Additional Notes:

// - The contract checks if the recipient is **whitelisted** before transferring tokens.
// - The contract ensures there are enough **tokens available** in the contract before proceeding with the airdrop.
// - After the airdrop is completed, the owner can **withdraw any remaining tokens** from the contract.
// - The airdrop process emits **events** to log who received tokens and how much they got.

// ---

// ### Potential Enhancements:

// 1. **Batching the Airdrop**: Instead of looping through all recipients in one call, you could batch the process to avoid running into gas limitations for large numbers of recipients.
// 2. **Limit Airdrop to Certain Addresses**: You can limit the number of tokens distributed to an individual (if needed) or add additional logic for eligibility.
// 3. **Gas Optimization**: For very large lists of recipients, consider optimizing the contract by using off-chain methods or splitting the airdrop into smaller chunks.

// ---

// This pseudo code provides a basic blueprint for your Airdrop Smart Contract. If you need more specific adjustments or additions, feel free to ask!




import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AirdropSmartContract is Ownable {
    IERC20 public token;  // The token to be distributed in the airdrop

    // Optional: List of whitelisted addresses
    mapping(address => bool) public whitelistedAddresses;

    event Airdrop(address indexed recipient, uint256 amount);

    // Constructor to initialize the token address
    constructor(IERC20 _token) Ownable(msg.sender) {
        token = _token;
    }

    // Function to set the whitelist (only owner can add or remove from whitelist)
    function setWhitelist(address[] memory addresses, bool status) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelistedAddresses[addresses[i]] = status;
        }
    }

    // Function to perform the airdrop to multiple addresses
    function airdrop(address[] memory recipients, uint256 amountPerRecipient) external onlyOwner {
        uint256 totalAmount = recipients.length * amountPerRecipient;
        uint256 contractBalance = token.balanceOf(address(this));
        
        // Ensure the contract has enough tokens
        require(contractBalance >= totalAmount, "Insufficient token balance in contract");

        // Loop through each recipient and send them tokens
        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            
            // Optional: Check if the recipient is whitelisted (if whitelist is enabled)
            if (whitelistedAddresses[recipient]) {
                token.transfer(recipient, amountPerRecipient);
                emit Airdrop(recipient, amountPerRecipient);
            }
        }
    }

    // Owner can withdraw any remaining tokens (if any) after the airdrop
    function withdrawRemainingTokens() external onlyOwner {
        uint256 remainingTokens = token.balanceOf(address(this));
        require(remainingTokens > 0, "No remaining tokens to withdraw");
        token.transfer(owner(), remainingTokens);
    }
}
