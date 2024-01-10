import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { Navbar } from '../../components/Navbar'
import { databaseIcon, uploadIcon } from '@/assets'
import Alert from '@mui/material/Alert';
import Papa from 'papaparse';
import useAddProject from '@/hooks/useAddProject';
import { rows } from '@/constants/datasetTest1'

const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState(false)
    const {error, isPending, createProject} = useAddProject()

    const onFileChangeHandler = (event) => {
    setAlert(false)
    const csvFile = event.target.files[0];
    setFile(csvFile);
    
    };

    const onUpload = async() => {

        if(file!==null){
            Papa.parse(file, {
                skipEmptyLines: true,
                header: true,
                complete: async function(results) {
                    // Extract and log column names
                    const columns = Object.keys(results.data[0]);
                    console.log('Columns:', columns);
                    // Parse it back to the original structure
                    const rows = JSON.parse(JSON.stringify(results.data));
                    console.log(rows);
                    console.log(columns);
                    const transformedColumns = columns.map((label) => ({ label, dataKey: label }));
                    console.log(transformedColumns);
                    console.log(file.name)
                    const parts = file.name.split(".");
                    console.log(parts[0])
                    await createProject(transformedColumns, rows, parts[0], file.name)
                }
            });
        }
    
    };
      
    return (
        <div className='relative w-screen h-full'>
            <Navbar />
            {alert && <div className='w-full flex justify-center absolute mt-10'>
                <Alert severity="error" className='w-1/2 font-kanit text-[16px]'>เกิดข้อผิดพลาด - ไฟล์ที่อัปโหลดมีรูปแบบไม่ถูกต้อง</Alert>
            </div>}
            <div className='w-full flex flex-col items-center pb-20'>
                <p className='text-[32px] text-textPrimary font-kanit mt-8'>อัปโหลด</p>
                <div className='w-[1000px] flex flex-row mt-8 justify-around'>
                    <div className='w-[430px]'>
                        <div className='w-full flex flex-col h-[400px] rounded-[32px] border-2 border-primary justify-around items-center'>
                            <Image src={uploadIcon} width={80} height={80} objectFit='cover' alt="logo" />
                            <p className='font-kanit text-[24px] text-textPrimary'>กรุณาแนบไฟล์</p>
                            <input
                                type="file"
                                id="fileInput"
                                className='hidden'
                                accept={acceptableCSVFileTypes}
                                onChange={onFileChangeHandler}
                            />
                            <div className='flex flex-row gap-16 border justify-around'>
                                {
                                    file ? 
                                    <p className='text-[20px] max-w-[250px] font-kanit pl-2 truncate'>ไฟล์ที่เลือก: {file.name}</p>
                                    :
                                    <p className='text-[20px] font-kanit pl-2'>ยังไ่ม่ได้เลือกไฟล์</p>
                                }
                                <label for="fileInput">
                                    <span className='text-[20px] font-kanit bg-primary text-white px-2 h-full'>แนบไฟล์</span>
                                </label>
                            </div>
                            {
                                file?
                                <button onClick={onUpload} className='font-kanit text-[24px] px-8 py-2 bg-primary text-white rounded-3xl hover:bg-hoverPrimary'>
                                    อัพโหลด
                                </button>
                                :
                                <button  className='font-kanit text-[24px] px-8 py-2 bg-gray rounded-3xl pointer-events-none'>
                                    อัพโหลด
                                </button>
                            }
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
                            <Link href={"/uploadPage/databaseConnectPage"}>
                                <button className='font-kanit text-[24px] px-8 py-2 bg-primary text-white rounded-3xl hover:bg-hoverPrimary'>
                                    เชื่อมฐานข้อมูล
                                </button>
                            </Link>
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
                    <Link href={"/uploadPage/dataTestPage"}>
                        <button className='text-[24px] px-12 py-2 bg-primary text-white w-fit rounded-2xl mt-8 hover:bg-hoverPrimary'>
                            ทดลอง
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UploadPage