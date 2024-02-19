import React, {useState} from 'react'
import { Bar } from 'react-chartjs-2';
import { DataTable } from './DataTable';

export const PivotView = ({dataColumns, dataRows}) => {
    // const transformedData = {};
    // dataColumns.sort().forEach(column => {
    // transformedData[column.dataKey] = dataRows.map(row => row[column.dataKey]);
    // });
    
    function determineColumnType(columnValues) {
        // Your logic to determine the type based on the values
        // Example: Check if all values are numbers, strings, or a mix of both
        const allNumbers = columnValues.every(value => typeof value === 'number');
        const allStrings = columnValues.every(value => typeof value === 'string'||value === null);
      
        if (allNumbers) {
          return 'integer';
        } else if (allStrings) {
          return 'string';
        } else {
          return 'decimal';
        }
    }

    const transformedData = dataColumns.map(column => {
        const rowValue = dataRows.map(row => row[column.dataKey])
        const type = determineColumnType(rowValue)
        const nullUndefinedCount = rowValue.filter(value => value === null || value === undefined).length;
        // const chartType
        let chartType;

        switch (type) {
            case 'integer': chartType = 'bar';
            break;
            case 'decimal': chartType = 'bar';
            break;
            case 'string': chartType = 'non';
            break;
            case 'category': chartType = 'pie';
            break;
            default: chartType = 'non';
        }
        console.log(chartType)
        return {
          'ชื่อคอลัมน์': column.label,
          'ประเภท': type, 
          'ข้อมูลว่าง': nullUndefinedCount, 
          'แผนภูมิ': {
            type: chartType, 
            data: rowValue ,
          },
        };
      });

    console.log(transformedData)
    // console.log(dataColumns)
    // console.log(dataRows)

    const [tableData, setTableData] = useState(transformedData)
    // const [tableData, setTableData] = useState([
    //     {
    //         'ชื่อคอลัมน์': 'January',
    //         'ประเภท': 'integer',
    //         'ข้อมูลว่าง': 40,
    //         'แผนภูมิ': {
    //             type:"pie",
    //             data:[10, 20, 30, 40, 50]
    //         },
    //       },
    //       {
    //         'ชื่อคอลัมน์': 'February',
    //         'ประเภท': 'category',
    //         'ข้อมูลว่าง': 20,
    //         'แผนภูมิ': {
    //             type:"bar",
    //             data:[10, 20, 30, 40, 50]
    //         },
    //       },
    //       {
    //         'ชื่อคอลัมน์': 'March',
    //         'ประเภท': 'decimal',
    //         'ข้อมูลว่าง': 40,
    //         'แผนภูมิ': {
    //             type:"pie",
    //             data:[10, 20, 30, 40, 50]
    //         },
    //       },
    //       {
    //         'ชื่อคอลัมน์': 'April',
    //         'ประเภท': 'decimal',
    //         'ข้อมูลว่าง': 40,
    //         'แผนภูมิ': {
    //             type:"bar",
    //             data:[10, 20, 30, 40, 50]
    //         },
    //       },
    //       {
    //         'ชื่อคอลัมน์': 'May',
    //         'ประเภท': 'string',
    //         'ข้อมูลว่าง': 40,
    //         'แผนภูมิ': {
    //             type:"non",
    //             data:10
    //         },
    //       },
    //   ]);
      console.log(tableData)
      const handleSelectChange = (rowIndex, columnName, selectedValue) => {
        // Update the state with the new selected value
        const updatedTableData = [...tableData];
        updatedTableData[rowIndex][columnName] = selectedValue;
        setTableData(updatedTableData);
      };
    
      return (
        <div className='w-full flex mb-4'>
            <DataTable tableData={tableData} onSelectChange={handleSelectChange}/>
        </div>
      );
}
