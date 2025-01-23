import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchCommentsData } from '../components/ApiService';

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
        const data = await fetchCommentsData();
        const countries: string[] = [];
        const states: string[] = [];
        const cities: string[] = [];
        const links: { source: number; target: number; value: number }[] = [];

        const countryStateMap: Record<string, string[]> = {}; 
        const stateCityMap: Record<string, string[]> = {}; 

        data.forEach((comment: any) => {
          const country = comment.Pais;
          const state = comment.Estado;
          const city = comment.Ciudad;

          if (!countries.includes(country)) countries.push(country);
          if (!states.includes(state)) states.push(state);
          if (!cities.includes(city)) cities.push(city);

          if (!countryStateMap[country]) countryStateMap[country] = [];
          if (!countryStateMap[country].includes(state)) {
            countryStateMap[country].push(state);
          }

          if (!stateCityMap[state]) stateCityMap[state] = [];
          if (!stateCityMap[state].includes(city)) {
            stateCityMap[state].push(city);
          }
        });

        countries.forEach((country, countryIndex) => {
          const countryStates = countryStateMap[country];
          countryStates.forEach((state) => {
            const stateIndex = states.indexOf(state);
            const stateCities = stateCityMap[state];
            stateCities.forEach((city) => {
              const cityIndex = cities.indexOf(city);
              links.push(
                { source: countryIndex, target: countries.length + stateIndex, value: 1 },
                { source: countries.length + stateIndex, target: countries.length + states.length + cityIndex, value: 1 }
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

  const data = [
    {
      type: 'sankey' as const,
      node: {
        pad: 15,
        thickness: 20,
        line: {
          color: 'black',
          width: 0.5,
        },
        label: [...countries, ...states, ...cities],
      },
      link: {
        source: links.map((link) => link.source),
        target: links.map((link) => link.target),
        value: links.map((link) => link.value),
      },
    },
  ];

  const layout = {
    title: 'Sankey Diagram of Countries, States, and Cities',
    height: 400, // Definimos la altura del gráfico de Sankey
    width: 700,  // Aseguramos que tenga el ancho que deseas
  };

  return (
    <div className="sankey-map-container">
      <Plot data={data} layout={layout} />
    </div>
  );
};

export default SankeyMap;
