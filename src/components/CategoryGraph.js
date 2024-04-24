import React, { useState, useEffect } from 'react';
import './TableRepresentation.css';
import { useSelector } from 'react-redux';
import { FunnelChart, Funnel } from 'recharts';

const CategoryGraph = ({ columnname }) => {
  const data = useSelector((state) => state.selectedData);

  const graphbox = {
    borderRadius: '10px',
    height: '340px',
    width: '53%',
    padding: '0.2rem',
    boxShadow: '1px 5px 5px ',
    margin: '50px', // Add margin for gap
  };

  const getCountsByCategory = () => {
    const counts = {};
    data.forEach((item) => {
      const category = item.Category;
      counts[category] = counts[category] ? counts[category] + 1 : 1;
    });
    return Object.entries(counts)
      .map(([category, count]) => ({ name: category, value: count }))
      .sort((a, b) => b.value - a.value); // Sort by value in descending order
  };

  const [categoryCounts, setCategoryCounts] = useState(getCountsByCategory());

  useEffect(() => {
    setCategoryCounts(getCountsByCategory());
  }, [data]);

  return (
    <div className="m-2" style={graphbox}>
      <h1 style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center', color: '#0A6E7C',  }}>
        Category
      </h1>

      <div className="funnel-container">
        <FunnelChart width={400} height={300}>
          <Funnel
            dataKey="value"
            data={categoryCounts}
            nameKey="name"
            fill="#0A6E7D"
            //stroke="#000000" // Set stroke color to black
            //strokeWidth={2} // Increase stroke width for bold effect
            label={(entry) => (
              <text
                x={entry.x + entry.width + 10}
                y={entry.y + entry.height / 2}
                dy={12} // Increase the dy value for more space between lines
                textAnchor="start"
                fill="#000000" // Set fill color to black
                fontWeight="bold" // Make the count values bold
              >
                {entry.value}
              </text>
            )}
            gapRatio={1}
          />
        </FunnelChart>
      </div>
    </div>
  );
};

export default CategoryGraph;
