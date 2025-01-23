import React, { useEffect, useState } from 'react';
import SummaryCards from './../analytics/SummaryCards';
import CommentSummary from './../analytics/CommentSummary';
import LiveDateTime from '../analytics/LiveDateTime';
import { fetchCommentsData } from '../components/ApiService';
import AgeHistogram from '../analytics/AgeHistogram';
import BubbleMap from '../analytics/BubbleMap';
import SankeyMap from '../analytics/Sankey';
import KeyInsights from '../analytics/KeyInsights';

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
      <div className="sticky top-0 z-10 bg-gray-900 text-yellow-500 flex justify-between items-center p-4">
        {/* LiveDateTime a la izquierda */}
        <div className="flex-2">
          <LiveDateTime />
        </div>

        {/* SummaryCards en el centro */}
        <div className="flex-1 flex justify-center text-black">
          <SummaryCards
            totalComments={sentimentData.totalComments}
            sentimentScores={sentimentData.sentimentDistribution}
          />
        </div>

        {/* Botón de exportar a la derecha */}
        <div className="ml-4">
          <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded">Exportar</button>
        </div>
      </div>


      <div className="flex flex-grow">
  <div className="flex-1 p-6 h-screen overflow-hidden">
    <div className="px-0 w-full h-full flex">

      {/* Sección izquierda: CommentSummary y BubbleMap */}
      <div className="flex flex-col w-1/3 h-full space-y-6">
        <div className="flex-1">
          <CommentSummary
            totalComments={sentimentData.totalCommentsSem}
            sentimentData={sentimentData.sentimentByDay}
            behaviorData={behaviorData}
          />
        </div>
        <div className="flex-1">
          <BubbleMap />
        </div>
      </div>

      {/* Sección central: KeyInsights */}
      <div className="flex-1 w-1/3 h-full">
        <KeyInsights />
      </div>

      {/* Sección derecha: SankeyMap y AgeHistogram */}
      <div className="flex flex-col w-1/3 h-full space-y-6">
        <div className="flex-1">
          <SankeyMap />
        </div>
        <div className="flex-1">
          <AgeHistogram />
        </div>
      </div>

    </div>
  </div>
</div>





    </div>
  );
};

export default Insights;
