import React, { useState, useEffect } from 'react'
import Image from 'next/legacy/image'
import { Navbar } from '../components/Navbar'
import { manualTest } from '@/assets'
import Link from 'next/link'

const Manual = () => {

    return (
        <div className='relative w-screen h-full pb-20'>
            <Navbar  menu={2} />
            <div className='w-full flex flex-col items-center'>
                <div className='w-[700px] flex flex-col mt-10 justify-around border-0'>
                    <p className='text-textPrimary font-kanit text-[24px]'>Why Data Important</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <Image src={manualTest} width={700} height={500} objectFit='corver' alt="pic-manual" />
                        <p className='text-textGray text-[16px] mt-2'> Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of descriptionSome of descriptionSome of descriptionSome of descriptionSome of description</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5'>Cleansing Data</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <Image src={manualTest} width={700} height={500} objectFit='contain' alt="pic-manual" />
                        <p className='text-textGray text-[16px] mt-2'> Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of descriptionSome of descriptionSome of descriptionSome of descriptionSome of description</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5'>Export</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <Image src={manualTest} width={700} height={500} objectFit='corver' alt="pic-manual" />
                        <p className='text-textGray text-[16px] mt-2'> Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of descriptionSome of descriptionSome of descriptionSome of descriptionSome of description</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full mt-2 font-kanit text-textPrimary text-center items-center'>
                <Link href={"/uploadPage"} className='px-12 py-2 bg-primary text-white text-[24px] w-fit rounded-2xl mt-8 hover:bg-hoverPrimary'>ทำความสะอาดข้อมูล</Link>
            </div>
        </div>
    )
}

export default Manual