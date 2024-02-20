import React, {useState, useEffect} from 'react';
import { BarChartCell } from './BarChartCell';
import { TableDataOfString } from './TableOfString';

export const DataTable = ({ tableData, onSelectChange }) => {
  // Extract column names from the first row of the tableData
  const columns = Object.keys(tableData[0] || []);
  
  const [dataInTable, setDataInTable] = useState(tableData)
  const [type, setType] = useState("string")
  
  useEffect(() => {
    setDataInTable(tableData)
  }, [tableData])
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
        {dataInTable.map((rowData, rowIndex) => {
            
            return(
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => 
            {
                return(
              <td
                key={colIndex}
                className='border p-2 text-center text-[20px] '
                style={{
                  width: `calc(${colIndex=== columns.length - 1 ? '3/6' : '1/6'} * 100%)`,
                  fontFamily: 'Sarabun',
                }}
              >
                 
                  {colIndex === 0 ?
                  <p>{rowData[column]}</p>
                    
                :colIndex === 1 ?
                (
                    rowData[column] === 'string' ?
                    <select
                    value={rowData[column]}
                    onChange={(e) => {
                      onSelectChange(rowIndex, column, e.target.value);
                    }}
                  >
                    <option value='string'>string</option>
                    <option value='category'>category</option>
                  </select>
                  :rowData[column] === 'category'?
                  <select
                    value={rowData[column]}
                    onChange={(e) => {
                      onSelectChange(rowIndex, column, e.target.value);
                    }}
                  >
                    <option value='string'>string</option>
                    <option value='category'>category</option>
                  </select>
                  :<p>{rowData[column]}</p>
                )  
                :colIndex === 2 ?
                <p>{rowData[column]}</p>

                :colIndex === 3 ?
                (
                    
                    rowData[column].type === 'bar' ? (
                        <BarChartCell data={rowData[column].data} type={rowData[column].type} />
                      ) : rowData[column].type === 'pie' ? (
                        <BarChartCell data={rowData[column].data} type={rowData[column].type} />
                      ) :rowData[column].type === 'non' ?
                     
                        <TableDataOfString data={rowData[column].data}/>
                        
                        // <p>จำนวนข้อมูลซ้ำทั้งหมด : example แถว</p>
                      :<p></p>
                )

                :(<p></p>)
                }
                
              </td>
            )})}
          </tr>
        )})}
      </tbody>
    </table>
  );
};
