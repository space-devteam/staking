import Link from "next/link";
import { useRouter } from "next/navigation";
import GlowingH1 from "./Glowtext";
import { useWalletStore } from "@/store/walletStore";
import ERC20abi from "@/lib/abi/Ecr20ABI";

const HeroPage = () => {
  const router = useRouter();
  const {connectWallet, walletAddress,disconnectWallet} = useWalletStore()


  const handleClick = () => {
    router.push("/presale");
  }

  const handleConnect = () => {
    connectWallet(ERC20abi, process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS)
  }

  const handleDisconnect = () => {
    disconnectWallet()
  }


  return (
    <div>
      <section className="flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 py-24 min-h-screen relative overflow-hidden">
        {/* Heading */}
        <div className="text-center text-white px-4 md:px-12 md:pl-18">
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            {/* Heading */}
            {/* <h2 className="text-5xl font-bold text-white">Welcome to MyToken</h2> */}
            <GlowingH1 />

            {/* Subheading */}
            <p className="text-xl text-gray-200">
              Rabbito is a blockchain platform designed for changemakers,
              innovators, and visionaries, offering the tools and technologies
              needed to unlock opportunities for the many, not just the few, and
              drive positive global transformation.
            </p>

            {/* Token Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                <h3 className="text-2xl font-semibold text-yellow-400">
                  100M+
                </h3>
                <p className="text-gray-200">Total Supply</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                <h3 className="text-2xl font-semibold text-yellow-400">
                  $0.10
                </h3>
                <p className="text-gray-200">Presale Price</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
                <h3 className="text-2xl font-semibold text-yellow-400">25%</h3>
                <p className="text-gray-200">Presale Bonus</p>
              </div>
            </div>

            {/* Call-to-Action Button */}
            <div className="space-x-4 ">
              <button onClick={handleClick} className="bg-yellow-400 text-black py-3 px-8 rounded-xl text-lg font-medium shadow-md hover:bg-yellow-500 transition-colors mt-8">
                Join Presale
              </button>
              <button onClick={walletAddress? handleDisconnect :handleConnect} className="hidden md:inline border-[2px] border-yellow-400 text-white font-bold py-2 px-8 rounded-xl text-lg shadow-md hover:bg-yellow-500 transition-colors mt-8">
                {walletAddress? `0x...${walletAddress.slice(35)}`:"Connect Wallet"}
                
              </button>
            </div>
          </div>
        </div>

        <div className="hidden md:block mt-8">
          {/* Image */}
          <img
            src="/images/4.png"
            alt="Hero"
            className="max-w-full h-auto mx-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
