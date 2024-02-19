import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export const BarChartCell = ({ data, type }) => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      
    function countInRange(data, min, max, numRanges) {
        let range = {};
        let rangeSize = Math.ceil((max - min + 1) / numRanges);
        
        for (let i = 0; i < numRanges; i++) {
            if(min + i * rangeSize<max)
            range[`${min + i * rangeSize}-${Math.min(min + (i + 1) * rangeSize - 1, max)}`] = 0;
        }
        
        data.forEach((value) => {
            if (value >= min && value <= max) {
            let rangeIndex = Math.floor((value - min) / rangeSize);
            range[`${min + rangeIndex * rangeSize}-${Math.min(min + (rangeIndex + 1) * rangeSize - 1, max)}`]++;
            }
        });
        
        return range;
        }
        

      let intData ;
      if (type === "bar") {
        let maxData = Math.max(...data);
        let minData = Math.min(...data);
        console.log(maxData);
        console.log(minData);
        intData = countInRange(data, minData, maxData, 5);
        delete intData.null;
        console.log(intData);
      }
      // Create a new chart instance
      chartRef.current.chart = new Chart(ctx, {
        type: type,
        data: {
        //   labels: [
        //     "Category 1",
        //     "Category 2",
        //     "Category 3",
        //     "Category 4",
        //     "Category 5",
        //   ],
          datasets: [
            {
              label: "Data",
              data:type==='bar'? intData:data,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(75,192,192,0.8)",
              hoverBorderColor: "rgba(75,192,192,1)",
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "category",
            //   labels: [
            //     "Category 1",
            //     "Category 2",
            //     "Category 3",
            //     "Category 4",
            //     "Category 5",
            //   ],
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data, type]);

  return <canvas ref={chartRef} />;
};
