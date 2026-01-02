import React from 'react';

const PresaleStepsTimeline = () => {
  const steps = [
    'Connect Your Wallet',
    'Check Presale Details',
    'Choose Your Investment Amount',
    'Confirm Payment Method',
    'Approve Transaction',
    'Receive Tokens',
    // 'Secure Your Tokens'
  ];

  return (
    <div className="hidden lg:flex justify-center items-center py-8 ">
      <div className="flex items-center justify-between w-full max-w-4xl">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center relative text-center">
            <div
              className={`w-6 h-6 rounded-full ${
                index === steps.length - 1 ? 'bg-gray-400' : 'bg-yellow-500'
              } mb-2`}
            ></div>
            <span className="text-sm font-semibold text-white">{step}</span>
            {index < steps.length - 1 && (
              <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-yellow-500 z-0"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PresaleStepsTimeline;
