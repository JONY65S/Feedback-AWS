import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faSmile, faFrown } from '@fortawesome/free-solid-svg-icons';

interface SummaryCardsProps {
  totalComments: number;
  sentimentScores: { positive: number; negative: number; neutral: number };
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalComments, sentimentScores }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <div className="bg-white shadow-md rounded p-4 text-center">
        <FontAwesomeIcon icon={faComments} size="2x" className="text-blue-500" />
        <h3 className="text-lg font-bold mt-2">Total Comments</h3>
        <p className="text-2xl font-semibold">{totalComments}</p>
      </div>
      <div className="bg-white shadow-md rounded p-4 text-center">
        <FontAwesomeIcon icon={faSmile} size="2x" className="text-green-500" />
        <h3 className="text-lg font-bold mt-2">Positive Feedback</h3>
        <p className="text-2xl font-semibold">{sentimentScores.positive}</p>
      </div>
      <div className="bg-white shadow-md rounded p-4 text-center">
        <FontAwesomeIcon icon={faFrown} size="2x" className="text-red-500" />
        <h3 className="text-lg font-bold mt-2">Negative Feedback</h3>
        <p className="text-2xl font-semibold">{sentimentScores.negative}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
