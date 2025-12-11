'use client'
import { usersAirdropData } from '@/lib/db';
import { useWalletStore } from '@/store/walletStore';
import { useState, useEffect } from 'react';
// import usersAirdropData from './usersAirdrop.json'; // Import JSON file

const AirDrop = () => {
  const {walletAddress} = useWalletStore()
  // Initially, the users data is empty or loaded from the JSON file
  // const [walletAddress, setWalletAddress] = useState('');
  const [userData, setUserData] = useState(null);

  // Find the user data by wallet address
  const findUserByWallet = (walletAddress) => {
    return usersAirdropData.find(user => user.walletAddress === walletAddress);
  };

  // Handle wallet address submission
  const handleWalletSubmit = () => {
    if (walletAddress) {
      const user = findUserByWallet(walletAddress);
      if (user) {
        // If user exists, load their data
        setUserData(user);
      } else {
        // If no user, create a new user object
        const newUser = {
          walletAddress,
          tasks: {
            twitter: false,
            facebook: false,
            instagram: false,
            telegram: false,
            youtube: false
          }
        };
        usersAirdropData.push(newUser); // Add to the in-memory array
        setUserData(newUser); // Set the new user data
      }
    }
  };

  // Handle task completion
  const handleTaskClick = (task) => {
    if (userData && !userData.tasks[task]) {
      const updatedTasks = { ...userData.tasks, [task]: true };
      const updatedUserData = { ...userData, tasks: updatedTasks };

      // Update in-memory users data
      const updatedUsersData = usersAirdropData.map(user =>
        user.walletAddress === userData.walletAddress ? updatedUserData : user
      );

      // Update state and in-memory data
      setUserData(updatedUserData);
      // usersAirdropData = updatedUsersData; // This is the modified data in memory
    }
  };

  return (
    <div>
      <section className="lg:flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 py-24 min-h-screen relative overflow-hidden">
        <div className="text-center text-white px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            <h2 className="text-5xl font-bold text-white">RBO - Be an early bird</h2>
            <p className="text-xl text-gray-200">
              Rabbito is a blockchain platform designed for changemakers...
            </p>

            {/* Sign up for Airdrop */}
            <div>
              <input
                type="text"
                placeholder="Enter your wallet address"
                className="px-4 py-2 rounded-md"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <button
                className="bg-yellow-400 text-black py-2 px-8 mt-4 rounded-md"
                onClick={handleWalletSubmit}
              >
                Sign Up
              </button>
            </div>

            {/* Only show tasks if user is logged in */}
            {userData && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {/* Twitter Card */}
                  <div
                    onClick={() => handleTaskClick('twitter')}
                    className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center ${userData.tasks.twitter ? 'bg-gray-600 pointer-events-none' : ''}`}
                  >
                    <img src="/images/t.png" alt="Twitter" className="w-16 h-16 object-contain" />
                    {userData.tasks.twitter && <span className="text-green-500 ml-4">Done</span>}
                  </div>

                  {/* Facebook Card */}
                  <div
                    onClick={() => handleTaskClick('facebook')}
                    className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center ${userData.tasks.facebook ? 'bg-gray-600 pointer-events-none' : ''}`}
                  >
                    <img src="/images/f.png" alt="Facebook" className="w-16 h-16 object-contain" />
                    {userData.tasks.facebook && <span className="text-green-500 ml-4">Done</span>}
                  </div>

                  {/* Instagram Card */}
                  <div
                    onClick={() => handleTaskClick('instagram')}
                    className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center ${userData.tasks.instagram ? 'bg-gray-600 pointer-events-none' : ''}`}
                  >
                    <img src="/images/i.png" alt="Instagram" className="w-16 h-16 object-contain" />
                    {userData.tasks.instagram && <span className="text-green-500 ml-4">Done</span>}
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    className="bg-yellow-400 text-black py-4 px-12 rounded-xl text-lg font-medium shadow-md hover:bg-yellow-500 transition-colors w-full"
                    onClick={() => alert("All tasks have been completed!")}
                  >
                    Claim Airdrop
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AirDrop;
