import React from 'react';
import Image from 'next/legacy/image';
import { afterArrow } from '@/assets';

const PopUpCleansing = ({ isOpen, close }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-screen h-screen bg-black bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none font-kanit text-textPrimary">
      <div className="relative w-1/3 h-2/3 mx-auto my-6">
        {/* Modal content */}
        <div className="relative flex flex-col w-full bg-white border-2 border-gray rounded-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 rounded-t bg-primary">
            <h3 className="text-[20px] text-white">ทำความสะอาดข้อมูล</h3>
            <button onClick={close} className='text-[24px] text-white h-full px-3 text-center hover:text-black'>
                X
            </button>
          </div>
          {/* Body */}
          <div className="relative flex-auto">
            <div className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <button className=' w-full py-2 text-start text-[20px] text-textPrimary'>ลบค่าว่างที่ไม่คาดคิดลบค่าว่างที่ไม่คาดคิด</button>
                    <p className='text-[16px] text-textGray cursor-pointer'>กับลบค่าว่างคือการลบข้อมูลค่าว่างคือการลบข้อมูลค่าว่าง</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>

            <div className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <button className=' w-full py-2 text-start text-[20px] text-textPrimary'>ลบคอลัมน์ค่าคงตัว</button>
                    <p className='text-[16px] text-textGray cursor-pointer'>กับลบค่าว่างคือการลบข้อมูลค่าว่างคือการลบข้อมูลค่าว่าง</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>

            <div className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <button className=' w-full py-2 text-start text-[20px] text-textPrimary'>ลบข้อมูลที่อ่านไม่ได้</button>
                    <p className='text-[16px] text-textGray cursor-pointer'>กับลบค่าว่างคือการลบข้อมูลค่าว่างคือการลบข้อมูลค่าว่าง</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
            <div className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <button className=' w-full py-2 text-start text-[20px] text-textPrimary'>ตัวจัดการเอาท์ไลเออร์</button>
                    <p className='text-[16px] text-textGray cursor-pointer'>กับลบค่าว่างคือการลบข้อมูลค่าว่างคือการลบข้อมูลค่าว่าง</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>

            <div className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <button className=' w-full py-2 text-start text-[20px] text-textPrimary'>ตัวจัดการอินไลเออร์</button>
                    <p className='text-[16px] text-textGray cursor-pointer'>กับลบค่าว่างคือการลบข้อมูลค่าว่างคือการลบข้อมูลค่าว่าง</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
            <div className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <button className=' w-full py-2 text-start text-[20px] text-textPrimary'>ตัดแต่งข้อมูล</button>
                    <p className='text-[16px] text-textGray cursor-pointer'>กับลบค่าว่างคือการลบข้อมูลค่าว่างคือการลบข้อมูลค่าว่าง</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>


            <div className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <button className=' w-full py-2 text-start text-[20px] text-textPrimary'>แบ่งกลุ่ม</button>
                    <p className='text-[16px] text-textGray cursor-pointer'>กับลบค่าว่างคือการลบข้อมูลค่าว่างคือการลบข้อมูลค่าว่าง</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>

            <div className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <button className=' w-full py-2 text-start text-[20px] text-textPrimary'>รวมตัวซ้ำ</button>
                    <p className='text-[16px] text-textGray cursor-pointer'>กับลบค่าว่างคือการลบข้อมูลค่าว่างคือการลบข้อมูลค่าว่าง</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpCleansing;
