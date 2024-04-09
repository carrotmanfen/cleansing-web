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

      function countStrings(arr) {
        let counts = {};
        for (let i = 0; i < arr.length; i++) {
          if (counts[arr[i]]) {
            counts[arr[i]]++;
          } else {
            counts[arr[i]] = 1;
          }
        }

        return counts;
      }
      let arrayNumber = [];
      let arrayString = [];
      function sumUntilHalf(obj) {
        // Convert the object to an array of pairs and sort it in ascending order based on the values
        let arr = Object.entries(obj).sort((a, b) => a[1] - b[1]);
        
        // Create a new object and add the pairs in sorted order
        let sortObj = {};
        for (let [key, value] of arr) {
            sortObj[key] = value;
        }
        let arrSortObj = Object.entries(obj).sort((a, b) => a[1] - b[1]);
        let totalSum = arrSortObj.reduce((a, b) => a + b[1], 0);
        let sum = 0;
        let j = 0;
        if(arrSortObj.length <= 5){
            let arrObj = Object.entries(sortObj);
            console.log("arrObj");
            console.log(arrObj);
            for(let i = 0; i < arrObj.length; i++){
                arrayNumber.push(arrObj[i][1]);
                arrayString.push(arrObj[i][0]);
            }
            console.log(arrayNumber);
            console.log(arrayString);
            return sortObj;
        }else{

            for(let i = 0; i < arrSortObj.length; i++){
                if(sum+arrSortObj[i][1] <= totalSum/2){
                    sum += arrSortObj[i][1];
                    j=i;
                    console.log("this"+arrSortObj[i][1])
                    console.log("sum"+sum);
                }
            }
            console.log("sd"+j);
            console.log("sdout"+sum);
            let newArr = [];
            for(let i = 0; i < arrSortObj.length; i++){
                if(i <= j){
                    newArr.push(arrSortObj[i][0]);
                }else{
                }
            }
            
            for(let i = 0; i < newArr.length; i++){
                delete sortObj[newArr[i]];
            }
            sortObj['other'] = sum;
            
            let arrObj = Object.entries(sortObj);
            console.log("arrObj");
            console.log(arrObj);
            for(let i = 0; i < arrObj.length; i++){
                arrayNumber.push(arrObj[i][1]);
                arrayString.push(arrObj[i][0]);
            }
            console.log(arrayNumber);
            console.log(arrayString);
            return sortObj;
        }
      }

      function countInRange(data, min, max, numRanges) {
        let range = {};
        let rangeSize = Math.ceil((max - min + 1) / numRanges);
        console.log("rageSize: "+rangeSize);
        for (let i = 0; i < numRanges; i++) {
          if (min + i * rangeSize <= max)
            range[
              `${min + i * rangeSize}-${Math.min(
                min + (i + 1) * rangeSize - 1,
                max
              )}`
            ] = 0;
        }

        data.forEach((value) => {
          if (value >= min && value <= max) {
            let rangeIndex = Math.floor((value - min) / rangeSize);
            range[
              `${min + rangeIndex * rangeSize}-${Math.min(
                min + (rangeIndex + 1) * rangeSize - 1,
                max
              )}`
            ]++;
          }
        });

        return range;
      }

      let intData;
      if (type === "bar") {
        let maxData = Math.max(...data);
        let minData = Math.min(...data);
        intData = countInRange(data, minData, maxData, 5);
        delete intData.null;
        console.log(intData);
      } else if (type === "pie") {
        intData = countStrings(data);
        console.log(intData);
        intData = sumUntilHalf(intData);
        console.log(intData);
      }
      // Create a new chart instance
      chartRef.current.chart = new Chart(
        ctx,

        type === "bar"
          ? {
              type: "bar",
              data: {
                datasets: [
                    {
                        label: "Count",
                        data: intData,
                        backgroundColor: [
                          "rgba(75,192,192,0.4)", 
                          "rgba(255,99,132,0.2)", 
                          "rgba(255,205,86,0.2)", 
                          "rgba(153, 102, 255, 0.2)", 
                          "rgba(255, 159, 64, 0.2)"
                        ],
                        borderColor: [
                          "rgba(75,192,192,1)", 
                          "rgba(255,99,132,1)", 
                          "rgba(255,205,86,1)", 
                          "rgba(153, 102, 255, 1)", 
                          "rgba(255, 159, 64, 1)"
                        ],
                        borderWidth: 1,
                        hoverBackgroundColor: [
                          "rgba(75,192,192,0.8)", 
                          "rgba(255,99,132,0.4)", 
                          "rgba(255,205,86,0.4)", 
                          "rgba(153, 102, 255, 0.4)", 
                          "rgba(255, 159, 64, 0.4)"
                        ],
                        hoverBorderColor: [
                          "rgba(75,192,192,1)", 
                          "rgba(255,99,132,1)", 
                          "rgba(255,205,86,1)", 
                          "rgba(153, 102, 255, 1)", 
                          "rgba(255, 159, 64, 1)"
                        ],
                      }
                ],
              },
              options: {
                scales: {
                  x: {
                    type: "category",
                  },
                  y: {
                    beginAtZero: true,
                  },
                },
                plugins: {
                    legend: {
                      display: false
                    }
                  }
              },
            }
          : {
            type: "pie",
            data: {
              labels: arrayString, // use arrayString as labels
              datasets: [
                {
                    data: arrayNumber, // use arrayString as data
                    backgroundColor: [
                      "rgba(75,192,192,0.4)", 
                      "rgba(255,99,132,0.2)", 
                      "rgba(255,205,86,0.2)", 
                      "rgba(153, 102, 255, 0.2)", 
                      "rgba(255, 159, 64, 0.2)",
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)"
                    ],
                    borderColor: [
                      "rgba(75,192,192,1)", 
                      "rgba(255,99,132,1)", 
                      "rgba(255,205,86,1)", 
                      "rgba(153, 102, 255, 1)", 
                      "rgba(255, 159, 64, 1)",
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)"
                    ],
                    borderWidth: 1,
                    hoverBackgroundColor: [
                      "rgba(75,192,192,0.8)", 
                      "rgba(255,99,132,0.4)", 
                      "rgba(255,205,86,0.4)", 
                      "rgba(153, 102, 255, 0.4)", 
                      "rgba(255, 159, 64, 0.4)",
                      "rgba(255, 99, 132, 0.4)",
                      "rgba(54, 162, 235, 0.4)"
                    ],
                    hoverBorderColor: [
                      "rgba(75,192,192,1)", 
                      "rgba(255,99,132,1)", 
                      "rgba(255,205,86,1)", 
                      "rgba(153, 102, 255, 1)", 
                      "rgba(255, 159, 64, 1)",
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)"
                    ],
                  },
              ],
            },
            options: {
            },
          }
      );
    }
  }, [data, type]);

  return <canvas ref={chartRef} />;
};
