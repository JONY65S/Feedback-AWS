import React, { useState } from 'react';
import DashboardHeader from './../analytics/DashboardHeader';
import Filters from './../analytics/Filters';
import SummaryCards from './../analytics/SummaryCards';
import SentimentCharts from './../analytics/SentimentCharts';
import KeyInsights from './../analytics/KeyInsights';
import ExportButton from './../analytics/ExportButton';
import ChartTypeSelector from './../analytics/ChartTypeSelector';
import CommentSummary from './../analytics/CommentSummary';

const Insights: React.FC = () => {
  // Datos de ejemplo
  const mockData = {
    totalComments: 120,
    sentimentDistribution: {
      positive: 20,
      neutral: 40,
      negative: 60,
    },
    keyComments: [
      { sentiment: 'positive', text: 'Great service and fast delivery!' },
      { sentiment: 'negative', text: 'Delivery time was way too long.' },
    ],
    sentimentByDay: [
      { positive: 2, negative: 4 }, // Día 1
      { positive: 4, negative: 2 }, // Día 2
      { positive: 6, negative: 0 }, // Día 3
      { positive: 6, negative: 8 }, // Día 4
      { positive: 4, negative: 4 }, // Día 5
    ],
  };

  const [chartType, setChartType] = useState<string>('bar'); // Estado para el tipo de gráfico seleccionado

  // Función para actualizar filtros
  const handleFilterChange = (key: string, value: string) => {
    console.log(`Filter ${key} updated with value: ${value}`);
  };

  // Función para actualizar el tipo de gráfico seleccionado
  const handleChartTypeSelect = (type: string) => {
    setChartType(type);
  };

  // Función para calcular el comportamiento (0, 1, 2)
  const calculateBehavior = (data: { positive: number; negative: number }[]) => {
    return data.map((currentDay, index, arr) => {
      if (index === 0) return 1; // Asignamos 1 al primer día como referencia central
      const previousDay = arr[index - 1];
      
      // Calculamos la diferencia entre el valor positivo y negativo y asignamos valores
      const difference = currentDay.positive - currentDay.negative;
      const reference = previousDay.positive - previousDay.negative; // Usamos el comportamiento anterior como referencia

      // Asignamos valores según la diferencia
      if (difference > reference) return 2; // Si la diferencia es mayor, asignamos 2 (positivo)
      if (difference < reference) return 0; // Si la diferencia es menor, asignamos 0 (negativo)
      return 1; // Si la diferencia es igual, asignamos 1 (neutro)
    });
  };

  // Calculamos el comportamiento con los datos de sentimentByDay
  const behaviorData = calculateBehavior(mockData.sentimentByDay);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Encabezado */}
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

        {/* Resumen de Comentarios con gráfico */}
        <div className="mb-6">
          <CommentSummary
            totalComments={mockData.totalComments}
            sentimentData={mockData.sentimentByDay}
            behaviorData={behaviorData} // Pasamos el comportamiento calculado
          />
        </div>

        {/* Selector de tipo de gráfico */}
        <ChartTypeSelector onSelect={handleChartTypeSelect} selectedType={chartType} />

        {/* Gráfico de Sentimientos */}
        <div className="mb-6">
          <SentimentCharts sentimentDistribution={mockData.sentimentDistribution} chartType={chartType} />
        </div>

        {/* Comentarios clave */}
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
