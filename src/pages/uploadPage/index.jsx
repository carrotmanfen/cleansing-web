import React, { useState, useEffect } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { Navbar } from '../../components/Navbar'
import { databaseIcon, uploadIcon } from '@/assets'
import Alert from '@mui/material/Alert';
import Papa from 'papaparse';
import useAddProject from '@/hooks/useAddProject';
import { atomUserRole } from "@/atoms/atomUserRole";
import { useRecoilState } from "recoil";
import useAccount from '@/hooks/useAccount';

const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const {error, setError, isPending, createProject} = useAddProject()
    const [userRole, setUserRole] = useRecoilState(atomUserRole)
    const {refreshLogin} = useAccount()

    const onFileChangeHandler = (event) => {
    setError(null)
    const csvFile = event.target.files[0];
    setFile(csvFile);
    };
    function convertStringsToNumbers(data, columnName) {
        // Check if all values in the column can be converted to a number
        if (data.every(row => !isNaN(Number(row[columnName])))) {
          // If so, convert them
          data.forEach(row => {
            if(row[columnName] !== null){
                row[columnName] = Number(row[columnName]);
            }
            else{
                row[columnName] = null
            }
          });
        }
      }
      
    function canConvertToNumber(str) {
        return !isNaN(Number(str));
      }
    function determineColumnType(columnValues) {
        // Your logic to determine the type based on the values
        // Example: Check if all values are numbers, strings, or a mix of both
        const allNumbers = columnValues.every(value => typeof value === 'number'||canConvertToNumber(value));
        const allStrings = columnValues.every(value => typeof value === 'string'||value === null);
      
        if (allNumbers) {
          return 'number';
        } else if (allStrings) {
          return 'string';
        } else {
          return 'number';
        }
    }
    const onUpload = async() => {

        if(file!==null){
            Papa.parse(file, {
                transform: function(value, field) {
                    if (value === "") {
                        return null;
                    }else{
                        return value;
                    }
                },
                skipEmptyLines: true,
                header: true,
                complete: async function(results) {
                    // Extract and log column names
                    console.log('result:',results)
                    const columns = Object.keys(results.data[0]);
                    console.log('Columns:', columns);
                    const rows = results.data;
                    const transformedColumns = await columns.map((label) => (
                        { 
                            label,
                            dataKey: label,
                            type: determineColumnType(results.data.map(row => row[label])),
                        }
                    ));
                    console.log(results);
                    columns.map(column => {
                        convertStringsToNumbers(rows, column);
                    });
                    const parts = file.name.split(".");
                    console.log(rows)
                    await createProject(transformedColumns, rows, parts[0], file.name)
                }
            });
        }
    
    };

    useEffect(() => {
        
        if (userRole.isLogin === false) {
            const username = localStorage.getItem('username')
            if(username){
                refreshLogin(username)
            }else{
                window.location.replace("/login")
            }
        }
      }, [userRole.isLogin,refreshLogin]);
      
    return (
        <div className='relative w-screen h-full'>
            <Navbar />
            {error && <div className='w-full flex justify-center absolute mt-10'>
                <Alert severity="error" className='w-1/2 font-kanit text-[16px]'>เกิดข้อผิดพลาด - ไฟล์ที่อัปโหลดมีรูปแบบไม่ถูกต้องหรือเซิฟเวอร์ไม่ตอบสนอง</Alert>
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
                                    อัปโหลด
                                </button>
                                :
                                <button  className='font-kanit text-[24px] px-8 py-2 bg-gray rounded-3xl pointer-events-none'>
                                    อัปโหลด
                                </button>
                            }
                        </div>
                        <div className='text-[16px] font-kanit mt-8 '>
                            <p className='w-full text-center text-textPrimary text-[20px]'>อัปโหลดไฟล์ของคุณโดยที่</p>
                            <p className='text-textGray pl-[80px]'>- ต้องเป็นไฟล์ csv, xls หรือ xlsx เท่านั้น</p>
                            <p className='text-textGray pl-[80px]'>- ไฟล์ขนาดไม่เกิน 10 MB</p>
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
                        <div className='text-[16px] font-kanit mt-8 '>
                            <p className='w-full text-center text-textPrimary text-[20px]'>การนำไฟล์จากฐานข้อมูลมาใช้</p>
                            <p className='text-textGray pl-[60px]'>- ต้องเป็น MySQL เท่านั้น</p>
                            <p className='text-textGray pl-[60px]'>- ไฟล์ขนาดไม่เกิน 10 MB</p>
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