import React, {useState} from 'react'
import { Bar } from 'react-chartjs-2';
import { DataTable } from './DataTable';

export const PivotView = () => {
    const [tableData, setTableData] = useState([
        {
            'ชื่อคอลัมน์': 'January',
            'ประเภท': 'integer',
            'ข้อมูลว่าง': 40,
            'แผนภูมิ': {
                type:"pie",
                data:[10, 20, 30, 40, 50]
            },
          },
          {
            'ชื่อคอลัมน์': 'February',
            'ประเภท': 'category',
            'ข้อมูลว่าง': 20,
            'แผนภูมิ': {
                type:"bar",
                data:[10, 20, 30, 40, 50]
            },
          },
          {
            'ชื่อคอลัมน์': 'March',
            'ประเภท': 'decimal',
            'ข้อมูลว่าง': 40,
            'แผนภูมิ': {
                type:"pie",
                data:[10, 20, 30, 40, 50]
            },
          },
          {
            'ชื่อคอลัมน์': 'April',
            'ประเภท': 'decimal',
            'ข้อมูลว่าง': 40,
            'แผนภูมิ': {
                type:"bar",
                data:[10, 20, 30, 40, 50]
            },
          },
          {
            'ชื่อคอลัมน์': 'May',
            'ประเภท': 'string',
            'ข้อมูลว่าง': 40,
            'แผนภูมิ': {
                type:"non",
                data:10
            },
          },
      ]);

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
