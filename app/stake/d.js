'use client'
import { useEffect, useState } from 'react';
import Link from "next/link";
import { useWalletStore } from '@/store/walletStore';
import StakeAbi from '@/lib/abi/StakeAbi';
import ERC20abi from '@/lib/abi/Ecr20ABI';

const Staking = () => {
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('30');  // Default staking plan
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState(false);
  const {callTransactionFunction, callReadOnlyFunction, connectWallet, disconnectWallet, walletAddress} = useWalletStore()
  

  const handleStakeAmount= async(e)=>{
    setStakeAmount(e.target.value)
    if(e.target.value >0){
        setError(false);
    }

  }

  // Handle staking form submission
  const handleStake = async () => {
    if (!walletAddress) {
      setError("Please connect your wallet first.");
      return;
    }
    if (!stakeAmount || stakeAmount <= 0) {
      setError("Please enter a valid stake amount.");
      return;
    }
    
    
  
    // Map selectedPlan to the correct enum value for StakingPeriod
    let period;
    if (selectedPlan === "OneMonth") {
      period = 0; // StakingPeriod.OneMonth
    } else if (selectedPlan === "ThreeMonths") {
      period = 1; // StakingPeriod.ThreeMonths
    } else if (selectedPlan === "SixMonths") {
      period = 2; // StakingPeriod.SixMonths
    } else {
      setErrors("Invalid staking period selected.");
      return;
    }
  
    console.log(process.env.NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS, StakeAbi, 'stake', parseInt(stakeAmount), period);
    await handleApprove()
    
    const tx = await callTransactionFunction(process.env.NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS, StakeAbi, 'stake', stakeAmount, period);
    console.log({ tx });
  };
  

  const handleApprove = async()=>{
    const tx = await callTransactionFunction(process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS, ERC20abi, 'approve', process.env.NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS, stakeAmount);
    // console.log({ tx });

  }

  const handleEarly = async()=>{
    const tx = await callTransactionFunction(process.env.NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS, StakeAbi, 'earlyUnstake');
    console.log({ tx });

  }

  const handleConnect = async() => {
    connectWallet(StakeAbi, process.env.NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS)
    const currentReward = await callTransactionFunction(process.env.NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS, StakeAbi, 'getCurrentReward', walletAddress);
    const stakeAmount = await callTransactionFunction(process.env.NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS, StakeAbi, 'stakedAmount', walletAddress);
    const period = await callTransactionFunction(process.env.NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS, StakeAbi, 'stakingPeriods', walletAddress);
    console.log({currentReward, stakeAmount, period, walletAddress});

  }

  // useEffect(()=>{
  //   const loadwalletbalance = async()=>{
  //     const prebalance = await callTransactionFunction(process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS, ERC20abi, 'balanceOf', walletAddress);
 
  //     // const prebalance = await callReadOnlyFunction(ERC20abi, process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS, 'balanceOf', '0x91945BC2Fd5553134Ac76CAD1B164a8E989B3394')
  // console.log({"xxxxxxxxxxxxxxx":prebalance})
  //   }
  //   loadwalletbalance()
  // },[])

  const handleDisconnect = () => {
    disconnectWallet()
  }

  return (
    <div>
      {/* <section className="lg:flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 py-24 min-h-screen relative overflow-hidden"> */}
        <div className="text-center text-white px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            {/* Heading */}
            {/* <h2 className="text-5xl font-bold text-white">RBO - Stake Your Tokens</h2> */}

            {/* Subheading */}
            {/* <p className="text-xl text-gray-200">
              Secure your future by staking your tokens in our platform. Choose your staking plan and earn rewards based on your commitment!
            </p> */}

            {/* Staking Amount Input */}
            <div className="mt-8">
              <input
                type="number"
                value={stakeAmount}
                onChange={handleStakeAmount}
                placeholder="Enter amount to stake"
                className="bg-white/10 p-4 rounded-lg backdrop-blur-md text-white border border-gray-500 w-full text-lg ring-amber-300"
              />
              <span className='text-sm text-yellow-300'>{error? error:''}</span>
            </div>

            {/* Staking Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {/* 30 Days Plan */}
              <div
                onClick={() => setSelectedPlan('OneMonth')}
                className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 ${selectedPlan === 'OneMonth' ? 'border-2 border-yellow-400' : ''}`}
              >
                <h3 className="text-2xl font-semibold text-yellow-400">30 Days</h3>
                <p className="text-gray-200">Earn 10% Rewards</p>
              </div>

              {/* 90 Days Plan */}
              <div
                onClick={() => setSelectedPlan('ThreeMonths')}
                className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 ${selectedPlan === 'ThreeMonths' ? 'border-2 border-yellow-400' : ''}`}
              >
                <h3 className="text-2xl font-semibold text-yellow-400">90 Days</h3>
                <p className="text-gray-200">Earn 20% Rewards</p>
              </div>

              {/* 180 Days Plan */}
              <div
                onClick={() => setSelectedPlan('SixMonths')}
                className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 ${selectedPlan === 'SixMonths' ? 'border-2 border-yellow-400' : ''}`}
              >
                <h3 className="text-2xl font-semibold text-yellow-400">180 Days</h3>
                <p className="text-gray-200">Earn 35% Rewards</p>
              </div>
            </div>
            <span className='text-sm text-yellow-300'>{errors? errors:''}</span>


            {/* Wallet Connect Button */}
            <div className="mt-8">
              <button
                onClick={walletAddress? handleDisconnect: handleConnect}
                className="bg-yellow-400 text-black py-4 px-12 rounded-xl text-lg font-medium shadow-md hover:bg-yellow-500 transition-colors w-full"
              >
                {walletAddress ? walletAddress : 'Connect Wallet'}
              </button>
            </div>

            {/* Stake Button */}
            <div className="mt-8 flex gap-8">
            <button
                onClick={handleEarly}
                className="bg-yellow-400 text-black py-4 px-12 rounded-xl text-lg font-medium shadow-md hover:bg-yellow-500 transition-colors w-full"
              >
               Unstake Tokens
              </button>
              <button
                onClick={handleStake}
                className="bg-yellow-400 text-black py-4 px-12 rounded-xl text-lg font-medium shadow-md hover:bg-yellow-500 transition-colors w-full"
              >
                Stake Tokens
              </button>
            </div>

            {/* Information */}
            {/* <div className="mt-8">
              <p className="text-xl text-gray-200">
                By staking, you are locking your tokens into our platform and earning rewards based on your selected plan duration. Make sure to check your rewards after the staking period ends.
              </p>
            </div> */}
          </div>
        </div>
      {/* </section> */}
    </div>
  );
};

export default Staking;
