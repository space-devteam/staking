'use client'
import Presaleabi from '@/lib/abi/PresaleAbi';
import { useWalletStore } from '@/store/walletStore';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';

const LoginForm = ({amountInEther, setAmountInEther, amountInRBO, setAmountInRBO}) => {
  
  const {sendEtherToContract} =useWalletStore()
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async(e) => {
    setIsLoading(true)
    e.preventDefault();
    if(amountInEther < 0.01){
      setError('Minimum buy is 0.01 ETH')
      return
    }
    const tx = await sendEtherToContract(process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS, Presaleabi, "buyTokens", amountInEther)
    console.log('Password:', tx);
    setError('')
    setIsLoading(false) 
  };

  const handleOnchangeInEther = (e) => {  
    
    setAmountInEther(e.target.value)
    if(e.target.value >= 0.01){
      setError('')
    }
    setAmountInRBO(e.target.value *10000)
    }

  const handleOnchangeInRBO = (e) => { 
    setAmountInEther(e.target.value/10000)
    setAmountInRBO(e.target.value)
    if(e.target.value >= 100){
      setError('')
    }
  }
  

  return (
    <div className="flex bg-white/10 items-center justify-center w-full">
      <div className="w-full p-8 space-y-6  rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold r text-gray-300">In Progress</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amountInEther" className="block text-sm font-medium text-yellow-500">
              ETH
            </label>
            <input
              type="number"
              id="amountInEther"
              value={amountInEther}
              onChange={handleOnchangeInEther}
              className="w-full px-4 py-2 mt-2 text-sm border bg-gray-200 "
              placeholder="00.00 ETH"
              required
            />
          </div>

          <div>
            <label htmlFor="amountInRBO" className="block text-sm font-medium text-yellow-500">
              RBO
            </label>
            <input
              type="Number"
              id="amountInRBO"
              value={amountInRBO}
              onChange={handleOnchangeInRBO}
              className="w-full px-4 py-2 mt-2 text-sm border bg-gray-200"
              placeholder="00.00 RBO"
              required
            />
          <span className='text-gray-300 text-sm'>{error? error:''}</span>
          </div>

          <button
            type="submit"
            className="w-full font-bold py-2 mt-4 text-white bg-yellow-500"
          >
             {isLoading ? (
            <Loader className="text-white dark:text-white animate-spin mx-auto" size={34} />
          ) : (
            'Buy'
          )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
