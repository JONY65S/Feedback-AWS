import React, { useEffect, useState } from "react";
import { fetchCommentsData } from "../components/ApiService";

const KeyInsights: React.FC = () => {
  const palabrasClave = [
    "diseño", "atención", "velocidad", "precio", "calidad", "soporte",
    "funcionalidad", "experiencia", "entrega", "servicio", "interface",
    "eficiencia", "amabilidad", "resolución", "problema", "demora",
    "innovación", "estabilidad", "seguridad", "disponibilidad", "atraso",
    "confusión", "dudas", "claridad", "sencillez",
  ];

  const [insights, setInsights] = useState<{
    keyInsights: { palabra: string; balance: number; mensaje: string; porcentaje: number; estado: string }[];
    improvementPercentage: number;
    globalEstado: string;
  } | null>(null);

  useEffect(() => {
    const calculateInsights = async () => {
      try {
        const data = await fetchCommentsData();

        const palabraBalances: Record<
          string,
          { positivos: number; negativos: number }
        > = {};

        data.forEach((comment: any) => {
          const recomendacionStr = comment.Recomendacion;

          if (recomendacionStr && recomendacionStr.startsWith("{")) {
            try {
              const recomendacion = JSON.parse(recomendacionStr);

              // Procesar palabras positivas
              if (Array.isArray(recomendacion.positivo)) {
                recomendacion.positivo.forEach((word: string) => {
                  if (palabrasClave.includes(word)) {
                    if (!palabraBalances[word]) {
                      palabraBalances[word] = { positivos: 0, negativos: 0 };
                    }
                    palabraBalances[word].positivos++;
                  }
                });
              }

              // Procesar palabras negativas
              if (Array.isArray(recomendacion.negativo)) {
                recomendacion.negativo.forEach((word: string) => {
                  if (palabrasClave.includes(word)) {
                    if (!palabraBalances[word]) {
                      palabraBalances[word] = { positivos: 0, negativos: 0 };
                    }
                    palabraBalances[word].negativos++;
                  }
                });
              }
            } catch (error) {
              console.error("Error parsing JSON:", error);
            }
          }
        });

        const keyInsights = Object.keys(palabraBalances).map((palabra) => {
          const positivos = palabraBalances[palabra].positivos;
          const negativos = palabraBalances[palabra].negativos;
          const total = positivos + negativos;
          const balance = positivos - negativos;

          const porcentaje = total
            ? (positivos / total) * 100
            : 0;

          const estado = balance > 0
            ? "Mejorando"
            : balance < 0
            ? "Empeorando"
            : "Estable";

          const mensaje =
            balance > 0
              ? `Sigue ofreciendo un excelente ${palabra}`
              : `Tienes que mejorar el ${palabra}`;

          return { palabra, balance, mensaje, porcentaje, estado };
        });

        const totalPositivos = Object.values(palabraBalances).reduce(
          (acc, { positivos }) => acc + positivos,
          0
        );

        const totalNegativos = Object.values(palabraBalances).reduce(
          (acc, { negativos }) => acc + negativos,
          0
        );

        const totalWords = totalPositivos + totalNegativos;

        // Ponderación global: 70% negativos y 30% positivos
        const improvementPercentage = totalWords
          ? (totalPositivos / totalWords) * 100
          : 0;

        const globalEstado =
          improvementPercentage >= 30
            ? "Mejorando"
            : improvementPercentage <= 30 && improvementPercentage > 0
            ? "Estable"
            : "Empeorando";

        setInsights({
          keyInsights,
          improvementPercentage,
          globalEstado,
        });
      } catch (error) {
        console.error("Error fetching data for Key Insights:", error);
      }
    };

    calculateInsights();
  }, []);

  if (!insights) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 text-gray-700">
        <p className="text-lg font-semibold">Cargando insights...</p>
      </div>
    );
  }

  const { keyInsights, improvementPercentage, globalEstado } = insights;

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        {/* Título */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Key Insights</h1>

        {/* Estado Global */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            Estado Global:{" "}
            <span
              className={`${
                globalEstado === "Mejorando"
                  ? "text-green-600"
                  : globalEstado === "Empeorando"
                  ? "text-red-600"
                  : "text-yellow-600"
              } font-bold`}
            >
              {globalEstado}
            </span>
          </h2>
          <div>
            {globalEstado === "Mejorando" ? (
              <span className="text-green-600 text-4xl">↑</span>
            ) : globalEstado === "Empeorando" ? (
              <span className="text-red-600 text-4xl">↓</span>
            ) : (
              <span className="text-yellow-600 text-4xl">→</span>
            )}
          </div>
        </div>

        {/* Porcentaje Global */}
        <p className="text-lg font-medium text-gray-600 mb-4">
          Porcentaje Global de Mejora:{" "}
          <span className="font-bold">{improvementPercentage.toFixed(2)}%</span>
        </p>

        {/* Insights de Palabras Clave */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Palabras Clave</h3>
          <table className="min-w-full table-auto text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left">Palabra</th>
                <th className="px-6 py-3 text-right">Porcentaje</th>
                <th className="px-6 py-3 text-right">Estado</th>
              </tr>
            </thead>
            <tbody>
              {keyInsights.map(({ palabra, porcentaje, estado }) => (
                <tr key={palabra} className="border-b">
                  <td className="px-6 py-3">{palabra}</td>
                  <td className="px-6 py-3 text-right">{porcentaje.toFixed(2)}%</td>
                  <td className="px-6 py-3 text-right">
                    <span
                      className={`${
                        estado === "Mejorando"
                          ? "text-green-600"
                          : estado === "Empeorando"
                          ? "text-red-600"
                          : "text-yellow-600"
                      } font-medium`}
                    >
                      {estado}
                    </span>
                    {estado === "Mejorando" ? (
                      <span className="text-green-600 text-2xl ml-2">↑</span>
                    ) : estado === "Empeorando" ? (
                      <span className="text-red-600 text-2xl ml-2">↓</span>
                    ) : (
                      <span className="text-yellow-600 text-2xl ml-2">→</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KeyInsights;
