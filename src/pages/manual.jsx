import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/legacy/image'
import { Navbar } from '../components/Navbar'
import {
    register, login, userManual,
    doc,
    myProject,
    uploadFile,
    datatest,
    tableView,
    overallView,
    afterClean,
    dataHaveAction,
    navbarDetail,
    download,
    selectColumn,
    connectMysql,
    functionCleansing,
    changProjectName,
    excelopen1,
    excelopen2,
    excelopen3,
    excelopen4,
    excelopen5,
    excelopen6,
    excelopen7,
    excelopen8,
} from '@/assets'

import Link from 'next/link'
import { atomUserRole } from "@/atoms/atomUserRole";
import { useRecoilState } from "recoil";
import useAccount from '@/hooks/useAccount';

const Manual = () => {
    const [userRole, setUserRole] = useRecoilState(atomUserRole)
    const { refreshLogin } = useAccount()
    const handleClean = () => {
        if (userRole.isLogin === false) {
          window.location.href = "/login"
        }else{
          window.location.href = "/uploadPage"
        }
      }
      const [activeSection, setActiveSection] = useState(0);
      const sectionRefs = useRef([]);
      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                console.log('Section is in the viewport!', entry.target.id);
                switch (entry.target.id) {  
                    case 'section-one':
                        setActiveSection(1);
                        break;
                    case 'section-two':
                        setActiveSection(2);
                        break;
                    case 'section-three':
                        setActiveSection(3);
                        break;
                    case 'section-four':
                        setActiveSection(4);
                        break;
                    case 'section-five':
                        setActiveSection(5);
                        break;
                    case 'section-six':
                        setActiveSection(6);
                        break;
                    case 'section-seven':
                        setActiveSection(7);
                        break;
                    default:
                        setActiveSection(0);
                        break;
                }
              } else {
                console.log('Section is not in the viewport.', entry.target.id);
              }
            });
          },
          {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
          }
        );
    
        sectionRefs.current.forEach(ref => {
          if (ref) {
            observer.observe(ref);
          }
        });
    
        return () => {
          sectionRefs.current.forEach(ref => {
            if (ref) {
              observer.unobserve(ref);
            }
          });
        };
      }, []);
    useEffect(() => {

        if (userRole.isLogin === false) {
            const username = localStorage.getItem('username')
            if (username) {
                refreshLogin(username)
            }
        }
    }, [userRole.isLogin, refreshLogin]);
    return (
        <div className='relative w-full h-full font-kanit overflow-x-hidden'>
            <Navbar menu={2} />
            <div className='fixed flex flex-col top-0 left-0 h-screen font-kanit text-[9px] lg:text-[13px] xl:text-[17px] leading-[11px] lg:leading-[15px] xl:leading-[20px] text-start'>
                <p className='text-textPrimary mt-28 text-[24px] lg:text-[28px] xl:text-[32px] font-kanit pl-4 lg:pl-8 xl:pl-12 font-bold'>สารบัญ</p>
                <a href='#section-one' 
                className={` mt-4 pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection==1?`bg-white text-primary ml-4`:`bg-white text-textPrimary`}`}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                    ขั้นตอนที่ 1<br />
                    </span>
                    สมัครสมาชิก 
                </a>
                <a href='#section-two'
                className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection==2?`bg-white text-primary ml-4`:`bg-white text-textPrimary`}`}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                    ขั้นตอนที่ 2<br />
                    </span>
                    เข้าสู่ระบบ 
                </a>
                <a href='#section-three' 
                className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection==3?`bg-white text-primary ml-4`:`bg-white text-textPrimary`}`}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                    ขั้นตอนที่ 3<br />
                    </span>
                    ศึกษาข้อมูลที่สำคัญ
                </a>
                <a href='#section-four' 
                className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection==4?`bg-white text-primary ml-4`:`bg-white text-textPrimary`}`}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                    ขั้นตอนที่ 4<br />
                    </span>
                    อัปโหลดข้อมูล
                </a>
                <a href='#section-five'
                className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection==5?`bg-white text-primary ml-4    `:`bg-white text-textPrimary`}`}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                    ขั้นตอนที่ 5<br />
                    </span>
                    ทำความสะอาดข้อมูล
                </a>
                <a href='#section-six'
                className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection==6?`bg-white text-primary ml-4`:`bg-white text-textPrimary`}`}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                    ขั้นตอนที่ 6<br />
                    </span>
                    ดาวน์โหลดข้อมูล
                </a>
                <a href='#section-seven' 
                className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection==7?`bg-white text-primary ml-4`:`bg-white text-textPrimary`}`}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                    Decoder ไฟล์<br />
                    </span>
                    วิธีการเปิดไฟล์ด้วย Decoder Unicode UTF-8
                </a>
                
            </div>


            <div className=' flex flex-col w-full items-center overflow-x-hidden'>

            <p className='text-[34px] lg:text-[38px] xl:text-[42px]  text-textPrimary font-kanit mt-28'>คู่มือการใช้งาน</p>
                <div className='w-[400px] lg:w-[550px] xl:w-[800px]   flex flex-col justify-around border-0'>
                <section id="section-one" ref={ref => sectionRefs.current[1] = ref} className='pt-20'>

                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px]'>ขั้นตอนที่ 1 : สมัครสมาชิก</p>
                    <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                        
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={myProject}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    </div>
                    <p className='text-textGray  text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ผู้ใช้งานที่เข้ามาใช้งาน <strong>คลีนเนอร์</strong> ครั้งแรกต้องสมัครสมาชิก เพื่อสร้างบัญชีกับ <strong>คลีนเนอร์</strong> ก่อนใช้งาน</p>
                </section>

                <section id="section-two" ref={ref => sectionRefs.current[2] = ref} className='pt-20'>
                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ขั้นตอนที่ 2 : เข้าสู่ระบบ</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={login}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>เข้าสู่ระบบด้วยบัญชีที่เคยสร้างไว้กับ <strong>คลีนเนอร์</strong> เพื่อเข้าถึงข้อมูลที่เคยบันทึกไว้ในบัญชีนั้น ไม่ว่าจะเป็นโปรเจกต์ ประวัติการทำความสะอาดข้อมูล และดาวน์โหลดไฟล์โปรเจกต์ที่ทำความสะอาดแล้ว เป็นต้น</p>
                </section>

                <section id="section-three" ref={ref => sectionRefs.current[3] = ref} className='pt-20'>
                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ขั้นตอนที่ 3 : ศึกษาข้อมูลที่สำคัญ</p>
                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	คู่มือการใช้งาน</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={userManual}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ภายในหน้า <strong>คู่มือ</strong> จะมีรายละเอียดการใช้งาน <strong>คลีนเนอร์</strong> ให้ผู้ใช้งานได้ศึกษาว่าขั้นตอนการใช้งาน <strong>คลีนเนอร์</strong> เป็นอย่างไร และฟังก์ชันแต่ละฟังก์ชันทำงานอย่างไร เพื่อให้ผู้ใช้งานสามารถใช้งาน <strong>คลีนเนอร์</strong> ได้อย่างสะดวกมากยิ่งขึ้น</p>
                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	ทฤษฎีการทำงานของฟังก์ชันทำความสะอาดข้อมูล</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={doc}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ภายในหน้า <strong>ทฤษฎี</strong> จะมีรายละเอียดการใช้งานฟังก์ชันทำความสะอาดทั้ง 11 ฟังก์ชัน ให้ผู้ใช้งานได้ศึกษาวิธีการใช้งานแต่ละฟังก์ชันอย่างละเอียด พร้อมทั้งคำอธิบายหลักการทำงานของฟังก์ชันนั้นๆ เพื่อให้ผู้ใช้งานสามารถเข้าใจหลักการทำงานของฟังก์ชันความสะอาดข้อมูลทั้ง 11 ฟังก์ชัน และใช้งานได้อย่างมีประสิทธิภาพมากยิ่งขึ้น</p>

                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	โปรเจกต์ของฉัน</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={myProject}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ผู้ใช้งานสามารถดูโปรเจกต์ที่สร้างไว้ได้ภายในหน้า <strong>โปรเจกต์ของฉัน</strong> และสามารถเลือกโปรเจกต์ที่ต้องการทำความสะอาดได้ภายในหน้านี้ และหากต้องการสร้างโปรเจกต์ใหม่ สามารถกดปุ่ม <strong>อัปโหลด</strong> เพื่ออัปโหลดไฟล์หรือเชื่อมต่อฐานข้อมูลเพื่อสร้างโปรเจกต์ใหม่ และหากต้องการลบโปรเจกต์ ผู้ใช้งานสามารถกดปุ่มรูปถังขยะมุมล่างขวาของโปรเจกต์นั้นๆ เพื่อทำการลบโปรเจกต์</p>
                </section>

                <section id="section-four" ref={ref => sectionRefs.current[4] = ref} className='pt-20'>
                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ขั้นตอนที่ 4 : อัปโหลดข้อมูล</p>
                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	อัปโหลดไฟล์ชุดข้อมูล</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={uploadFile}  objectFit='cover' alt="uploadFile" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>การอัปโหลดข้อมูลเข้าสู่ <strong>คลีนเนอร์</strong> จะรองรับไฟล์ประเภท csv, xls และ xlsx เท่านั้น โดยผู้ใช้งานสามารถกดปุ่ม <strong>แนบไฟล์</strong> เพื่อทำการเลือกอัปโหลดไฟล์ชุดข้อมูลที่ต้องการอัปโหลดจากเครื่องคอมพิวเตอร์ของผู้ใช้งาน โดยสามารถอัปโหลดได้ทีละไฟล์ จากนั้นกดปุ่ม <strong>อัปโหลด</strong> เพื่อทำการอัปโหลดไฟล์ชุดข้อมูล</p>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'><strong>Note: </strong>เว็บแอปพลิเคชันคลีนเนอร์รองรับเฉพาะชุดข้อมูลแบบมีโครงสร้างเท่านั้น (Data Structure) ซึ่งอาจส่งผลกระทบกับผู้ใช้งานบางกลุ่มให้ไม่สามารถอัปโหลดไฟล์ชุดข้อมูลที่ไม่อยู่ในรูปของข้อมูลแบบมีโครงสร้าง</p>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'><strong>ข้อมูลแบบมีโครงสร้าง (Data Structure) คืออะไร?</strong></p> 
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ข้อมูลแบบมีโครงสร้าง หรือข้อมูลที่จัดเก็บรวบรวมข้อมูลในรูปแบบตาราง โดยมีการแบ่งข้อมูลออกเป็นแถว (Row) และในแต่ละแถวแบ่งออกเป็นคอลัมน์ (Column) เพื่อเชื่อมโยงระหว่างข้อมูลในตารางกับข้อมูลในคอลัมน์ที่กำหนด </p>                 
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'><strong>ตัวอย่างข้อมูลแบบมีโครงสร้าง</strong></p> 
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                        <Image src={excelopen7}  objectFit='cover' alt="excelopen7" />
                    </div>
                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	ทฤษฎีการทำงานของฟังก์ชันทำความสะอาดข้อมูล</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={doc}  objectFit='cover' alt="doc" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ภายในหน้า <strong>ทฤษฎี</strong> จะมีรายละเอียดการใช้งานฟังก์ชันทำความสะอาดทั้ง 11 ฟังก์ชัน ให้ผู้ใช้งานได้ศึกษาวิธีการใช้งานแต่ละฟังก์ชันอย่างละเอียด พร้อมทั้งคำอธิบายหลักการทำงานของฟังก์ชันนั้นๆ เพื่อให้ผู้ใช้งานสามารถเข้าใจหลักการทำงานของฟังก์ชันความสะอาดข้อมูลทั้ง 11 ฟังก์ชัน และใช้งานได้อย่างมีประสิทธิภาพมากยิ่งขึ้น</p>

                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	เชื่อมต่อฐานข้อมูล MySQL</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={connectMysql}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ผู้ใช้งานสามารถเชื่อมต่อฐานข้อมูล MySQL เพื่อดึงชุดข้อมูลของผู้ใช้งานมาทำความสะอาด โดยกรอกข้อมูลที่จำเป็นในการเชื่อมต่อฐานข้อมูลและกดปุ่ม <strong>ยืนยัน</strong> เพื่อทำการเชื่อมฐานข้อมูล โดยการทำความสะอาดภายใน <strong>คลีนเนอร์</strong> จะไม่ได้ไปอัพเดตข้อมูลในฐานข้อมูล MySQL ของผู้ใช้งาน <strong>คลีนเนอร์</strong> ทำเพียงแค่ดึงชุดข้อมูลมาเท่านั้น เมื่อทำความสะอาดเสร็จแล้วผู้ใช้งานสามารถดาวน์โหลดชุดข้อมูลกลับไปได้ในรูปแบบไฟล์ csv</p>

                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	เลือกใช้ชุดข้อมูลทดลอง</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={datatest}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ภายในหน้า <strong>ชุดข้อมูลสำหรับทดลอง</strong> จะมีชุดข้อมูลให้ผู้ใช้งานเลือกใช้ทดลองได้ 3 ชุด คือ Zomato Café Reviews, ดัชนีสมรรถนะสิ่งแวดล้อมของประเทศไทย และ ผลการรับฟังประสบการณ์ผู้ป่วยสู่การปรับระบบบริการ ซึ่งเมื่อผู้ใช้งานเลือกชุดข้อมูลใด ชุดข้อมูลนั้นจะถูกเพิ่มเข้าไปในหน้า <strong>โปรเจกต์ของฉัน</strong> เพื่อเก็บเป็นโปรเจกต์ของผู้ใช้งาน</p>
                </section>

                <section id="section-five" ref={ref => sectionRefs.current[5] = ref} className='pt-20'>
                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ขั้นตอนที่ 5 : ทำความสะอาดข้อมูล</p>
                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	เปลี่ยนชื่อโปรเจกต์</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={changProjectName}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>เมื่อผู้ใช้งานกดเข้ามาภายในโปรเจกต์ ภายในหน้านี้ผู้ใช้งานสามารถเปลี่ยนชื่อโปรเจกต์นั้นได้โดยกดปุ่มรูปดินสอเพื่อทำการเปลี่ยนชื่อโปรเจกต์</p>
                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	มุมมองตาราง</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={tableView}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ฟังก์ชัน <strong>มุมมองตาราง</strong> จะช่วยให้ผู้ใช้งานเห็นมุมมองชุดข้อมูลนั้นในรูปแบบตาราง โดยมีการแสดงแบบ Pagination เพื่อแบ่งการแสดงข้อมูลออกเป็นหน้าย่อยๆ ผู้ใช้งานสามารถกดเลือกหน้าที่มุมขวาล่างเพื่อดูข้อมูลในแต่ละหน้า</p>

                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	มุมมองภาพรวม</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={overallView}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'> ฟังก์ชัน <strong>มุมมองภาพรวม</strong> จะช่วยให้ผู้ใช้งานสามารถเห็นภาพรวมของชุดข้อมูลนั้นได้ โดยมีการแสดงแผนภูมิของแต่ละคอลัมน์ และผู้ใช้งานสามารถเปลี่ยนประเภทข้อมูลของแต่ละคอลัมน์ได้ภายในหน้านี้</p>

                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	เลือกใช้ชุดข้อมูลทดลอง</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={datatest}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ภายในหน้า <strong>ชุดข้อมูลสำหรับทดลอง</strong> จะมีชุดข้อมูลให้ผู้ใช้งานเลือกใช้ทดลองได้ 3 ชุด คือ Zomato Café Reviews, ดัชนีสมรรถนะสิ่งแวดล้อมของประเทศไทย และ ผลการรับฟังประสบการณ์ผู้ป่วยสู่การปรับระบบบริการ ซึ่งเมื่อผู้ใช้งานเลือกชุดข้อมูลใด ชุดข้อมูลนั้นจะถูกเพิ่มเข้าไปในหน้า <strong>โปรเจกต์ของฉัน</strong> เพื่อเก็บเป็นโปรเจกต์ของผู้ใช้งาน</p>

                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	การใช้ฟังก์ชันทำความสะอาดข้อมูล</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={functionCleansing}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>เมื่อผู้ใช้งานกดปุ่ม <strong>ทำความสะอาดข้อมูล</strong> จะมี Pop up ฟังก์ชันทำความสะอาดข้อมูลทั้ง 12 ฟังก์ชัน ขึ้นมาให้ผู้ใช้งานได้เลือกว่าต้องการใช้ฟังก์ชันทำความสะอาดข้อมูลใดกับชุดข้อมูลนี้ โดยสามารถเลือกใช้ได้ทีละ 1 ฟังก์ชัน</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={selectColumn}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>เมื่อเลือกฟังก์ชันที่ต้องการแล้ว ระบบจะให้ผู้ใช้งานเลือกคอลัมน์ที่ต้องการให้ทำความสะอาดข้อมูล ซึ่งฟังก์ชันบางอย่างที่ไม่เหมาะกับประเภทข้อมูลของคอลัมน์นั้น หากเป็นเช่นนั้นระบบจะแจ้งเตือนให้ผู้ใช้งานเลือกคอลัมน์ที่ต้องการทำความสะอาดใหม่อีกครั้ง เพื่อให้เหมาะสมกับฟังก์ชันทำความสะอาดข้อมูล จากนั้นผู้ใช้งานกดปุ่ม <strong>ถัดไป</strong> เพื่อทำความสะอาดข้อมูล</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={afterClean}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={dataHaveAction}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>เมื่อระบบทำความสะอาดเสร็จแล้วจะแสดงข้อมูลออกมาอยู่ในหน้า <strong>ข้อมูลหลังทำความสะอาด</strong> หากผู้ใช้งานต้องการดูเฉพาะข้อมูลที่จะถูกลบ หรือเปลี่ยนแปลง สามารถกดปุ่ม <strong>ข้อมูลที่ถูกจัดการ</strong> ซึ่งข้อมูลแถวใดที่มีไฮไลท์สีเหลือง หมายความว่าข้อมูลแถวนั้นจะถูกแก้ไข และข้อมูลแถวที่มีไฮไลท์สีแดง หมายความว่าข้อมูลแถวนั้นจะถูกลบ สามารถอ่านรายละเอียดการทำงานแต่ละฟังก์ชันเพิ่มเติมได้ที่ <Link className="text-primary underline" href="/document">เอกสารทฤษฎีการทำงานของฟังก์ชันทำความสะอาดข้อมูล</Link> เมื่อผู้ใช้งานต้องการยืนยันการทำความสะอาดข้อมูลสามารถกดปุ่ม ยืนยัน ด้านขวาบนเพื่อทำการยืนยันการทำความสะอาดข้อมูล</p>
                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	ยกเลิกการใช้ฟังก์ชันทำความสะอาดข้อมูล</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={navbarDetail}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>แถบเมนูด้านบนจะแสดงประวัติการทำความสะอาดข้อมูลของชุดข้อมูลนั้นๆ หากผู้ใช้งานต้องการยกเลิกการทำความสะอาดข้อมูลครั้งล่าสุดสามารถกดปุ่มกากบาท ที่ประวัติการทำความสะอาดข้อมูลนั้น จากนั้นจะมี Pop up ยืนยันการยกเลิกการทำความสะอาดข้อมูลครั้งล่าสุดขึ้นมาให้ผู้ใช้งานกดยืนยันอีกครั้ง เมื่อผู้ใช้งานกดปุ่ม <strong>ยืนยัน</strong> ข้อมูลจะกลับไปเป็นข้อมูลเดิมก่อนที่จะใช้ฟังก์ชันทำความสะอาดนั้น</p>
                </section>

                <section id="section-six" ref={ref => sectionRefs.current[6] = ref} className='pt-20'>

                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px]'>ขั้นตอนที่ 6 : ดาวน์โหลดข้อมูล</p>
                    <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                        
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={download}  objectFit='cover' alt="functionCleansing12" />
                        </div>
                    </div>
                    <p className='text-textGray  text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>การดาวน์โหลดไฟล์ชุดข้อมูล เมื่อผู้ใช้งานกดปุ่ม <strong>ดาวน์โหลด</strong> บนสุดทางด้านขวาระบบจะแสดง Pop up ดาวน์โหลดไฟล์ให้ผู้ใช้งานแก้ไขชื่อไฟล์ (หากต้องการ) จากนั้นกดปุ่ม <strong>ดาวน์โหลด</strong> หรือหากต้องการยกเลิกการดาวน์โหลดสามารถกดปุ่มกากบาทที่ด้านขวาบนของ Pop up เพื่อปิด Pop up ดาวน์โหลดไฟล์ โดยไฟล์ชุดข้อมูลที่ดาวน์โหลดจาก <strong>คลีนเนอร์</strong> จะเป็นไฟล์ประเภท csv เท่านั้น</p>
                </section>
                
                <section id="section-seven" ref={ref => sectionRefs.current[7] = ref} className='pt-20'>
                    <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] mt-5 mx-10'>•	วิธีการเปิดไฟล์ด้วย Decoder Unicode UTF-8</p>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>เนื่องจากเว็บแอปพลิเคชันคลีนเนอร์รองรับการ Decoder ไฟล์แบบ Unicode UTF-8 อาจจะส่งผลให้ผู้ใช้งานที่เปิดไฟล์ที่ดาวน์โหลดจากเว็บแอปพลิเคชันคลีนเนอร์ โดยใช้โปรแกรม Excel ที่ไม่ได้ตั้งค่าเริ่มต้นในการเปิดไฟล์ด้วยการ Decoder ไฟล์แบบ Unicode UTF-8 พบปัญหาภาษาไทยกลายเป็นอักขระพิเศษที่ไม่สามารถอ่านได้ วิธีเปิดไฟล์ให้ภาษาไทยไม่กลายเป็นอักขระพิเศษสามารถทำได้ดังนี้</p>
                    <p className='text-textPrimary font-kanit text-[18px] lg:text-[22px] xl:text-[26px] mt-5 mx-10'>ขั้นตอนที่ 1 เปิดโปรแกรม Excel และเลือก Data จากนั้นเลือก Get Data (Power Query)</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={excelopen1} objectFit='cover' alt="excelopen1" />
                        </div>
                    <p className='text-textPrimary font-kanit text-[18px] lg:text-[22px] xl:text-[26px] mt-5 mx-10'>ขั้นตอนที่ 2 เลือก From Text (Legacy)</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={excelopen2} objectFit='cover' alt="excelopen2" />
                        </div>
                    <p className='text-textPrimary font-kanit text-[18px] lg:text-[22px] xl:text-[26px] mt-5 mx-10'>ขั้นตอนที่ 3 เลือกไฟล์ที่ต้องการเปิด</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={excelopen3} objectFit='cover' alt="excelopen3" />
                        </div>
                    <p className='text-textPrimary font-kanit text-[18px] lg:text-[22px] xl:text-[26px] mt-5 mx-10'>ขั้นตอนที่ 4 เลือกประเภทของไฟล์เป็น Unicode (UTF-8) จากนั้นกด Next</p>
                    
                    <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={excelopen4}  objectFit='cover' alt="excelopen4" />
                        </div>
                    </div>

                    <p className='text-textPrimary font-kanit text-[18px] lg:text-[22px] xl:text-[26px] mt-5 mx-10'>ขั้นตอนที่ 5 เลือกวิธีการแบ่งข้อมูลโดยใช้ตัวแบ่ง Comma จากนั้นกด Next</p>
                    <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={excelopen5}  objectFit='cover' alt="excelopen5" />
                        </div>
                    </div>
                    <p className='text-textPrimary font-kanit text-[18px] lg:text-[22px] xl:text-[26px] mt-5 mx-10'>ขั้นตอนที่ 6 เลือกรูปแบบของข้อมูลในคอลัมน์เป็น General จากนั้นกด Finish</p>
                    <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={excelopen6}  objectFit='cover' alt="excelopen6" />
                        </div>
                    </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'><strong>ภาพแสดงผลเปรียบเทียบการเปิดไฟล์</strong></p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                        <Image src={excelopen8} objectFit='cover' alt="excelopen8" />
                    </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>เปิดไฟล์ด้วยค่าเริ่มต้นที่ไม่ใช่ Unicode (UTF-8)</p>
                    <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                        <Image src={excelopen7} objectFit='cover' alt="excelopen7" />
                    </div>
                    <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>เปิดไฟล์ด้วย Unicode (UTF-8)</p>
                </section>
                </div>

            </div>
            <div className='flex flex-col overflow-x-hidden w-full mt-2 font-kanit text-textPrimary text-center items-center'>
            <div onClick={handleClean} className='px-12 py-2 bg-primary text-white text-[32px] w-fit rounded-2xl mt-8 hover:bg-hoverPrimary hover:cursor-pointer'>ทำความสะอาดข้อมูล</div>
            </div>

            <div className="w-full h-[250px] mt-20 grid grid-cols-3 bg-primary font-kanit text-white">
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
                    <p className="flex justify-center items-center text-center">126 ปรรชาอุทิศ แขวงบางมด<br />เขตทุ่งครุ จังหวัดกรุงเทพ 10140</p>
                </div>
                <div>
                    <p className="flex justify-center items-center text-center"> Kanthila.k@mail.kmutt.ac.th<br />
                        Kudsun.k@mail.kmutt.ac.th<br />
                        Nonthapat.t@mail.kmutt.ac.th</p>
                </div>
                <div>
                    <p className="flex justify-center items-center text-center"> 093 262 1995<br />
                        088 876 2848<br />
                        091 202 1999</p>
                </div>
            </div>
        </div>

    )
}

export default Manual