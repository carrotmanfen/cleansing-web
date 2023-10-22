import React from 'react'
import Image from "next/legacy/image";
import { logo } from '@/assets';

export const Navbar = () => {

  return (
    <div className='w-screen flex flex-row justify-between sticky h-[80px] border-b-2 border-borderNavbar z-80 top-0 bg-white'>
        <div className='flex flex-row items-center gap-4 h-full font-kanit text-[20px] text-textPrimary pl-8'>
            <Image src={logo} width={80} height={80} objectFit='cover' alt="logo" />
            <button className="h-full hover:bg-primary hover:text-white px-4">คลีนเนอร์</button>
            <button className="h-full hover:bg-primary hover:text-white px-4">เอกสาร</button>
            <button className="h-full hover:bg-primary hover:text-white px-4">คู่มือ</button>
        </div>
        <div className='flex flex-row items-center gap-8 h-full font-kanit text-[20px] pr-8'>
            <button className='w-36 py-2 border-2 border-primary rounded-2xl text-primary hover:bg-primary hover:text-white'>สมัครสมาชิก</button>
            <button className='w-36 py-2 bg-primary text-white rounded-2xl hover:bg-hoverPrimary'>เข้าสู่ระบบ</button>
        </div>
    </div>
  )
}
