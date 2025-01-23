import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchCommentsData } from '../components/ApiService';

const BubbleMap: React.FC = () => {
  const [bubbleData, setBubbleData] = useState<any>(null);

  useEffect(() => {
    const fetchBubbleData = async () => {
      try {
        const data = await fetchCommentsData();
        const wordCount: Record<string, number> = {};

        data.forEach((comment: any) => {
          const recomendacionStr = comment.Recomendacion;

          if (recomendacionStr && recomendacionStr.startsWith('{')) {
            try {
              const recomendacion = JSON.parse(recomendacionStr);

              if (recomendacion.positivo && Array.isArray(recomendacion.positivo)) {
                recomendacion.positivo.forEach((word: string) => {
                  if (wordCount[word]) {
                    wordCount[word] += 1;
                  } else {
                    wordCount[word] = 1;
                  }
                });
              }
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          }
        });

        const words = Object.keys(wordCount);
        const frequencies = Object.values(wordCount);

        setBubbleData({
          words,
          frequencies,
        });
      } catch (error) {
        console.error('Error fetching data for Bubble Map:', error);
      }
    };

    fetchBubbleData();
  }, []);

  if (!bubbleData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 text-gray-700">
        <p className="text-lg font-semibold">Loading data...</p>
      </div>
    );
  }

  const { words, frequencies } = bubbleData;
  const maxFrequency = Math.max(...frequencies);

  const data = [
    {
      type: 'scatter',
      mode: 'markers',
      x: words,
      y: frequencies,
      text: words,
      marker: {
        size: frequencies.map((f: number) => (f / maxFrequency) * 80),
        color: frequencies,
        colorscale: [
          [0, '#ff6361'],
          [0.5, '#ffa600'],
          [1, '#bc5090'],
        ], // Custom visible colors
        opacity: 0.85,
        line: {
          width: 2,
          color: '#333',
        },
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-100 p-8">
      <div className="max-w-6xl mx-auto bg-gradient-to-b from-green-200 to-blue-200 shadow-2xl rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left">
          Bubble Map of Positive Words
        </h1>

        {/* Bubble Chart */}
        <div className="rounded-xl overflow-hidden p-6 shadow-lg">
          <Plot
            data={data as any}
            layout={{
              title: {
                text: 'Bubble Map of Positive Words',
                x: 0, // Aligns to the top-left corner
                xanchor: 'left',
                font: {
                  size: 20,
                  color: '#333',
                },
              },
              height: 500,
              xaxis: {
                title: 'Words',
                tickangle: 45,
              },
              yaxis: {
                title: 'Frequency',
              },
              font: {
                family: 'Arial, sans-serif',
                size: 14,
                color: '#333',
              },
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(255,255,255,0.9)',
              margin: {
                l: 50,
                r: 50,
                b: 50,
                t: 50,
                pad: 4,
              },
            }}
            useResizeHandler
            style={{ width: '100%' }}
          />
        </div>

        {/* Table of Words and Frequencies */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Words and Frequencies</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-gray-800">
              <thead>
                <tr className="bg-blue-200 text-left">
                  <th className="border border-gray-300 px-4 py-2">Word</th>
                  <th className="border border-gray-300 px-4 py-2">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {words.map((word: string, index: number) => (
                  <tr key={index} className="hover:bg-blue-100">
                    <td className="border border-gray-300 px-4 py-2">{word}</td>
                    <td className="border border-gray-300 px-4 py-2">{frequencies[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BubbleMap;
