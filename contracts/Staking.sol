// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract StakingContract is Ownable, ReentrancyGuard {
    IERC20 public token; // The token to stake
    uint256 public rewardRate; // Annual reward rate in basis points (100 = 1%)
    uint256 public totalStaked; // Total tokens staked in the contract

    mapping(address => uint256) public stakedAmount; // Tracks staked tokens for each user
    mapping(address => uint256) public stakeTime; // Tracks the staking time for each user
    mapping(address => uint256) public rewards; // Tracks rewards for each user
    mapping(address => StakingPeriod) public stakingPeriods; // Tracks the selected staking period for each user

    uint256 constant SECONDS_IN_3_MONTHS = 90 days;
    uint256 constant SECONDS_IN_A_MONTH = 30 days;
    uint256 constant SECONDS_IN_6_MONTHS = 180 days;

    // Enum to represent the staking period
    enum StakingPeriod { OneMonth, SixMonths, ThreeMonths }

    event Staked(address indexed user, uint256 amount, StakingPeriod period);
    event Unstaked(address indexed user, uint256 amount);
    event RewardPaid(address indexed user, uint256 reward);
    event EarlyUnstaked(address indexed user, uint256 amount, uint256 penaltyReward);
    event AutoUnstaked(address indexed user, uint256 amount, uint256 reward);

    constructor(IERC20 _token) Ownable(msg.sender) {
        token = _token;
        rewardRate = 15000; // 150% annual reward rate (15000 basis points)
    }

    // Function to stake tokens with a selected stake period
    function stake(uint256 amount, StakingPeriod period) external {
        require(amount > 0, "Amount must be greater than 0");
        require(period == StakingPeriod.OneMonth || period == StakingPeriod.SixMonths || period == StakingPeriod.ThreeMonths, "Invalid staking period");

        uint256 adjustedAmount = amount;
        token.transferFrom(msg.sender, address(this), adjustedAmount); // Transfer tokens from user to contract
        stakedAmount[msg.sender] += amount;
        stakeTime[msg.sender] = block.timestamp; // Record the time of staking
        stakingPeriods[msg.sender] = period; // Record the staking period
        totalStaked += amount;

        emit Staked(msg.sender, amount, period);
    }

    // Function to automatically unstake when the staking period has elapsed
    function autoUnstake() external nonReentrant {
        require(stakedAmount[msg.sender] > 0, "No tokens to unstake");

        StakingPeriod selectedPeriod = stakingPeriods[msg.sender];
        uint256 stakingDuration = block.timestamp - stakeTime[msg.sender];

        // Check if the staking period has passed
        if (stakingDuration >= getPeriodInSeconds(selectedPeriod)) {
            uint256 rewardAmount = calculateReward(msg.sender);

            // Transfer staked tokens and rewards to the user
            uint256 unstakedAmount = stakedAmount[msg.sender];
            stakedAmount[msg.sender] = 0; // Reset the staked amount
            rewards[msg.sender] = 0; // Reset the rewards
            stakeTime[msg.sender] = block.timestamp; // Reset the staking time
            stakingPeriods[msg.sender] = StakingPeriod.OneMonth; // Reset stake period to default (OneMonth)
            totalStaked -= unstakedAmount;

            // Transfer the staked tokens and rewards to the user
            token.transfer(msg.sender, unstakedAmount + rewardAmount); // Transfer tokens and reward

            emit Unstaked(msg.sender, unstakedAmount);
            emit AutoUnstaked(msg.sender, unstakedAmount, rewardAmount); // Emit event for auto unstake
        }
    }

    // Function to manually unstake tokens before the staking period has ended
    function earlyUnstake() external nonReentrant {
        require(stakedAmount[msg.sender] > 0, "No tokens to unstake");
        
        uint256 stakingDuration = block.timestamp - stakeTime[msg.sender];
        uint256 penalty = 0; // Initialize penalty variable
        uint256 rewardAmount = calculateReward(msg.sender); // Calculate rewards for the user

        StakingPeriod selectedPeriod = stakingPeriods[msg.sender];

        // If the staking period hasn't elapsed (e.g., 1 year, 6 months, or 1 month), apply a penalty to rewards
        if (stakingDuration < getPeriodInSeconds(selectedPeriod)) {
            // Apply a penalty: if unstaking early, lose part of the reward
            penalty = rewardAmount / 2; // For example, 50% penalty for early unstaking
            rewardAmount -= penalty;  // Apply the penalty
        }

        // Reset user's staking data
        uint256 unstakedAmount = stakedAmount[msg.sender];
        stakedAmount[msg.sender] = 0;
        rewards[msg.sender] = 0; // Reset rewards
        stakeTime[msg.sender] = block.timestamp; // Reset staking time
        stakingPeriods[msg.sender] = StakingPeriod.OneMonth; // Reset stake period to default (OneMonth)
        totalStaked -= unstakedAmount;

        // Transfer the staked tokens and rewards (minus penalty) to the user
        token.transfer(msg.sender, unstakedAmount + rewardAmount); // Transfer staked tokens and remaining reward

        // Emit events
        emit Unstaked(msg.sender, unstakedAmount);
        emit RewardPaid(msg.sender, rewardAmount);
        emit EarlyUnstaked(msg.sender, unstakedAmount, penalty); // Event for early unstaking with penalty
    }

    // Function to calculate rewards for a staker
    function calculateReward(address staker) internal view returns (uint256) {
        uint256 stakingDuration = block.timestamp - stakeTime[staker]; // Duration staked in seconds
        uint256 selectedPeriod = getPeriodInSeconds(stakingPeriods[staker]); // Get the selected staking period in seconds
        uint256 reward = (stakedAmount[staker] * rewardRate * stakingDuration) / (selectedPeriod * 100); // Linear reward calculation
        return reward;
    }

    // Function to convert the staking period enum into its corresponding number of seconds
    function getPeriodInSeconds(StakingPeriod period) internal pure returns (uint256) {
        if (period == StakingPeriod.OneMonth) {
            return SECONDS_IN_A_MONTH;
        } else if (period == StakingPeriod.SixMonths) {
            return SECONDS_IN_6_MONTHS;
        } else {
            return SECONDS_IN_3_MONTHS;
        }
    }

    // Function to claim rewards manually
    function claimReward() external nonReentrant {
        uint256 reward = calculateReward(msg.sender);
        require(reward > 0, "No rewards available");
        rewards[msg.sender] += reward;
        stakeTime[msg.sender] = block.timestamp; // Reset the staking time after reward is claimed
        token.transfer(msg.sender, reward); // Transfer the reward to the user
        emit RewardPaid(msg.sender, reward);
    }

    // Emergency withdraw function for the owner
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        token.transfer(msg.sender, amount);
    }

    // Function for the owner to adjust the reward rate
    function setRewardRate(uint256 newRewardRate) external onlyOwner {
        rewardRate = newRewardRate;
    }

    // Function to return the current reward of a specific user (accepts address as a parameter)
    function getCurrentReward(address user) external view returns (uint256) {
        return calculateReward(user); // Return the calculated reward for the given address
    }
}