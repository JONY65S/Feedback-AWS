import React from 'react';

interface KeyInsightsProps {
  keyComments: { sentiment: string; text: string }[];
}

const KeyInsights: React.FC<KeyInsightsProps> = ({ keyComments }) => {
  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Key Insights</h2>
      <ul className="space-y-2">
        {keyComments.map((comment, index) => (
          <li
            key={index}
            className={`p-3 rounded ${
              comment.sentiment === 'positive'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyInsights;
