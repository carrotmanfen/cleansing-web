import React from 'react'
import Link from 'next/link';
import Image from 'next/legacy/image'
import { paper, binIcon } from '@/assets'
import useAddProject from '@/hooks/useAddProject';

export const DatasetComponent = ({projectName, fileName, columns, rows}) => {
  const {error, isPending, createProject} = useAddProject()
  function convertStringsToNumbers(data, columnName) {
    // Check if all values in the column can be converted to a number
    if (data.every(row => !isNaN(Number(row[columnName])))) {
      // If so, convert them
      data.forEach(row => {
        row[columnName] = Number(row[columnName]);
      });
    }
  }
  function canConvertToNumber(str) {
    return !isNaN(Number(str));
  }
  function determineColumnType(columnValues) {
    // Your logic to determine the type based on the values
    // Example: Check if all values are numbers, strings, or a mix of both
    const allNumbers = columnValues.every(value => typeof value === 'number'||canConvertToNumber(value));
    const allStrings = columnValues.every(value => typeof value === 'string'||value === null);
  
    if (allNumbers) {
      return 'number';
    } else if (allStrings) {
      return 'string';
    } else {
      return 'number';
    }
}
  const handleCreateProject = async() =>{
    await columns.map(column => {
        column.type = determineColumnType(rows.map(row => row[column.dataKey]))
    })
    await columns.map(column => {
        convertStringsToNumbers(rows, column);
    });
    console.log(columns)
    console.log(rows)
    await createProject(columns, rows, projectName, fileName)
  }
  return (
    <div className='flex flex-col w-full h-full border-2 border-borderNavbar rounded-xl '>
        <div onClick={handleCreateProject} className='flex flex-col hover:cursor-pointer hover:bg-gray py-4'>
            <Image src={paper} alt='paper' objectFit='fill' width={100} height={100} />
        </div>
        <div className='font-kanit text-textPrimary text-[24px] w-full text-center border-t border-borderNavbar py-4 flex h-full flex-row justify-center items-center px-6 bg-white rounded-b-lg'>
            <div onClick={handleCreateProject} className='hover:cursor-pointer hover:text-primary hover:underline '>
                {projectName}
            </div>
        </div>
    </div>
  )
}
