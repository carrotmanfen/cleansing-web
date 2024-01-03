import React, { useState } from 'react'
import { paper } from '@/assets'
import { Navbar } from '@/components/Navbar'
import { DatasetComponent } from '@/components/uploaddataset/datasetComponent';
import {columns as columns1, rows as rows1} from '@/constants/datasetTest1';
import {columns as columns2, rows as rows2} from '@/constants/datasetTest2';
import {columns as columns3, rows as rows3} from '@/constants/datasetTest3';

const DataTest = () => {

    const testData = [
        {
            projectName: "Zomato Cafe Reviews",
            fileName: "revies.csv",
            columns:columns1,
            rows:rows1
        },
       {
            projectName: "ดัชนีสมรรถนะสิ่งแวดล้อมของประเทศไทย",
            fileName: "EPI.csv",
            columns:columns2,
            rows:rows2
        }, 
        {
            projectName: "ผลการรับฟังประสบการณ์ผู้ป่วยสู่การปรับระบบบริการ",
            fileName: "datapex2022.csv",
            columns:columns3,
            rows:rows3
        },
    ]
    return (
        <div className="relative w-screen h-full">
            <Navbar />
            <div className='flex flex-col w-full px-16 justify-center'>
                <p className='font-kanit text-textPrimary text-[32px] text-center mt-10'>ชุดข้อมูลสำหรับทดลอง</p>
                <div className='grid grid-cols-4 gap-12 mt-16'>
                    {testData.map((data, index) => {
                        console.log(rows1)
                        return(
                            <div key={index}>
                                <DatasetComponent projectName={data.projectName} fileName={data.fileName}  columns={data.columns} rows={data.rows}/>
                            </div>
                            )
                        }
                    )}
                </div>
            </div>
        </div>
    )
}

export default DataTest