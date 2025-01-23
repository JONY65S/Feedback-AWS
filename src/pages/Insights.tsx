import React, { useEffect, useState } from 'react';
import DashboardHeader from './../analytics/DashboardHeader';
import Filters from './../analytics/Filters';
import SummaryCards from './../analytics/SummaryCards';
// import SentimentCharts from './../analytics/SentimentCharts';
// import KeyInsights from './../analytics/KeyInsights';
// import ExportButton from './../analytics/ExportButton';
//import ChartTypeSelector from './../analytics/ChartTypeSelector';
import CommentSummary from './../analytics/CommentSummary';
import LiveDateTime from '../analytics/LiveDateTime';
import { fetchCommentsData } from '../components/ApiService';

// const Insights: React.FC = () => {
//   // Datos de ejemplo
//   const mockData = {
//     totalComments: 120,
//     sentimentDistribution: {
//       positive: 20,
//       neutral: 40,
//       negative: 40,
//     },
//     keyComments: [
//       { sentiment: 'positive', text: 'Great service and fast delivery!' },
//       { sentiment: 'negative', text: 'Delivery time was way too long.' },
//     ],
//     sentimentByDay: [
//       { positive: 2, negative: 4 }, // Día 1
//       { positive: 4, negative: 2 }, // Día 2
//       { positive: 6, negative: 0 }, // Día 3
//       { positive: 6, negative: 8 }, // Día 4
//       { positive: 5, negative: 4 }, // Día 5
//       { positive: 2, negative: 4 }, // Día 1
//       { positive: 4, negative: 2 }, // Día 2
//     ],

    
//   };

/// Definimos el tipo para SentimentByDay
// Definimos el tipo para SentimentByDay
interface SentimentByDay {
  positive: number;
  negative: number;
}

const Insights: React.FC = () => {
  const [sentimentData, setSentimentData] = useState<{
    totalComments: number;
    totalCommentsSem: number;
    sentimentDistribution: {
      positive: number;
      negative: number;
      mixed: number;
    };
    sentimentByDay: SentimentByDay[]; // Tipamos correctamente sentimentByDay
  }>({
    totalComments: 0,
    totalCommentsSem: 0,
    sentimentDistribution: {
      positive: 0,
      negative: 0,
      mixed: 0,
    },
    sentimentByDay: [], // Inicializamos como un array vacío
  });

  useEffect(() => {
    const getCommentsData = async () => {
      try {
        const commentsData = await fetchCommentsData();

        let positive = 0;
        let negative = 0;
        let mixed = 0;

        // Creamos un array con 7 días inicializados en 0
        const sentimentByDay: SentimentByDay[] = Array.from({ length: 7 }, () => ({
          positive: 0,
          negative: 0,
        }));

        // Agrupamos los comentarios por sentimiento y día
        commentsData.forEach((comment: any) => {
          const sentiment = comment.Sentiment.toLowerCase();
          const timestamp = comment.Timestamp;
          const date = new Date(timestamp);
          const dayIndex = getReversedDayIndex(date); // Obtener el índice del día invertido

          if (dayIndex >= 0 && dayIndex < 7) {
            // Sumamos los sentimientos en el día correspondiente
            if (sentiment === 'positive') sentimentByDay[dayIndex].positive++;
            if (sentiment === 'negative') sentimentByDay[dayIndex].negative++;
          }

          // Contamos los sentimientos totales para la distribución general
          if (sentiment === 'positive') positive++;
          else if (sentiment === 'negative') negative++;
          else if (sentiment === 'neutral' || sentiment === 'mixed') mixed++;
        });

        // Calcular el total de comentarios
        const totalComments = positive + negative + mixed;
        const totalCommentsSem = positive + negative;

        setSentimentData({
          totalComments,
          totalCommentsSem,
          sentimentDistribution: {
            positive,
            negative,
            mixed,
          },
          sentimentByDay, // Actualizamos los datos de sentimentByDay
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getCommentsData();
  }, []);


   // Función para invertir los días: Día 0 = más reciente, Día 6 = hace 6 días
   const getReversedDayIndex = (date: Date) => {
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 3600 * 24)); // Calculamos los días de diferencia
    return 6 - diffDays; // Invertimos el índice (6 = hoy, 5 = ayer, etc.)
  };

  // const [chartType, setChartType] = useState<string>('bar'); // Estado para el tipo de gráfico seleccionado

  // // Función para actualizar el tipo de gráfico seleccionado
  // const handleChartTypeSelect = (type: string) => {
  //   setChartType(type);
  // };

  // Función para actualizar filtros
  const handleFilterChange = (key: string, value: string) => {
    console.log(`Filter ${key} updated with value: ${value}`);
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
  const behaviorData = calculateBehavior(sentimentData.sentimentByDay);

  useEffect(() => {
    // Bloquear el scroll
    document.body.style.overflow = 'hidden';

    // Restaurar el scroll cuando el componente se desmonte
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col">
      {/* Fijamos el DashboardHeader en la parte superior */}
      <div className="sticky top-0 z-10 bg-gray-900 text-yellow-500">
        <DashboardHeader />
      </div>

      <div className="flex flex-grow">
        {/* Sección izquierda fija */}
        <div className="w-96 bg-gray-200 text-yellow-500 p-4 sticky top-16 h-screen overflow-y-auto"> {/* Barra lateral fija */}
          <LiveDateTime />
          <div className="mt-4">
            <Filters onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Sección derecha ajustada a la pantalla */}
        <div className="flex-1 p-6 h-screen overflow-hidden"> {/* h-screen asegura que la sección ocupe toda la pantalla */}
          {/* Contenedor principal */}
          <div className="container mx-auto px-6 w-full flex flex-col">
            {/* Tarjetas de Resumen */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <SummaryCards
                totalComments={sentimentData.totalComments}
                sentimentScores={sentimentData.sentimentDistribution}
              />
            </div>

             {/*Resumen de Comentarios con gráfico*/}
            <div className="mb-6">
              <CommentSummary
                totalComments={sentimentData.totalCommentsSem}
                sentimentData={sentimentData.sentimentByDay}
                behaviorData={behaviorData}// Pasamos el comportamiento calculado
              />
   
            </div>

            {/* Selector de tipo de gráfico */}
            {/* <div className="mb-4">
              <ChartTypeSelector onSelect={handleChartTypeSelect} selectedType={chartType} />
            </div> */}

            {/* Gráfico de Sentimientos */}
            {/* <div className="mb-4 max-w-md mx-auto h-16"> 
              <SentimentCharts sentimentDistribution={mockData.sentimentDistribution} chartType={chartType} />
            </div> */}

            {/* Comentarios clave */}
            {/* <div className="mb-4">
              <KeyInsights keyComments={mockData.keyComments} />
            </div> */}

            {/* Botón de Exportación */}
            {/* <div className="flex justify-center mt-4">
              <ExportButton />
            </div> */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
