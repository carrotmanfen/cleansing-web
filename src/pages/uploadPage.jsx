import React , {useState, useEffect} from 'react'
import Image from 'next/legacy/image'
import {Navbar} from '../components/Navbar'
import { databaseIcon, uploadIcon } from '@/assets'

const UploadPage = () => {
    const [data, setData] = useState(null);

    const handleConnect = async () => {
        const response = await fetch('/api/connect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'bootbootshop',
            table: 'shop',
          }),
        });
    
        if (response.ok) {
          const result = await response.json();
          setData(result.data);
        } else {
          // Handle the error
        }
      };
    
    useEffect(()=>{
        console.log(data)
    },[data])

  return (
    <div className='relative w-screen h-full'>
        <Navbar/>
        <div className='w-full flex flex-col items-center pb-20'>
            <p className='text-[32px] text-textPrimary font-kanit mt-8'>อัปโหลด</p>
            <div className='w-[1000px] flex flex-row mt-8 justify-around'>
                <div className='w-[430px]'>
                    <div className='w-full flex flex-col h-[400px] rounded-[32px] border-2 border-primary justify-around items-center'>
                        <Image src={uploadIcon} width={80} height={80} objectFit='cover' alt="logo" />
                        <p className='font-kanit text-[24px] text-textPrimary'>ลากวางหรือแนบไฟล์</p>
                        <button className='font-kanit text-[24px] px-8 py-2 bg-primary text-white rounded-3xl hover:bg-hoverPrimary'>
                            แนบไฟล์
                        </button>
                    </div>
                    <div className='text-[16px] font-kanit mt-8 px-24'>
                        <p className='w-full text-center text-textPrimary text-[20px]'>อัปโหลดไฟล์ของคุณโดยที่</p>
                        <p className='text-textGray'>- ต้องเป็นไฟล์ Csv, Excel เท่านั้น</p>
                        <p className='text-textGray'>- ไฟล์ขนาดไม่เกิน 10 MB</p>
                    </div>
                </div>
                <div className='w-[430px]'>
                    <div className='w-full flex flex-col h-[400px] rounded-[32px] border-2 border-primary justify-around items-center'>
                        <div className='z-0'>
                            <Image src={databaseIcon} width={80} height={80} objectFit='cover' alt="logo" />
                        </div>
                        <p className='font-kanit text-[24px] text-textPrimary'>เชื่อมฐานข้อมูล</p>
                        <button onClick={handleConnect} className='font-kanit text-[24px] px-8 py-2 bg-primary text-white rounded-3xl hover:bg-hoverPrimary'>
                            เชื่อมฐานข้อมูล
                        </button>
                    </div>
                    <div className='text-[16px] font-kanit mt-8 px-24'>
                        <p className='w-full text-center text-textPrimary text-[20px]'>การนำไฟล์จากฐานข้อมูลมาใช้</p>
                        <p className='text-textGray'>- ต้องเป็น mysql เท่านั้น</p>
                        <p className='text-textGray'>- ไฟล์ขนาดไม่เกิน 10 MB</p>
                    </div>
                </div>
            </div>
                <div className='flex flex-col w-full mt-8 font-kanit text-textPrimary text-center items-center'>
                    <p className='text-[24px]'>หรือคุณสามารถทดลองชุดข้อมูล</p>
                    <p className='text-[24px]'>ตัวอย่างของเราได้</p>
                    <button className='text-[24px] px-12 py-2 bg-primary text-white w-fit rounded-2xl mt-8 hover:bg-hoverPrimary'>ทดลอง</button>
                </div>
        </div>
    </div>
  )
}

export default UploadPage