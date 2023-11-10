import React, {useState} from 'react'
import { Bar } from 'react-chartjs-2';
import { DataTable } from './DataTable';

export const PivotView = () => {
    const [tableData, setTableData] = useState([
        {
            'ชื่อคอลัมน': 'Januaryหกฟหที่',
            'ประเภท': 'integer',
            'ข้อมูลว่าง': 40,
            'Data Set 3': [10, 20, 30, 40, 50],
          },
          {
            'ชื่อคอลัมน': 'February',
            'ประเภท': 'integer',
            'ข้อมูลว่าง': 20,
            'Data Set 3': [30, 40, 50, 60, 70],
          },
          {
            'ชื่อคอลัมน': 'March',
            'ประเภท': 'decimal',
            'ข้อมูลว่าง': 40,
            'Data Set 3': [15, 25, 35, 45, 55],
          },
          {
            'ชื่อคอลัมน': 'April',
            'ประเภท': 'decimal',
            'ข้อมูลว่าง': 40,
            'Data Set 3': [15, 25, 35, 45, 55],
          },
          {
            'ชื่อคอลัมน': 'May',
            'ประเภท': 'string',
            'ข้อมูลว่าง': 40,
            'Data Set 3': [15, 25, 35, 45, 55],
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
