'use client';
import ERC20abi from '@/lib/abi/Ecr20ABI';
import { useWalletStore } from '@/store/walletStore';
import { Loader } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const TabContent = ({ title, amount, setAmount, address, setAddress, handleSubmit, isLoading }) => (
  <div className="flex bg-white/10 items-center justify-center w-full">
    <div className="w-full p-8 space-y-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-100">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-yellow-500">
            ETH
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-sm border bg-gray-200"
            placeholder="00.00 ETH"
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-yellow-500">
            RBO
          </label>
          <input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 mt-2 text-sm border bg-gray-200"
            placeholder="00.00 RBO"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full font-bold py-2 mt-4 text-white bg-yellow-500"
        >
          {isLoading ? (
            <Loader className="text-white dark:text-white animate-spin mx-auto" size={34} />
          ) : (
            'Mint'
          )}
        </button>
      </form>
    </div>
  </div>
);

const TabContainer = () => {
  const [activeTab, setActiveTab] = useState('presale');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const { callTransactionFunction } = useWalletStore();

  // Define contract addresses
  const presaleAddress = process.env.NEXT_PUBLIC_PRESALE_CONTRACT_ADDRESS;
  const airdropAddress = process.env.NEXT_PUBLIC_AIRDROP_CONTRACT_ADDRESS;
  const stakeAddress = process.env.NEXT_PUBLIC_STAKE_CONTRACT_ADDRESS;

  // Update address based on the active tab
  useEffect(() => {
    if (activeTab === 'presale') {
      setAddress(presaleAddress);
    } else if (activeTab === 'airdrop') {
      setAddress(airdropAddress);
    } else if (activeTab === 'stake') {
      setAddress(stakeAddress);
    }
  }, [activeTab, presaleAddress, airdropAddress, stakeAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Set loading to true when submitting the transaction

    console.log('amount:', amount);
    console.log('address:', address);

    try {
      const tx = await callTransactionFunction(
        process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS,
        ERC20abi,
        'mint',
        address,
        amount
      );
      console.log('tx:', tx);
      setIsLoading(false); // Reset loading state after transaction completes

    } catch (error) {
      console.error('Error in transaction:', error);
      setIsLoading(false); // Reset loading state after transaction completes

    } finally {
      setIsLoading(false); // Reset loading state after transaction completes
    }
  };

  return (
    <div className="container mx-auto p-8">
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 font-semibold ${activeTab === 'presale' ? 'text-yellow-500' : 'text-gray-200'}`}
          onClick={() => setActiveTab('presale')}
        >
          Fund Presale
        </button>
        <button
          className={`px-4 py-2 font-semibold ${activeTab === 'airdrop' ? 'text-yellow-500' : 'text-gray-200'}`}
          onClick={() => setActiveTab('airdrop')}
        >
          Fund Airdrop
        </button>
        <button
          className={`px-4 py-2 font-semibold ${activeTab === 'stake' ? 'text-yellow-500' : 'text-gray-200'}`}
          onClick={() => setActiveTab('stake')}
        >
          Fund Stake
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'presale' && (
        <TabContent
          title="Fund Presale"
          amount={amount}
          setAmount={setAmount}
          address={address}
          setAddress={setAddress}
          handleSubmit={handleSubmit}
          isLoading={isLoading} // Pass the loading state to TabContent
        />
      )}
      {activeTab === 'airdrop' && (
        <TabContent
          title="Fund Airdrop"
          amount={amount}
          setAmount={setAmount}
          address={address}
          setAddress={setAddress}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
      {activeTab === 'stake' && (
        <TabContent
          title="Fund Stake"
          amount={amount}
          setAmount={setAmount}
          address={address}
          setAddress={setAddress}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default TabContainer;
