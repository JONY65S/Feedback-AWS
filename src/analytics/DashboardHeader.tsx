import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-6 shadow-md">
      <h1 className="text-2xl font-bold">Customer Feedback Dashboard</h1>
      <p className="text-sm text-gray-300 mt-2">
        Analyze and improve your services based on user feedback.
      </p>
    </header>
  );
};

export default DashboardHeader;
