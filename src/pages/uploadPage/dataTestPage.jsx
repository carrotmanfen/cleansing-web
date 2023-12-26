import React, { useState } from 'react'
import { paper } from '@/assets'
import { Navbar } from '@/components/Navbar'
import { DatasetComponent } from '@/components/uploaddataset/datasetComponent';

const DataTest = () => {

    const mockData = [
        {
            projectName: "Zomato Cafe Reviews",
            fileName: "revies.csv"
        },
        {
            projectName: "project1",
            fileName: "fileName.csv"
        },
        {
            projectName: "project1",
            fileName: "fileName.csv"
        },
    ]
    return (
        <div className="relative w-screen h-full">
            <Navbar />
            <div className='flex flex-col w-full px-16 justify-center'>
                <p className='font-kanit text-textPrimary text-[32px] text-center mt-10'>ชุดข้อมูลสำหรับทดลอง</p>
                <div className='grid grid-cols-4 gap-12 mt-16'>
                    {mockData.map((data, index) => (
                        <div key={index}>
                            <DatasetComponent projectName={data.projectName} fileName={data.fileName} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DataTest