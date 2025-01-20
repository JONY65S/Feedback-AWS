import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { FaExpandAlt } from 'react-icons/fa'; // Icono de expansión
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface CommentSummaryProps {
  totalComments: number;
  sentimentData: { positive: number, negative: number }[]; // Datos de comentarios positivos y negativos por día
  behaviorData: number[]; // Datos de comportamiento (0, 1, 2)
}

const CommentSummary: React.FC<CommentSummaryProps> = ({ totalComments, sentimentData, behaviorData }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Estado para controlar si se expande el componente

  // Mapeamos los valores de comportamiento a colores según la relación
  const behaviorDataMapped = behaviorData.map((_, index) => {
    const positive = sentimentData[index]?.positive || 0;
    const negative = sentimentData[index]?.negative || 0;
    const ratio = negative === 0 ? (positive === 0 ? 0 : 2) : positive / negative;

    // Determinamos el comportamiento según la relación
    if (ratio < 1) {
      return -1; // Rojo si la relación es menor que 1
    } else if (ratio >= 1) {
      return 1; // Verde si la relación es mayor o igual a 1
    } else {
      return 0; // Neutro (aunque no debería llegar a este caso)
    }
  });

  const getLineColor = () => {
    // Revisamos el último valor de comportamiento para determinar el color
    const lastBehavior = behaviorDataMapped[behaviorDataMapped.length - 1];
  
    if (lastBehavior === -1) {
      return 'red'; // Rojo para comportamiento negativo
    } else if (lastBehavior === 1) {
      return 'green'; // Verde para comportamiento positivo
    } else {
      return 'rgba(255, 255, 0, 1)'; // Amarillo para comportamiento neutral
    }
  };

  // Datos para el gráfico
  const data = {
    labels: sentimentData.map((_, index) => `Día ${index + 1}`), // Etiquetas para los días
    datasets: [
      {
        label: 'Comportamiento de comentarios',
        data: behaviorDataMapped, // Usamos los valores de comportamiento mapeados
        fill: true,
        tension: 0.5,
        borderWidth: 6,
        pointRadius: 0,
        borderColor: getLineColor(),
      },
    ],
  };

  // Opciones de configuración del gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true, // Habilitar tooltips
        callbacks: {
          // Personalizar el contenido del tooltip
          label: function (context: any) {
            const { index } = context;
            const positive = sentimentData[index]?.positive || 0;
            const negative = sentimentData[index]?.negative || 0;
            return `Día ${index + 1}: Positivo ${positive}, Negativo ${negative}`;
          },
        },
      },
    },
    scales: {
      y: {
        min: isExpanded ? -1 : -2,
        max: isExpanded ? 2 : 2,
        ticks: {
          stepSize: 1,
        },
        display: isExpanded,
      },
      x: {
        display: false,
      },
    },
  };

  const getBackgroundColor = () => {
    const lastBehavior = behaviorDataMapped[behaviorDataMapped.length - 1];
    if (lastBehavior === -1) {
      return 'rgba(255, 99, 132, 0.6)';
    } else if (lastBehavior === 1) {
      return 'rgba(178, 251, 168, 0.6)';
    } else {
      return 'rgba(255, 255, 0, 0.6)';
    }
  };

  // Tabla de comportamiento
  const renderBehaviorTable = () => (
    <table className="text-sm table-auto border-collapse w-full shadow-md" style={{ background: 'rgba(0,0,0,0.1)' }}>
      <thead className="bg-transparent">
        <tr>
          <th className="border px-4 py-2 text-white">Día</th>
          <th className="border px-4 py-2 text-white">Positivo</th>
          <th className="border px-4 py-2 text-white">Negativo</th>
          <th className="border px-4 py-2 text-white">Comportamiento</th>
        </tr>
      </thead>
      <tbody>
        {sentimentData.map((data, index) => {
          const positive = data?.positive || 0;
          const negative = data?.negative || 0;
          const ratio = negative === 0 ? (positive === 0 ? 0 : 2) : positive / negative;
          const behavior = ratio < 1 ? 'Negativo' : ratio >= 1 ? 'Positivo' : 'Neutral';
          return (
            <tr
              key={index}
              className={`hover:bg-gray-700 hover:text-white ${index % 2 === 0 ? 'bg-transparent' : 'bg-transparent'}`}
            >
              <td className="border px-4 py-2 text-white">{`Día ${index + 1}`}</td>
              <td className="border px-4 py-2 text-white">{positive}</td>
              <td className="border px-4 py-2 text-white">{negative}</td>
              <td className="border px-4 py-2 text-white">{behavior}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg flex justify-center items-center relative"
      style={{
        height: isExpanded ? '500px' : '150px',
        width: isExpanded ? '500px' : '250px',
        backgroundColor: getBackgroundColor(),
        transition: 'all 0.3s ease',
      }}
    >
      {/* Icono de expansión */}
      <div className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <FaExpandAlt className="text-white text-xl" />
      </div>

      {/* Título en la esquina superior izquierda */}
      <div className="absolute top-2 left-2 text-xl text-white font-semibold z-10">
        Comentarios
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full relative">
        {/* Número total de comentarios */}
        <div className="text-3xl text-white font-semibold absolute z-10">{totalComments}</div>

        {/* Gráfico de comportamiento */}
        <div className="w-full" style={{ height: '100%', marginTop: '20px' }}>
          <Line data={data} options={options} />
        </div>

        {/* Mostrar tabla cuando se expanda */}
        {isExpanded && (
          <div className="mt-4 w-full overflow-x-auto">
            {renderBehaviorTable()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSummary;
