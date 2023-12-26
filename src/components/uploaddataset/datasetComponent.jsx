import React from 'react'
import Link from 'next/link';
import Image from 'next/legacy/image'
import { paper, binIcon } from '@/assets'
import useAddProject from '@/hooks/useAddProject';

export const DatasetComponent = ({projectName, fileName, columns, rows}) => {
  const {error, isPending, createProject} = useAddProject()
  const handleCreateProject = () =>{
    createProject(projectName, fileName, columns, rows)
  }
  return (
    <div className='flex flex-col w-full h-full border-2 border-borderNavbar rounded-xl '>
        <div onClick={handleCreateProject} className='flex flex-col hover:cursor-pointer hover:bg-gray py-4'>
            <Image src={paper} alt='paper' objectFit='fill' width={100} height={100} />
            <p className='font-kanit text-textPrimary text-[24px] w-full text-center truncate px-4'>{fileName}</p>
        </div>
        <div className='font-kanit text-textPrimary text-[24px] w-full text-center border-t border-borderNavbar py-4 flex flex-row justify-between px-6 bg-white rounded-b-lg'>
            <div onClick={handleCreateProject} className='hover:cursor-pointer hover:text-primary hover:underline truncate'>
                {projectName}
            </div>
        </div>
    </div>
  )
}
