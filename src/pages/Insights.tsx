import React, { useState } from 'react';
import DashboardHeader from './../analytics/DashboardHeader';
import Filters from './../analytics/Filters';
import SummaryCards from './../analytics/SummaryCards';
import SentimentCharts from './../analytics/SentimentCharts';
import KeyInsights from './../analytics/KeyInsights';
import ExportButton from './../analytics/ExportButton';
import ChartTypeSelector from './../analytics/ChartTypeSelector';

const Insights: React.FC = () => {
  // Datos de ejemplo
  const mockData = {
    totalComments: 120,
    sentimentDistribution: {
      positive: 60,
      neutral: 40,
      negative: 20,
    },
    keyComments: [
      { sentiment: 'positive', text: 'Great service and fast delivery!' },
      { sentiment: 'negative', text: 'Delivery time was way too long.' },
    ],
  };

  const [chartType, setChartType] = useState<string>('bar'); // Estado para el tipo de gráfico

  const handleFilterChange = (key: string, value: string) => {
    console.log(`Filter ${key} updated with value: ${value}`);
  };

  const handleChartTypeSelect = (type: string) => {
    setChartType(type); // Cambiar el tipo de gráfico seleccionado
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <DashboardHeader />

      {/* Filtros */}
      <div className="mt-4 mb-6 px-6">
        <Filters onFilterChange={handleFilterChange} />
      </div>

      {/* Contenedor principal */}
      <div className="container mx-auto px-6">
        {/* Tarjetas de Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <SummaryCards
            totalComments={mockData.totalComments}
            sentimentScores={mockData.sentimentDistribution}
          />
        </div>

        {/* Selector de tipo de gráfico */}
        <ChartTypeSelector onSelect={handleChartTypeSelect} selectedType={chartType} />

        {/* Gráfico de Sentimientos */}
        <div className="mb-6">
          <SentimentCharts sentimentDistribution={mockData.sentimentDistribution} chartType={chartType} />
        </div>

        {/* Comentarios Clave */}
        <div className="mb-6">
          <KeyInsights keyComments={mockData.keyComments} />
        </div>

        {/* Botón de Exportación */}
        <div className="flex justify-center mt-8">
          <ExportButton />
        </div>
      </div>
    </div>
  );
};

export default Insights;
