import React from 'react'

export const NavbarDetail = ({rowNumber, colNumber}) => {
  return (
    <div className='w-screen flex flex-row justify-start sticky h-[80px] z-50 top-[80px] bg-lightBlue items-center px-10'>
        <p className='font-kanit text-textPrimary text-[16px]'>ชุดข้อมูลนักศึกษา</p>
        <div className="border-l-2 border-borderNavbar h-[50px] mx-4"></div>
        <p className='font-kanit text-textPrimary text-[16px]'>{rowNumber} แถว {colNumber} หลัก</p>
        <div className="border-l-2 border-borderNavbar h-[50px] mx-4"></div>
        {/* map data maybe need more component */}
    </div>
  )
}
