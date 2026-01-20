import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { MemoryStick, MemoryStickIcon } from "lucide-react";
import { Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// Tokenomics component
const Tokenomics = () => {
  // Dummy data for token distribution
  const tokenDistribution = {
    labels: ["Presale", "Team", "Advisors", "Marketing", "Liquidity"],
    datasets: [
      {
        label: "Token Distribution",
        data: [40, 20, 10, 15, 15], // Percentages
        backgroundColor: [
          "#D8B4FE", // Yellow for Presale
          "#3B82F6", // Blue for Team
          "#FFB6C1", // Green for Advisors
          "#6366F1", // Red for Marketing
          "#8B5CF6", // Purple for Liquidity
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            let label = tooltipItem.label || '';
            let value = tooltipItem.raw;
            let total = tooltipItem.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            let percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${percentage}%`;
          },
        },
      },
      // Displaying percentage inside the donut
      doughnutlabel: {
        labels: [
          {
            text: 'Tokenomics',
            font: {
              size: 20,
            },
            color: '#333',
          },
        ],
      },
    },
  };

  return (
    <section className="py-16 bg-gray-50" id="tokenomics">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-indigo-900 mb-8">
          Tokenomics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Token Distribution Chart */}
          <div className="w-full max-w-md mx-auto">
            <Doughnut data={tokenDistribution} options={options} />
          </div>

          {/* Token Details */}
          <div className="space-y-6">
            <div className="hover:bg-white p-6 rounded-lg shadow-lg bg-purple-50">
              <h3 className="text-2xl font-semibold text-indigo-900 mb-4">
                Token Distribution
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">Presale</span>
                  <span className="font-bold text-indigo-900">40%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">Team</span>
                  <span className="font-bold text-indigo-900">20%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">Advisors</span>
                  <span className="font-bold text-indigo-900">10%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">Marketing</span>
                  <span className="font-bold text-indigo-900">15%</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">Liquidity</span>
                  <span className="font-bold text-indigo-900">15%</span>
                </li>
              </ul>
            </div>

            {/* Token Metrics */}
            <div className="hover:bg-white p-6 rounded-lg shadow-lg bg-purple-50">
              <h3 className="text-2xl font-semibold text-indigo-900 mb-4">
                Token Metrics
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">Total Supply</span>
                  <span className="font-bold text-indigo-900">100,000,000</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">Presale Price</span>
                  <span className="font-bold text-indigo-900">$0.10</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">Listing Price</span>
                  <span className="font-bold text-indigo-900">$0.15</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-gray-700">Hard Cap</span>
                  <span className="font-bold text-indigo-900">$5,000,000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
