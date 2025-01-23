import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchCommentsData } from '../components/ApiService';

// Definimos el tipo de datos esperado para el Sankey
interface SankeyData {
  countries: string[];
  states: string[];
  cities: string[];
  links: { source: number; target: number; value: number }[];
}

const SankeyMap: React.FC = () => {
  const [sankeyData, setSankeyData] = useState<SankeyData | null>(null);

  useEffect(() => {
    const fetchSankeyData = async () => {
      try {
        const data = await fetchCommentsData(); // Asumimos que fetchCommentsData ahora obtiene datos para Sankey
        const countries: string[] = [];
        const states: string[] = [];
        const cities: string[] = [];
        const links: { source: number; target: number; value: number }[] = [];

        // Creamos un mapa para relacionar los estados con sus países y las ciudades con sus estados
        const countryStateMap: Record<string, string[]> = {}; // País -> estados
        const stateCityMap: Record<string, string[]> = {}; // Estado -> ciudades

        data.forEach((comment: any) => {
          const country = comment.Pais;
          const state = comment.Estado;
          const city = comment.Ciudad;

          if (!countries.includes(country)) countries.push(country);
          if (!states.includes(state)) states.push(state);
          if (!cities.includes(city)) cities.push(city);

          // Asignamos los estados a los países
          if (!countryStateMap[country]) countryStateMap[country] = [];
          if (!countryStateMap[country].includes(state)) {
            countryStateMap[country].push(state);
          }

          // Asignamos las ciudades a los estados
          if (!stateCityMap[state]) stateCityMap[state] = [];
          if (!stateCityMap[state].includes(city)) {
            stateCityMap[state].push(city);
          }
        });

        // Creamos los enlaces entre los países, los estados y las ciudades
        countries.forEach((country, countryIndex) => {
          const countryStates = countryStateMap[country];
          countryStates.forEach((state) => {
            const stateIndex = states.indexOf(state); // Usamos stateIndex para los estados
            const stateCities = stateCityMap[state];
            stateCities.forEach((city) => {
              const cityIndex = cities.indexOf(city); // Usamos cityIndex para las ciudades
              links.push(
                { source: countryIndex, target: countries.length + stateIndex, value: 1 }, // país -> estado
                { source: countries.length + stateIndex, target: countries.length + states.length + cityIndex, value: 1 } // estado -> ciudad
              );
            });
          });
        });

        setSankeyData({
          countries,
          states,
          cities,
          links,
        });
      } catch (error) {
        console.error('Error fetching data for Sankey map:', error);
      }
    };

    fetchSankeyData();
  }, []);

  if (!sankeyData) {
    return <div>Loading...</div>;
  }

  const { countries, states, cities, links } = sankeyData;

  // Configuración de los datos para el gráfico de Sankey
  const data = [
    {
      type: 'sankey' as const, // Especificamos que el tipo es "sankey"
      node: {
        pad: 15,
        thickness: 20,
        line: {
          color: 'black',
          width: 0.5,
        },
        label: [...countries, ...states, ...cities], // Concatenamos los países, estados y ciudades
      },
      link: {
        source: links.map((link) => link.source),
        target: links.map((link) => link.target),
        value: links.map((link) => link.value),
      },
    },
  ];

  return (
    <div className="sankey-map-container">
      <Plot data={data} layout={{ title: 'Sankey Diagram of Countries, States, and Cities' }} />
    </div>
  );
};

export default SankeyMap;
