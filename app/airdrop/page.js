"use client";
import { useEffect, useState } from "react";
import { useWalletStore } from "@/store/walletStore";
import ERC20abi from "@/lib/abi/Ecr20ABI";

const AirDrop = () => {
  const { walletAddress, connectWallet } = useWalletStore();
  const [taskCompletion, setTaskCompletion] = useState({
    twitter: false,
    facebook: false,
    instagram: false,
    telegram: false,
    youtube: false,
  });

  // Fetch task status for the connected wallet address
  useEffect(() => {
    if (walletAddress) {
      fetch(`/api/airdrop?walletAddress=${walletAddress}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.tasks) {
            setTaskCompletion(data.tasks);
          }
        })
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [walletAddress]);

  // Function to handle task completion
  const handleTaskClick = async (task, url) => {
    if(!walletAddress){
      handleConnect()
    }

    if (!taskCompletion[task]) {
      // Open the link in a new tab
      window.open(url, "_blank");

      // Mark the task as completed
      const updatedTasks = { ...taskCompletion, [task]: true };
      setTaskCompletion(updatedTasks);

      // Send the updated task status to the backend
      await fetch('/api/airdrop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, tasks: updatedTasks }),
      });
    }
  };

  const handleConnect = () => {
    connectWallet(ERC20abi, process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS);
  };
  return (
    <div>
      <section className="lg:flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 py-24 min-h-screen relative overflow-hidden">
        {/* Heading */}
        <div className="text-center text-white px-4 md:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            {/* Heading */}
            <h2 className="text-5xl font-bold text-white">
              RBO - Be an early bird
            </h2>

            {/* Subheading */}
            <p className="text-xl text-gray-200">
              Rabbito is a blockchain platform designed for changemakers,
              innovators, and visionaries, offering the tools and technologies
              needed to unlock opportunities for the many, not just the few, and
              drive positive global transformation.
            </p>

            {/* Social Media Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {/* Twitter Card */}
              <div
                onClick={() =>
                  handleTaskClick("twitter", "https://twitter.com/YourHandle")
                }
                className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center ${
                  taskCompletion.twitter
                    ? "bg-gray-600 pointer-events-none"
                    : ""
                }`}
              >
                <img
                  src="/images/t.png"
                  alt="Twitter"
                  className="w-16 h-16 object-contain"
                />
                {taskCompletion.twitter && (
                  <span className="text-green-500 ml-4">Done</span>
                )}
              </div>

              {/* Facebook Card */}
              <div
                onClick={() =>
                  handleTaskClick(
                    "facebook",
                    "https://facebook.com/YourFacebook"
                  )
                }
                className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center ${
                  taskCompletion.facebook
                    ? "bg-gray-600 pointer-events-none"
                    : ""
                }`}
              >
                <img
                  src="/images/f.png"
                  alt="Facebook"
                  className="w-16 h-16 object-contain"
                />
                {taskCompletion.facebook && (
                  <span className="text-green-500 ml-4">Done</span>
                )}
              </div>

              {/* Instagram Card */}
              <div
                onClick={() =>
                  handleTaskClick(
                    "instagram",
                    "https://instagram.com/YourInstagram"
                  )
                }
                className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center ${
                  taskCompletion.instagram
                    ? "bg-gray-600 pointer-events-none"
                    : ""
                }`}
              >
                <img
                  src="/images/i.png"
                  alt="Instagram"
                  className="w-16 h-16 object-contain"
                />
                {taskCompletion.instagram && (
                  <span className="text-green-500 ml-4">Done</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {/* Telegram Card */}
              <div
                onClick={() =>
                  handleTaskClick("telegram", "https://t.me/YourTelegramGroup")
                }
                className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center ${
                  taskCompletion.telegram
                    ? "bg-gray-600 pointer-events-none"
                    : ""
                }`}
              >
                <img
                  src="/images/te.png"
                  alt="Telegram"
                  className="w-16 h-16 object-contain"
                />
                {taskCompletion.telegram && (
                  <span className="text-green-500 ml-4">Done</span>
                )}
              </div>

              {/* YouTube Card */}
              <div
                onClick={() =>
                  handleTaskClick("youtube", "https://youtube.com/YourYouTube")
                }
                className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center ${
                  taskCompletion.youtube
                    ? "bg-gray-600 pointer-events-none"
                    : ""
                }`}
              >
                <img
                  src="/images/y.png"
                  alt="YouTube"
                  className="w-16 h-16 object-contain"
                />
                {taskCompletion.youtube && (
                  <span className="text-green-500 ml-4">Done</span>
                )}
              </div>

              {/* Minimum Buy */}
              <div
                onClick={() =>
                  handleTaskClick("youtube", "https://discord.com/YourYouTube")
                }
                className={`bg-white/10 p-6 rounded-lg backdrop-blur-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center ${
                  taskCompletion.youtube
                    ? "bg-gray-600 pointer-events-none"
                    : ""
                }`}
              >
                <img
                  src="/images/d.png"
                  alt="YouTube"
                  className="w-16 h-16 object-contain"
                />
                {taskCompletion.youtube && (
                  <span className="text-green-500 ml-4">Done</span>
                )}
              </div>
            </div>

            {/* Claim Airdrop Button */}
            <div className="mt-8">
              <button
                className="bg-yellow-400 text-black py-4 px-12 rounded-xl text-lg font-medium shadow-md hover:bg-yellow-500 transition-colors w-full"
                onClick={
                  walletAddress
                    ? () => alert("All tasks have been completed!")
                    : handleConnect
                }
              >
                {walletAddress ? "Claim Airdrop" : "Connect Wallet"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AirDrop;
