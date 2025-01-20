import React from 'react';

interface FiltersProps {
  onFilterChange: (key: string, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  return (
    <div className="flex justify-center gap-4 my-6">
      <div className="flex flex-col">
        <label className="text-gray-700">Start Date</label>
        <input
          type="date"
          className="border border-gray-300 p-2 rounded"
          onChange={(e) => onFilterChange('startDate', e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-gray-700">End Date</label>
        <input
          type="date"
          className="border border-gray-300 p-2 rounded"
          onChange={(e) => onFilterChange('endDate', e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        onClick={() => onFilterChange('apply', '')}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
