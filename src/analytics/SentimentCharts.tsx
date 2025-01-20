import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';

// Registrar los elementos necesarios para los gráficos
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

interface SentimentChartsProps {
  sentimentDistribution: { positive: number; neutral: number; negative: number };
  chartType: string;
}

const SentimentCharts: React.FC<SentimentChartsProps> = ({ sentimentDistribution, chartType }) => {
  // Datos comunes para los tres tipos de gráficos
  const chartData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Sentiment Distribution',
        data: [
          sentimentDistribution.positive,
          sentimentDistribution.neutral,
          sentimentDistribution.negative,
        ],
        backgroundColor: ['#4caf50', '#ffeb3b', '#f44336'],
      },
    ],
  };

  // Datos de ejemplo para el gráfico de línea (suponiendo que son datos de evolución en el tiempo)
  const lineChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Sentiment Over Time',
        data: [
          sentimentDistribution.positive,
          sentimentDistribution.neutral,
          sentimentDistribution.negative,
          sentimentDistribution.positive + 10, // Datos de ejemplo, incrementando
          sentimentDistribution.neutral + 5,  // Datos de ejemplo, incrementando
          sentimentDistribution.negative + 8, // Datos de ejemplo, incrementando
        ],
        fill: false,
        borderColor: '#4caf50',
        tension: 0.1,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#4caf50',
      },
    ],
  };

  return (
    <div className="chart-container">
      {/* Gráfico de Barras */}
      {chartType === 'bar' && (
        <div className="mb-6">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Sentiment Distribution (Bar Chart)',
                },
              },
            }}
          />
        </div>
      )}

      {/* Gráfico de Líneas */}
      {chartType === 'line' && (
        <div className="mb-6">
          <Line
            data={lineChartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Sentiment Distribution Over Time (Line Chart)',
                },
              },
            }}
          />
        </div>
      )}

      {/* Gráfico de Pastel */}
      {chartType === 'pie' && (
        <div className="mb-6">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: 'Sentiment Distribution (Pie Chart)',
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SentimentCharts;
