'use client'
import LoginForm from "@/components/forms/Textbox";
import PresaleStepsTimeline from "@/components/PresaleTimeline";
import { useWalletStore } from "@/store/walletStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Staking from "./d";
import StakeAbi from "@/lib/abi/StakeAbi";
import { ethers } from "ethers";
// import { useRouter } from "next/navigation";
// import GlowingH1 from "./Glowtext";

const PreSale = () => {


  const {callTransactionFunction, callReadOnlyFunction, connectWallet, disconnectWallet, walletAddress} = useWalletStore()
  const [currentReward, setcurrentReward] = useState()
  const [sakeAmount, setstakeAmount] = useState()
  const [period, setperiod] = useState()

  useEffect(()=>{
    const fetch = async ()=>{
      const currentReward = await callTransactionFunction(process.env.NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS, StakeAbi, 'getCurrentReward', walletAddress);
      const stakeAmount = await callTransactionFunction(process.env.NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS, StakeAbi, 'stakedAmount', walletAddress);
      const period = await callTransactionFunction(process.env.NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS, StakeAbi, 'stakingPeriods', walletAddress);
      console.log({currentReward, stakeAmount, period, walletAddress});
      setcurrentReward(currentReward)
      setstakeAmount(stakeAmount)
      setperiod( period)
      
    }
    fetch()
    console.log({sakeAmount})
  },[walletAddress])
  

 
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 ">
      <section className="lg:flex  max-w-[90rem] mx-auto items-center justify-center py-24 min-h-screen relative overflow-hidden">
        {/* Heading */}
        <div className="text-center text-white px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            {/* Heading */}
            <h2 className="text-5xl font-bold text-white">RBO - Stake Your Tokens</h2>

{/* Subheading */}
<p className="text-xl text-gray-200">
  Secure your future by staking your tokens in our platform. Choose your staking plan and earn rewards based on your commitment!
</p>
            {/* Token Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                <h3 className="text-2xl font-semibold text-yellow-400">
                  100M+
                </h3>
                <p className="text-gray-200">Total Stake</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                <h3 className="text-2xl font-semibold text-yellow-400">20%</h3>
                <p className="text-gray-200">Reward%</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                <h3 className="text-2xl font-semibold text-yellow-400">
                  {/* 0{ethers.formatUnits(v.stakeAmount.msg, 18)} */}
                  {0}
                </h3>
                <p className="text-gray-200">Stake Amount</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                <h3 className="text-2xl font-semibold text-yellow-400">
                 0{}
                </h3>
                <p className="text-gray-200">Stake Reward </p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                <h3 className="text-2xl font-semibold text-yellow-400">30 Days</h3>
                <p className="text-gray-200">Period</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                <h3 className="text-2xl font-semibold text-yellow-400">
                  1000
                </h3>
                <p className="text-gray-200">Minimum</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-xl text-gray-200">
                By staking, you are locking your tokens into our platform and earning rewards based on your selected plan duration. Make sure to check your rewards after the staking period ends.
              </p>
            </div>
            {/* Call-to-Action Button */}
            {/* <div className="space-x-4 ">
              <button  className="bg-yellow-400 text-black py-3 px-8 rounded-xl text-lg font-medium shadow-md hover:bg-yellow-500 transition-colors mt-8">
                Airdrop
              </button>
              <button className="hidden md:inline border-[2px] border-yellow-400 text-white font-bold py-2 px-8 rounded-xl text-lg shadow-md hover:bg-yellow-500 transition-colors mt-8">
                Connect Wallet
              </button>
            </div> */}
          </div>
        </div>

        <div className="lg:w-2/4">
        {/* <LoginForm amountInEther={amountInEther} setAmountInEther={setAmountInEther} amountInRBO={amountInRBO} setAmountInRBO={setAmountInRBO}/> */}
        <Staking/>
        </div>
      </section>
    </div>
  );
};

export default PreSale;
