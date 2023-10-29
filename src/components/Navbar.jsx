import React from 'react'
import Image from "next/legacy/image";
import { logo } from '@/assets';
import Link from 'next/link';

export const Navbar = ({ menu }) => {

  return (
    <div className='w-screen flex flex-row justify-between sticky h-[80px] border-b-2 border-borderNavbar z-50 top-0 bg-white'>
      <div className='flex flex-row items-center gap-4 h-full font-kanit text-[20px] text-textPrimary pl-8'>
        <Link href={"/"} className='h-full mt-4'>
          <Image src={logo} width={60} height={60} objectFit='contain' alt="logo" />
        </Link>
        <Link href={"/"} className='h-full '>
          <button className="h-full hover:bg-primary hover:text-white px-4">
            คลีนเนอร์
          </button>
        </Link>
        <button className={`h-full hover:bg-primary hover:text-white px-4 ${menu == 1 ? `bg-primary text-white` : ``}`}>
          <Link href={"/document"}>
            เอกสาร
          </Link>
        </button>
        <button className={`h-full hover:bg-primary hover:text-white px-4 ${menu == 2 ? `bg-primary text-white` : ``}`}>
          <Link href={"/manual"}>
            คู่มือ
          </Link>
        </button>
      </div>
      <div className='flex flex-row items-center gap-8 h-full font-kanit text-[20px] pr-8'>
        <button className='w-36 py-2 border-2 border-primary rounded-2xl text-primary hover:bg-primary hover:text-white'>
          <Link href={"/register"}>
            สมัครสมาชิก
          </Link>
        </button>
        <button className='w-36 py-2 bg-primary text-white rounded-2xl hover:bg-hoverPrimary'>
          <Link href={"/login"}>
            เข้าสู่ระบบ
          </Link>
        </button>
      </div>
    </div>
  )
}
