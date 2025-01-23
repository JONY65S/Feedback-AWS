import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchCommentsData } from '../components/ApiService';

interface AgeHistogramData {
  ages: number[];
}

const AgeHistogram: React.FC = () => {
  const [ageData, setAgeData] = useState<AgeHistogramData | null>(null);

  useEffect(() => {
    const fetchAgeData = async () => {
      try {
        const data = await fetchCommentsData();
        const ages: number[] = [];

        data.forEach((comment: any) => {
          const age = parseInt(comment.Edad, 10);
          if (!isNaN(age)) {
            ages.push(age);
          }
        });

        setAgeData({ ages });
      } catch (error) {
        console.error('Error fetching data for Age histogram:', error);
      }
    };

    fetchAgeData();
  }, []);

  if (!ageData) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  const { ages } = ageData;

  const ageRanges = ['0-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71+'];
  const ageCounts = ageRanges.map(range => {
    const [min, max] = range.split('-').map(Number);
    return ages.filter(age => age >= min && (max ? age <= max : age > min)).length;
  });

  const data = [
    {
      type: 'bar',
      x: ageRanges,
      y: ageCounts,
      marker: {
        color: 'rgb(158,202,225)',
      },
      opacity: 0.7,
    },
  ];

  const layout = {
    title: 'Age Distribution Histogram by Range',
    xaxis: {
      title: 'Age Range',
      showgrid: false,
      zeroline: false,
    },
    yaxis: {
      title: 'Count',
    },
    bargap: 0.05,
    height: 250, // Agregamos un height de 300px
  };

  return (
    <Plot
      data={data as any}
      layout={layout}
      className="w-[700px] mx-auto shadow-md rounded-lg" // Ajustamos el ancho a 700px
    />
  );
};

export default AgeHistogram;
