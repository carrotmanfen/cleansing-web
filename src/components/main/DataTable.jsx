import React, {useState} from 'react';
import { BarChartCell } from './BarChartCell';

export const DataTable = ({ tableData, onSelectChange }) => {
  // Extract column names from the first row of the tableData
  const columns = Object.keys(tableData[0] || []);
  const [type, setType] = useState("string")
  return (
    <table className='w-full table-auto'>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className={`border border-black p-2 text-center font-semibold bg-primary text-white text-[20px] ${
                index === columns.length - 1 ? 'w-3/6' : 'w-1/6'
              }`}
              style={{ fontFamily: 'Sarabun' }}
            >
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td
                key={colIndex}
                className='border p-2 text-center text-[20px] '
                style={{
                  width: `calc(${colIndex=== columns.length - 1 ? '3/6' : '1/6'} * 100%)`,
                  fontFamily: 'Sarabun',
                }}
              >
                {colIndex === 1 ? (
                  <select
                    value={rowData[column]}
                    onChange={(e) => {
                      onSelectChange(rowIndex, column, e.target.value);
                    }}
                  >
                    <option value='integer'>integer</option>
                    <option value='decimal'>decimal</option>
                    <option value='string'>string</option>
                    <option value='category'>category</option>
                  </select>
                ) : column === 'แผนภูมิ' ? (
                    
                    rowData[column].type === 'bar' ? (
                        <BarChartCell data={rowData[column].data} type={rowData[column].type} />
                      ) : rowData[column].type === 'pie' ? (
                        <BarChartCell data={rowData[column].data} type={rowData[column].type} />
                      ) : (
                        <p>จำนวนข้อมูลซ้ำทั้งหมด : {rowData[column].data} แถว</p>
                      )
                ) : (
                  rowData[column]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
