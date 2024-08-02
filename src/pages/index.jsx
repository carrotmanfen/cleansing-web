import React, { useEffect } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { logo, upload, connectMysql, functionCleansing, download } from '@/assets';
import { Navbar } from '../components/Navbar'
import { atomUserRole } from "@/atoms/atomUserRole";
import { useRecoilState } from "recoil";
import useAccount from '@/hooks/useAccount';

export default function Home() {
  const [userRole, setUserRole] = useRecoilState(atomUserRole)
  const { refreshLogin } = useAccount()
  useEffect(() => {

    if (userRole.isLogin === false) {
      const username = localStorage.getItem('username')
      if (username) {
        refreshLogin(username)
      }
    }
  }, [userRole.isLogin, refreshLogin]);
  const handleClean = () => {
    if (userRole.isLogin === false) {
      window.location.href = "/login"
    }else{
      window.location.href = "/uploadPage"
    }
  }
  return (
    <main
      className="text-red"
    >
      <div className='relative w-full h-full font-kanit overflow-x-hidden'>
        <Navbar />
        <div className='w-full flex flex-col items-center'>
          <div className='mt-36'>
            <Image src={logo} width={150} height={200} objectFit='contain' alt="logo" />
          </div>
          <p className='text-[40px] text-textPrimary font-kanit mt-2'>คลีนเนอร์</p>
          <div className='flex flex-col w-full mt-2 font-kanit text-textPrimary text-center items-center '>
            <p className='text-textGray text-[24px]'>คลีนเนอร์เว็บไซต์สำหรับการศึกษา เรียนรู้</p>
            <p className='text-textGray text-[24px]'>และทำความสะอาดข้อมูล คลีนเนอร์จะช่วยทำให้</p>
            <p className='text-textGray text-[24px]'>ข้อมูลของผู้ใช้มีคุณภาพมากยิ่งขึ้น</p>
            <div onClick={handleClean} className='px-12 py-2 bg-primary text-white text-[32px] w-fit rounded-2xl mt-8 hover:bg-hoverPrimary hover:cursor-pointer'>ทำความสะอาดข้อมูล</div>
          </div>
          <div className='w-[700px] flex flex-col mt-20 justify-around border-0 pb-20'>
            <p className='text-textPrimary font-kanit text-[32px]'>อัปโหลดไฟล์</p>
            <div className='w-[700px] mt-5 flex flex-col justify-center border-0 '>
              <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                <Image src={upload} width={700} height={400} objectFit='contain' alt="upload" />
              </div>
              <p className='text-textGray text-[24px] mt-6'> ผู้ใช้งานสามารถอัพโหลดไฟล์ประเภท csv, xls และ xlsx ที่มีข้อมูลอยู่ในรูปแบบตาราง หรือเลือกเชื่อมต่อฐานข้อมูล MySQL หรือเลือกใช้ชุดข้อมูลทดลองที่มีบนเว็บไซต์ เพื่อนำมาทำความสะอาด </p>
            </div>

            <p className='text-textPrimary font-kanit text-[32px] mt-5'>เชื่อมฐานข้อมูล</p>
            <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
              <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                <Image src={connectMysql} width={700} height={400} objectFit='contain' alt="connectMysql" />
              </div>
              <p className='text-textGray text-[24px] mt-6'> ผู้ใช้งานสามารถเชื่อมฐานข้อมูล MySQL เพื่อดึงข้อมูลมาทำความสะอาด</p>
            </div>

            <p className='text-textPrimary font-kanit text-[32px] mt-5'>ฟังก์ชันทำความสะอาดข้อมูล</p>
            <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
              <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                <Image src={functionCleansing} width={700} height={350} objectFit='contain' alt="functionCleansing" />
              </div>
              <p className='text-textGray text-[24px] mt-6'> มีฟังก์ชันทำความสะอาดข้อมูลทั้ง 12 ฟังก์ชัน ให้ผู้ใช้งานได้เลือกใช้ให้เหมาะสมกับข้อมูลของผู้ใช้งาน ไม่ว่าจะเป็น <strong>ลบคอลัมน์ข้อมูลที่ไม่เกี่ยวข้อง (Delete Irrelevant Data), ลบข้อมูลที่ซ้ำซ้อน (Delete Duplicate Data), แก้ไขข้อมูลที่ผิดปกติ (Edit inconsistent value)</strong> ฯลฯ เป็นต้น</p>
            </div>

            <p className='text-textPrimary font-kanit text-[32px] mt-5'>ดาวน์โหลดไฟล์</p>
            <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
              <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                <Image src={download} width={700} height={380} objectFit='contain' alt="changProjectName" />
              </div>
              <p className='text-textGray text-[24px] mt-6'> เมื่อผู้ใช้งานทำความสะอาดข้อมูลเสร็จแล้ว สามารถดาวน์โหลดไฟล์ข้อมูลหลังทำความสะอาดได้ โดยไฟล์ที่ดาวโหลดจะเป็นไฟล์ .csv</p>
            </div>

          </div>
          <div onClick={handleClean} className='px-12 py-2 bg-primary text-white text-[32px] w-fit rounded-2xl mt-8 hover:bg-hoverPrimary hover:cursor-pointer'>ทำความสะอาดข้อมูล</div>
        </div>

        <div className="w-screen h-[250px] mt-20 grid grid-cols-3 bg-primary font-kanit text-white overflow-x-hidden">
          <div className="flex justify-center items-center mt-10">
            <p className='font-bold'> Company Address</p>
          </div>
          <div className="flex justify-center items-center mt-10">
            <p className='font-bold'> Email</p>
          </div>
          <div className="flex justify-center items-center mt-10">
            <p className='font-bold'> Phone Number<br /></p>
          </div>

          <div>
            <p className="flex justify-center items-center text-center">126 ประชาอุทิศ แขวงบางมด<br />เขตทุ่งครุ จังหวัดกรุงเทพ 10140</p>
          </div>
          <div>
            <p className="flex justify-center items-center text-center"> Kanthila.k@mail.kmutt.ac.th<br />
              Kudsun.k@mail.kmutt.ac.th<br />
              Nonthapat.t@mail.kmutt.ac.th</p>
          </div>
          <div>
            <p className="flex justify-center items-center text-center"> 093 262 1995<br />
              088 871 4320<br />
              095 371 4986</p>
          </div>
        </div>
      </div>

    </main>
  )
}