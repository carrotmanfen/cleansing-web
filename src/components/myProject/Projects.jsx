import React from 'react'
import Link from 'next/link';
import Image from 'next/legacy/image'
import { paper, binIcon } from '@/assets'

export const Projects = ({projectName, fileName, onClick}) => {
  return (
    <div className='flex flex-col w-full h-full border-2 border-borderNavbar rounded-xl '>
        <Link href={"/main"} className='flex flex-col hover:cursor-pointer hover:bg-gray py-4'>
            <Image src={paper} alt='paper' objectFit='fill' width={100} height={100} />
            <p className='font-kanit text-textPrimary text-[24px] w-full text-center truncate px-4'>{fileName}</p>
        </Link>
        <div className='font-kanit text-textPrimary text-[24px] w-full text-center border-t border-borderNavbar py-4 flex flex-row justify-between px-6 bg-white rounded-b-lg'>
            <Link href={"/main"} className='hover:cursor-pointer hover:text-primary hover:underline truncate'>
                {projectName}
            </Link>
            <div onClick={onClick} className='hover:bg-primaryRed px-2 rounded-md w-[40px] flex-shrink-0 cursor-pointer'>
                <button >
                    <Image src={binIcon} alt='binIcon' objectFit='fill' height={20} width={20}/>
                </button>
            </div>
        </div>
    </div>
  )
}
