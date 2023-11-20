import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export const BarChartCell = ({ data, type }) => {
    const chartRef = useRef(null);

    useEffect(() => {
      if (chartRef.current) {
        // Destroy previous chart instance if it exists
        if (chartRef.current.chart) {
          chartRef.current.chart.destroy();
        }
  
        const ctx = chartRef.current.getContext('2d');
  
        // Create a new chart instance
        chartRef.current.chart = new Chart(ctx, {
          type: type,
          data: {
            labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
            datasets: [
              {
                label: 'Data',
                data,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(75,192,192,0.8)',
                hoverBorderColor: 'rgba(75,192,192,1)',
              },
            ],
          },
          options: {
            scales: {
              x: {
                type: 'category',
                labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }, [data]);
  
    return <canvas ref={chartRef} />;
  };