import React from 'react'
import Image from 'next/legacy/image'
import { paper } from '@/assets'
import { Navbar } from '@/components/Navbar'
import { Projects } from '@/components/Projects'

const myProject = () => {
    const mockData = [
        {
            projectName:"project1"
        },
        {
            projectName:"project1"
        },
        {
            projectName:"project1"
        },
        {
            projectName:"projecv2222211122222t1"
        },
        {
            projectName:"project1"
        },
        {
            projectName:"project1"
        },
        {
            projectName:"project1"
        },
        {
            projectName:"project1"
        }
    ]
  return (
    <div className="relative w-screen h-full">
        <Navbar />
        <div className='flex flex-col w-full px-16 justify-center'>
            <p className='font-kanit text-textPrimary text-[32px] text-center mt-10'>โปรเจกต์ของฉัน</p>
            <div className='grid grid-cols-4 gap-12 mt-16'>
                <div className='flex flex-col w-full h-full border-2 border-borderNavbar rounded-xl '>
                    <div className='flex flex-col py-4'>
                        <Image src={paper} alt='paper' objectFit='fill' width={100} height={100} />
                        <p className='font-kanit text-textPrimary text-[24px] w-full text-center'>สร้างโปรเจกท์ใหม่</p>
                    </div>
                    <div className='font-kanit text-[24px] w-full text-center border-t border-borderNavbar py-4 flex flex-row justify-center px-6 bg-primary text-white rounded-b-lg hover:bg-hoverPrimary hover:cursor-pointer'>
                        <p className=''>
                           + อัปโหลด
                        </p>
                    </div>
                </div>
                {mockData.map((data,index)=>(
                    <Projects projectName={data.projectName}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default myProject