'use client'

import About from "@/components/About";
import FAQSection from "@/components/Faq";
import HeroPage from "@/components/HeroPage";
import Navbar from "@/components/NavBar";
import RoadmapSection from "@/components/TimeLine";
import Tokenomics from "@/components/TokenNomics";
import { useState, useEffect } from "react";

// Dummy Data for the landing page
const DummyData = {
  tokenName: "MyToken",
  tokenSymbol: "MTK",
  totalSupply: "100,000,000",
  presalePrice: "0.05 USD",
  presaleStartDate: new Date().toISOString(),
  presaleEndDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  softCap: "500,000 USD",
  hardCap: "2,000,000 USD",
  raisedAmount: "100,000 USD",
};

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeLeft(targetDate) {
    const difference = new Date(targetDate) - new Date();
    let time = {};
    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      time = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return time;
  }

  return (
    <div className="flex space-x-6 justify-center text-white">
      <div className="flex flex-col items-center">
        <span className="text-4xl font-semibold text-white">{timeLeft.days}</span>
        <span className="text-sm">Days</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-semibold text-white">{timeLeft.hours}</span>
        <span className="text-sm">Hours</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-semibold text-white">{timeLeft.minutes}</span>
        <span className="text-sm">Minutes</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-4xl font-semibold text-white">{timeLeft.seconds}</span>
        <span className="text-sm">Seconds</span>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-800 min-h-screen text-white">
      {/* Header */}

      <HeroPage/>
      <About/>
      <Tokenomics/>
      <RoadmapSection/>
      <FAQSection/>
      {/* Presale Section */}
      {/* <section id="presale" className="py-16 bg-gray-900 text-center space-y-8">
        <h2 className="text-4xl font-bold text-yellow-400">Token Presale</h2>
        <p className="text-lg text-gray-400">Get in early! Secure your tokens now.</p>

        <div className="space-y-4">
          <p className="text-xl font-medium text-white">Presale Price: {DummyData.presalePrice}</p>
          <p className="text-xl font-medium text-white">Raised: {DummyData.raisedAmount} of {DummyData.hardCap}</p>
          <p className="text-xl font-medium text-white">Soft Cap: {DummyData.softCap}</p>
        </div>

        <Countdown targetDate={DummyData.presaleEndDate} />

        <button className="bg-indigo-600 text-white py-3 px-8 rounded-xl shadow-lg mt-6 hover:bg-indigo-700 transition-all">
          Buy Tokens Now
        </button>
      </section> */}

      {/* Airdrop Section */}
      {/* <section id="airdrop" className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center space-y-8">
        <h2 className="text-4xl font-bold">Airdrop</h2>
        <p className="text-lg text-gray-200">Join our airdrop and earn free tokens just by participating!</p>

        <div className="space-y-4">
          <p className="text-xl text-white">To Participate:</p>
          <ul className="list-inside list-disc text-gray-100 space-y-2">
            <li>Follow us on Twitter</li>
            <li>Join our Telegram channel</li>
            <li>Complete a simple task</li>
          </ul>
        </div>

        <button className="bg-yellow-500 text-black py-3 px-8 rounded-xl shadow-lg mt-6 hover:bg-yellow-400 transition-all">
          Participate Now
        </button>
      </section> */}

      {/* Stake & Earn Section */}
      {/* <section id="stake" className="py-16 bg-gray-900 text-white text-center space-y-8">
        <h2 className="text-4xl font-bold">Stake & Earn</h2>
        <p className="text-lg text-gray-400">Earn passive rewards by staking MyToken. The more you stake, the more you earn.</p>

        <div className="space-y-4">
          <p className="text-xl font-medium text-white">Annual Yield: 12%</p>
          <p className="text-xl font-medium text-white">Minimum Stake: 100 MTK</p>
        </div>

        <button className="bg-indigo-600 text-white py-3 px-8 rounded-xl shadow-lg mt-6 hover:bg-indigo-700 transition-all">
          Stake Now
        </button>
      </section> */}

      {/* Footer */}
      
    </div>
  );
}
