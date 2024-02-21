import React from 'react'

export const NavbarDetail = ({rowNumber, colNumber,  clean_name, onClick}) => {
   
  return (
    <div className='w-screen flex flex-row justify-start sticky h-[80px] z-50 top-[80px] bg-lightBlue items-center px-10'>
        <p className='font-kanit text-textPrimary text-[16px]'>รายละเอียดข้อมูล</p>
        <div className="border-l-2 border-borderNavbar h-[50px] mx-4"></div>
        <p className='font-kanit text-textPrimary text-[16px]'>{rowNumber} แถว {colNumber} หลัก</p>
        <div className="border-l-2 border-borderNavbar h-[50px] mx-4"></div>
        {clean_name&&<p onClick={onClick} className='font-kanit text-textPrimary text-[16px] border rounded-md px-2 cursor-pointer hover:bg-primaryRed hover:text-white'>{clean_name} x</p>}
    </div>
  )
}
