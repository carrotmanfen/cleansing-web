import React, {useState, useEffect} from 'react'
import { Bar } from 'react-chartjs-2';
import { DataTable } from './DataTable';
import { columns } from '@/constants/datasetTest1';

export const PivotView = ({dataColumns, dataRows, updateProjectFunction}) => {
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
          return 'number';
        } else if (allStrings) {
          return 'string';
        } else {
          return 'number';
        }
    }

    const transformedData = dataColumns.map(column => {
        const rowValue = dataRows.map(row => row[column.dataKey])
        const nullUndefinedCount = rowValue.filter(value => value === null || value === undefined).length;
        // const chartType
        let chartType;

        switch (column.type) {
            case 'number': chartType = 'bar';
            break;
            case 'Number': chartType = 'bar';
            break;
            case 'string': chartType = 'non';
            break;
            case 'String': chartType = 'non';
            break;
            case 'category': chartType = 'pie';
            break;
            case 'Category': chartType = 'pie';
            break;
            default: chartType = 'non';
        }
        console.log(chartType)
        return {
          'ชื่อคอลัมน์': column.label,
          'ประเภท': column.type, 
          'ข้อมูลว่าง': nullUndefinedCount, 
          'แผนภูมิ': {
            type: chartType, 
            data: rowValue ,
          },
        };
      });

    console.log(transformedData)

    const [tableData, setTableData] = useState(transformedData)
      console.log(tableData)
      const handleSelectChange = async(rowIndex, columnName, selectedValue) => {
        // Update the state with the new selected value
        const updatedTableData = [...tableData];
        updatedTableData[rowIndex][columnName] = selectedValue;
        updatedTableData[rowIndex][columnName] = selectedValue;
        setTableData(updatedTableData);
        const queryParams = new URLSearchParams(window.location.search);
        const searchProjectId = queryParams.get('projectId');
        dataColumns[rowIndex].type = selectedValue;
        const data_set ={
            columns: dataColumns,
            rows: dataRows,
        }
        await updateProjectFunction(searchProjectId,data_set)
      };
    useEffect(() => {
        setTableData(transformedData)
    }, [tableData]);
      return (
        <div className='w-full flex mb-4'>
            {tableData&&<DataTable tableData={tableData} onSelectChange={handleSelectChange}/>}
        </div>
      );
}
