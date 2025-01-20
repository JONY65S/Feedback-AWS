// ChartTypeSelector.tsx
import React from 'react';

interface ChartTypeSelectorProps {
  onSelect: (type: string) => void;
  selectedType: string;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({ onSelect, selectedType }) => {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      {/* Miniaturas de los tipos de gráficos */}
      <div
        onClick={() => onSelect('bar')}
        className={`cursor-pointer p-2 ${selectedType === 'bar' ? 'border-b-2 border-blue-500' : ''}`}
      >
        <img src="/path/to/bar-graph-thumbnail.png" alt="Bar Chart" className="w-12 h-12" />
      </div>
      <div
        onClick={() => onSelect('line')}
        className={`cursor-pointer p-2 ${selectedType === 'line' ? 'border-b-2 border-blue-500' : ''}`}
      >
        <img src="/path/to/line-graph-thumbnail.png" alt="Line Chart" className="w-12 h-12" />
      </div>
      <div
        onClick={() => onSelect('pie')}
        className={`cursor-pointer p-2 ${selectedType === 'pie' ? 'border-b-2 border-blue-500' : ''}`}
      >
        <img src="/path/to/pie-graph-thumbnail.png" alt="Pie Chart" className="w-12 h-12" />
      </div>
    </div>
  );
};

export default ChartTypeSelector;
