// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract RBOToken is ERC20Capped, Ownable {
    uint256 public burnRate;  // Burn rate as a percentage (e.g., 1% = 100)
    uint256 private constant BURN_RATE_DIVISOR = 10000;

    constructor() ERC20("RBOToken", "RBO") ERC20Capped(100000000 * (10 ** decimals())) Ownable(msg.sender){
        burnRate = 0;
        _mint(owner(), 20000000 * (10 ** decimals()));
    }

      function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <=  cap(), "Exceeds max supply");
        _mint(to,   amount * (10 ** decimals()));
    }


    // Override transfer to include the burn functionality
    function _update(address from, address to, uint256 amount) internal virtual override {
        if (from == address(0)) {
            // Minting: No burn
            super._update(from, to, amount);
        } else if (to == address(0)) {
            // Burning: No transfer
            super._update(from, to, amount);
        } else {
            // Transfer with burn
            uint256 burnAmount = (amount * burnRate) / BURN_RATE_DIVISOR;
            uint256 amountAfterBurn = amount - burnAmount;

            // Burn the tokens
            if (burnAmount > 0) {
                super._update(from, address(0), burnAmount);
            }

            // Transfer the remaining tokens
            super._update(from, to, amountAfterBurn);
        }
    }

     // Function to allow owner to set the burn rate (in basis points, e.g., 100 = 1%)
    function setBurnRate(uint256 newBurnRate) external onlyOwner {
        require(newBurnRate <= 1000, "Burn rate must be <= 10%");  // Example max limit of 10% burn rate
        burnRate = newBurnRate;
    }

    
}