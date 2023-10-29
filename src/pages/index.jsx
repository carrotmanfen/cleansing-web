import React from 'react'
import Image from 'next/legacy/image'
import { logo } from '@/assets';
import { Navbar } from '../components/Navbar'
import { pic } from '@/assets'

export default function Home() {
  return (
    <main
      className="text-red"
    >
      <div className='relative w-screen h-full'>
        <Navbar />
        <div className='w-full flex flex-col items-center'>
          <div className='mt-8'>
            <Image src={logo} width={150} height={200} objectFit='contain' alt="logo" />
          </div>
          <p className='text-[32px] text-textPrimary font-kanit mt-2'>คลีนเนอร์</p>
          <div className='flex flex-col w-full mt-2 font-kanit text-textPrimary text-center items-center'>
            <p className='text-textGray text-[16px]'>คลีนเนอร์เว็บไซต์สำหรับการศึกษา เรียนรู้</p>
            <p className='text-textGray text-[16px]'>และทำความสะอาดข้อมูล คลีนเนอร์จะช่วยทำให้</p>
            <p className='text-textGray text-[16px]'>ข้อมูลของผู้ใช้มีคุณภาพมากยิ่งขึ้น</p>
            <button className='px-12 py-2 bg-primary text-white text-[24px] w-fit rounded-2xl mt-8 hover:bg-hoverPrimary'>ทำความสะอาดข้อมูล</button>
          </div>
          <div className='w-[700px] flex flex-col mt-20 justify-around border-0 pb-20'>
            <p className='text-textPrimary font-kanit text-[24px]'>Some of Feature</p>
            <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
              <Image src={pic} width={700} height={500} objectFit='corver' alt="pic" />
              <p className='text-textGray text-[16px] mt-2'> Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of descriptionSome of descriptionSome of descriptionSome of descriptionSome of description</p>
            </div>

            <p className='text-textPrimary font-kanit text-[24px] mt-5'>Some of Feature 2</p>
            <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
              <Image src={pic} width={700} height={500} objectFit='corver' alt="pic" />
              <p className='text-textGray text-[16px] mt-2'> Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of descriptionSome of descriptionSome of descriptionSome of descriptionSome of description</p>
            </div>

            <p className='text-textPrimary font-kanit text-[24px] mt-5'>Some of Feature 3</p>
            <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
              <Image src={pic} width={700} height={500} objectFit='corver' alt="pic" />
              <p className='text-textGray text-[16px] mt-2'> Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of descriptionSome of descriptionSome of descriptionSome of descriptionSome of description</p>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}