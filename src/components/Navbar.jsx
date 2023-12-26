import React from 'react'
import Image from "next/legacy/image";
import { logo, profile } from '@/assets';
import Link from 'next/link';
import { atomUserRole } from '@/atoms/atomUserRole';
import { useRecoilState } from "recoil";
import { useRouter } from 'next/router';

export const Navbar = ({ menu }) => {
  const [user, setUser] = useRecoilState(atomUserRole)
  const router = useRouter()
  const handleLogout = () =>{
    setUser({
      isLogin: false,
      username:null,
      userId:null,
      project:[]
    })
    router.push('/login')
  }
  return (
    <div className='w-screen flex flex-row justify-between sticky h-[80px] border-b-2 border-borderNavbar z-50 top-0 bg-white'>
      <div className='flex flex-row items-center gap-4 h-full font-kanit text-[20px] text-textPrimary pl-8'>
        <Link href={"/"} className='h-full mt-4'>
          <Image src={logo} width={60} height={60} objectFit='contain' alt="logo" />
        </Link>
        <Link href={"/"} className='h-full'>
          <button className="h-full hover:bg-primary hover:text-white px-4">
            คลีนเนอร์
          </button>
        </Link>
        <Link href={"/document"} className='h-full'>
          <button className={`h-full hover:bg-primary hover:text-white px-4 ${menu == 1 ? `bg-primary text-white` : ``}`}>
            ทฤษฏี
          </button>
        </Link>
        <Link href={"/manual"} className='h-full'>
          <button className={`h-full hover:bg-primary hover:text-white px-4 ${menu == 2 ? `bg-primary text-white` : ``}`}>
            คู่มือ
          </button>
        </Link>
        <Link href={"/myProject"} className='h-full'>
          <button className={`h-full hover:bg-primary hover:text-white px-4 ${menu == 3 ? `bg-primary text-white` : ``}`}>
            โปรเจกต์ของฉัน
          </button>
        </Link>
      </div>
      {user.isLogin?<div className='flex flex-row items-center gap-8 h-full font-kanit text-[20px] pr-8'>
        <div className='flex flex-row items-center gap-2'>
          <Image src={profile} width={60} height={60} objectFit='contain' alt="profile" />
          <p className='text-primary'>{user.username}</p>
        </div>
        
          <button onClick={handleLogout} className='w-36 py-2 bg-primary text-white rounded-2xl hover:bg-hoverPrimary'>
            ออกจากระบบ
          </button>
          
      </div>
      
      :<div className='flex flex-row items-center gap-8 h-full font-kanit text-[20px] pr-8'>
        <Link href={"/register"}>
          <button className='w-36 py-2 border-2 border-primary rounded-2xl text-primary hover:bg-primary hover:text-white'>
            สมัครสมาชิก
          </button>
        </Link>
          <Link href={"/login"}>
            <button className='w-36 py-2 bg-primary text-white rounded-2xl hover:bg-hoverPrimary'>
              เข้าสู่ระบบ
            </button>
          </Link>
      </div>}
    </div>
  )
}
