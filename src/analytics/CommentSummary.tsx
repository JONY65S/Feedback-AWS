import React from 'react';
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
    maintainAspectRatio: false, // Para que el gráfico sea más flexible en tamaños pequeños
    plugins: {
      legend: {
        display: false, // Ocultar la leyenda
      },
      tooltip: {
        enabled: false, // Deshabilitar los tooltips
      },
    },
    scales: {
      y: {
        min: -2, // Establecemos el rango mínimo
        max: 2, // Establecemos el rango máximo (comportamientos 0, 1, 2)
        ticks: {
          stepSize: 1, // Aseguramos que los ticks estén en 1
        },
        display: false, // Mostrar el eje Y
      },
      x: {
        display: false, // Mostrar el eje X
      },
    },
  };

  const getBackgroundColor = () => {
    // Revisamos el último valor de comportamiento
    const lastBehavior = behaviorDataMapped[behaviorDataMapped.length - 1];
  
    // Dependiendo del valor de comportamiento, asignamos un color diferente
    if (lastBehavior === -1) {
      return 'rgba(255, 99, 132, 0.6)'; // Rojo para comportamiento negativo
    } else if (lastBehavior === 1) {
      return 'rgba(178, 251, 168, 0.6)'; // Verde para comportamiento positivo
    } else {
      return 'rgba(255, 255, 0, 0.6)'; // Amarillo para comportamiento neutral
    }
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-lg flex justify-center items-center relative"
      style={{
        height: '150px', // Tamaño de la tarjeta tipo DNI más grande
        width: '250px',  // Tamaño ajustado
        backgroundColor: getBackgroundColor(), // Fondo de la tarjeta siguiendo la lógica de la gráfica
      }}
    >
      {/* Icono de expansión */}
      <div className="absolute top-2 right-2 cursor-pointer">
        <FaExpandAlt className="text-white text-xl" />
      </div>

      {/* Título en la esquina superior derecha */}
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
      </div>
    </div>
  );
};

export default CommentSummary;
