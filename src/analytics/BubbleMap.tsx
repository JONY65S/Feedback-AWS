import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchCommentsData } from '../components/ApiService';
import { FaExpandAlt } from 'react-icons/fa';

const MapaDeBurbuja: React.FC = () => {
  const [datosDeBurbuja, setDatosDeBurbuja] = useState<any>(null);
  const [estaExpandido, setEstaExpandido] = useState(false);

  useEffect(() => {
    const obtenerDatosDeBurbuja = async () => {
      try {
        const data = await fetchCommentsData();
        const conteoDePalabras: Record<string, number> = {};

        data.forEach((comentario: any) => {
          const recomendacionStr = comentario.Recomendacion;

          if (recomendacionStr && recomendacionStr.startsWith('{')) {
            try {
              const recomendacion = JSON.parse(recomendacionStr);
              recomendacion.positivo?.forEach((palabra: string) => {
                conteoDePalabras[palabra] = (conteoDePalabras[palabra] || 0) + 1;
              });
            } catch (error) {
              console.error('Error al analizar JSON:', error);
            }
          }
        });

        const palabras = Object.keys(conteoDePalabras);
        const frecuencias = Object.values(conteoDePalabras);
        setDatosDeBurbuja({ palabras, frecuencias });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    obtenerDatosDeBurbuja();
  }, []);

  if (!datosDeBurbuja) {
    return <div className="text-center text-gray-600">Cargando...</div>;
  }

  const { palabras, frecuencias } = datosDeBurbuja;
  const maxFrecuencia = Math.max(...frecuencias);

  const datos = [
    {
      type: 'scatter',
      mode: 'markers',
      x: palabras,
      y: frecuencias,
      text: palabras,
      marker: {
        size: frecuencias.map((f: number) => (f / maxFrecuencia) * 60), // Tamaño reducido
        color: frecuencias,
        colorscale: 'YlGnBu',
        opacity: 0.7,
        line: { width: 1, color: '#ddd' },
      },
    },
  ];

  return (
    <div className="p-4 bg-gradient-to-r from-indigo-50 to-teal-50 rounded-lg shadow-lg mt-4 mx-auto w-full sm:w-full md:w-full lg:w-11/12">
      <div className="relative">
        <h1 className="text-2xl font-semibold text-gray-700 mb-3">Mapa de Burbuja de Palabras Positivas</h1>
        <div className="absolute top-2 right-2 cursor-pointer" onClick={() => setEstaExpandido(!estaExpandido)}>
          <FaExpandAlt className="text-gray-700 text-xl" />
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 rounded-lg border ${estaExpandido ? 'h-auto' : 'h-[140px]'}`}
          style={{ backgroundColor: estaExpandido ? 'rgba(225, 240, 255, 0.8)' : 'rgba(233, 239, 240, 0.8)' }}
        >
          <Plot
            data={datos as any}
            layout={{
              title: 'Mapa de Burbuja de Palabras Positivas',
              height: estaExpandido ? 300 : 140,
              xaxis: { 
                title: 'Palabras', 
                tickangle: 90, // Aumento de rotación de las etiquetas
                tickmode: 'array', 
                tickvals: palabras,
                ticktext: palabras, 
              },
              yaxis: { title: 'Frecuencia' },
              font: { size: 12, color: '#444' },
              paper_bgcolor: 'transparent',
              plot_bgcolor: 'rgba(255, 255, 255, 0.8)',
              margin: { l: 10, r: 10, b: 50, t: 50 }, // Ajuste de márgenes
            }}
            useResizeHandler
            style={{ width: '100%' }}
          />
        </div>

        {estaExpandido && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Palabras y Frecuencias</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-gray-800">
                <thead>
                  <tr className="bg-indigo-100 text-left">
                    <th className="border border-gray-300 px-4 py-2">Palabra</th>
                    <th className="border border-gray-300 px-4 py-2">Frecuencia</th>
                  </tr>
                </thead>
                <tbody>
                  {palabras.map((palabra: string, index: number) => (
                    <tr key={index} className="hover:bg-indigo-50">
                      <td className="border border-gray-300 px-4 py-2">{palabra}</td>
                      <td className="border border-gray-300 px-4 py-2">{frecuencias[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapaDeBurbuja;
