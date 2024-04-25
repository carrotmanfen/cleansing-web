import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/legacy/image'
import { Navbar } from '../components/Navbar'
import {
    functionCleansing1, functionCleansing2, functionCleansing3, functionCleansing4, functionCleansing5, functionCleansing6, functionCleansing7, functionCleansing8, functionCleansing9, functionCleansing10, functionCleansing11, functionCleansing12,
    selectColumn2, selectColumn3, selectColumn4, confirmCleansing2, navbarDetail, DeleteDuplicateData, confirmCleansing3, selectData, inputData, managingNullValues, managingNullValues1, inputdatafromuser, inputData2, inputData3,
    inputData4, flagOutliers, clampOutliers, inputdataAuto, confirmCleansing4, confirmCleansing5, selectColumn
} from '@/assets'
import Link from 'next/link'
import { atomUserRole } from "@/atoms/atomUserRole";
import { useRecoilState } from "recoil";
import useAccount from '@/hooks/useAccount';

const Document = () => {
    const [userRole, setUserRole] = useRecoilState(atomUserRole)
    const { refreshLogin } = useAccount()
    const handleClean = () => {
        if (userRole.isLogin === false) {
            window.location.href = "/login"
        } else {
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
                            case 'section-eight':
                                setActiveSection(8);
                                break;
                            case 'section-nine':
                                setActiveSection(9);
                                break;
                            case 'section-ten':
                                setActiveSection(10);
                                break;
                            case 'section-eleven':
                                setActiveSection(11);
                                break;
                            case 'section-twelve':
                                setActiveSection(12);
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
            <Navbar menu={1} />
            <div className='fixed flex flex-col top-0 left-0 h-screen font-kanit text-[9px] lg:text-[13px] xl:text-[17px] leading-[11px] lg:leading-[15px] xl:leading-[20px] text-start'>
                <p className='text-textPrimary mt-28 text-[24px] lg:text-[28px] xl:text-[32px] font-kanit pl-4 lg:pl-8 xl:pl-12 font-bold'>สารบัญ</p>
                <a href='#section-one'
                    className={` mt-4 pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection == 1 ? `bg-white text-primary ml-4` : `bg-white text-textPrimary`}`} onClick={() => setActiveSection(1)}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                        ฟังก์ชันที่ 1<br />
                    </span>
                    เปลี่ยนชื่อคอลัมน์
                </a>
                <a href='#section-two'
                    className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection == 2 ? `bg-white text-primary ml-4` : `bg-white text-textPrimary`}`} onClick={() => setActiveSection(2)}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                        ฟังก์ชันที่ 2<br />
                    </span>
                    ลบคอลัมน์ข้อมูลที่ไม่เกี่ยวข้อง
                </a>
                <a href='#section-three'
                    className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection == 3 ? `bg-white text-primary ml-4` : `bg-white text-textPrimary`}`} onClick={() => setActiveSection(3)}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                        ฟังก์ชันที่ 3<br />
                    </span>
                    ลบข้อมูลที่ซ้ำซ้อน
                </a>
                <a href='#section-four'
                    className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection == 4 ? `bg-white text-primary ml-4` : `bg-white text-textPrimary`}`} onClick={() => setActiveSection(4)}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                        ฟังก์ชันที่ 4<br />
                    </span>
                    แก้ไขข้อมูลที่ไม่สอดคล้อง
                </a>
                <a href='#section-five'
                    className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection == 5 ? `bg-white text-primary ml-4    ` : `bg-white text-textPrimary`}`} onClick={() => setActiveSection(5)}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                        ฟังก์ชันที่ 5<br />
                    </span>
                    จัดการข้อมูลที่ขาดหายไป
                </a>
                <a href='#section-six'
                    className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection == 6 ? `bg-white text-primary ml-4` : `bg-white text-textPrimary`}`} onClick={() => setActiveSection(6)}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                        ฟังก์ชันที่ 6<br />
                    </span>
                    แยกคอลัมน์
                </a>
                <a href='#section-seven'
                    className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection == 7 ? `bg-white text-primary ml-4` : `bg-white text-textPrimary`}`} onClick={() => setActiveSection(7)}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                        ฟังก์ชันที่ 7<br />
                    </span>
                    รวมคอลัมน์
                </a>
                <a href='#section-eight'
                    className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection == 8 ? `bg-white text-primary ml-4` : `bg-white text-textPrimary`}`} onClick={() => setActiveSection(8)}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                        ฟังก์ชันที่ 8<br />
                    </span>
                    เปลี่ยนข้อมูลประเภท กลุ่ม ที่มีจำนวนน้อย เป็น “อื่น ๆ”
                </a>
                <a href='#section-nine'
                    className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection == 9 ? `bg-white text-primary ml-4` : `bg-white text-textPrimary`}`} onClick={() => setActiveSection(9)}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                        ฟังก์ชันที่ 9<br />
                    </span>
                    ลบข้อมูลที่ไม่ตรงกับประเภทข้อมูล
                </a>
                <a href='#section-ten'
                    className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection == 10 ? `bg-white text-primary ml-4` : `bg-white text-textPrimary`}`} onClick={() => setActiveSection(10)}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px] `}>
                        ฟังก์ชันที่ 10<br />
                    </span>
                    ระบุค่าผิดปกติทางสถิติ
                </a>
                <a href='#section-eleven'
                    className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection == 11 ? `bg-white text-primary ml-4` : `bg-white text-textPrimary`}`} onClick={() => setActiveSection(11)}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px]`}>
                        ฟังก์ชันที่ 11<br />
                    </span>
                    เปลี่ยนค่าผิดปกติทางสถิติ
                </a>
                <a href='#section-twelve'
                    className={`pl-4 lg:pl-8 xl:pl-12 py-1 ${activeSection == 12 ? `bg-white text-primary ml-4 ` : `bg-white text-textPrimary`}`} onClick={() => setActiveSection(12)}>
                    <span className={`text-[16px] lg:text-[20px] xl:text-[24px]`}>
                        ฟังก์ชันที่ 12<br />
                    </span>
                    ลบค่าผิดปกติทางสถิติ
                </a>

            </div>
            <div className='w-full flex flex-col items-center overflow-x-hidden'>
                <p className='text-[34px] lg:text-[38px] xl:text-[42px]  text-textPrimary font-kanit mt-28'>ทฤษฎีการทำงานของฟังก์ชันทำความสะอาดข้อมูล</p>
                <div className='w-[400px] lg:w-[550px] xl:w-[800px]   flex flex-col justify-around border-0'>
                    <section id="section-one" ref={ref => sectionRefs.current[0] = ref} className='pt-20'>

                        <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px]'>ฟังก์ชันที่ 1 เปลี่ยนชื่อคอลัมน์ (Rename Column Header)</p>
                        <p className='text-textGray  text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>คือการเปลี่ยนชื่อคอลัมน์ของชุดข้อมูล</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'>ผู้ใช้งานควรใช้เมื่อ ต้องการเปลี่ยนชื่อคอลัมน์ของชุดข้อมูล โดยฟังก์ชันนี้สามารถใช้ได้กับข้อมูลทุกประเภท</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'><strong>วิธีการใช้งาน</strong></p>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>1.	กดเลือกฟังก์ชัน เปลี่ยนชื่อคอลัมน์ (Rename Column Header)</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={functionCleansing12} objectFit='cover' alt="functionCleansing12" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>2.	เลือกคอลัมน์ที่ต้องการใช้ทำความสะอาดข้อมูลด้วยฟังก์ชันนี้ (ผู้ใช้งานสามารถเลือกได้เพียง 1 คอลัมน์) จากนั้นกดถัดไป</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={selectColumn4} objectFit='cover' alt="selectColumn4" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px] mt-5 flex flex-col justify-center border-0 '>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>3.	ผู้ใช้งานป้อนชื่อคอลัมน์ใหม่เพื่อเปลี่ยนข้อมูล จากนั้นกดยืนยัน</p>
                            <div class="flex flex-col justify-center items-center">
                                <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                    <Image src={inputData4} objectFit='cover' alt="inputData4" />
                                </div>
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>4.	ตรวจสอบข้อมูลที่จะถูกเปลี่ยนแปลง จากนั้นกดปุ่มยืนยันเพื่อทำความสะอาดข้อมูล</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={confirmCleansing5} objectFit='cover' alt="confirmCleansing5" />
                            </div>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ผู้ใช้งานจะสังเกตเห็นว่าการเปลี่ยนชื่อคอลัมน์นั้นจะถูกไฮไลท์ด้วยสีเหลือง เนื่องจากเป็นการแก้ไขข้อมูลบางคอลัมน์เท่านั้น</p>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>5.	ระบบจะแสดงข้อมูลหลังทำความสะอาด และแสดงประวัติฟังก์ชันล่าสุดที่ผู้ใช้งานเคยใช้ทำความสะอาดข้อมูลชุดนี้</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-2">
                                <Image src={navbarDetail} objectFit='cover' alt="navbarDetail" />
                            </div>
                        </div>
                    </section>

                    <section id="section-two" ref={ref => sectionRefs.current[1] = ref} className='pt-20'>
                        <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ฟังก์ชันที่ 2 ลบคอลัมน์ข้อมูลที่ไม่เกี่ยวข้อง (Delete Irrelevant Column)</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>คือการลบคอลัมน์ที่ไม่จำเป็นในการนำไปประมวลผลออก เพื่อเป็นการลดขนาดของชุดข้อมูล</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'>ผู้ใช้งานควรใช้เมื่อ ชุดข้อมูลมีคอลัมน์ที่ซ้ำซ้อน หรือมีคอลัมน์ที่เยอะเกินความจำเป็น เพื่อเป็นการลดขนาดของชุดข้อมูลทำให้ประหยัดทรัพยากรของเครื่องเมื่อนำชุดข้อมูลไปประมวลผล โดยฟังก์ชันนี้สามารถใช้ได้กับข้อมูลทุกประเภท</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'><strong>วิธีการใช้งาน</strong></p>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>1.	กดเลือกฟังก์ชัน ลบคอลัมน์ข้อมูลที่ไม่เกี่ยวข้อง (Delete Irrelevant Column) </p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={functionCleansing1} objectFit='cover' alt="functionCleansing1" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>2.	เลือกคอลัมน์ที่ต้องการใช้ทำความสะอาดข้อมูลด้วยฟังก์ชันนี้ (ผู้ใช้งานสามารถเลือกได้มากกว่า 1 คอลัมน์)</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={selectColumn2} objectFit='cover' alt="selectColumn2" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px] mt-5 border-0'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>3.	กดถัดไป</p>
                            <div class="flex flex-col justify-center items-center">
                                <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                    <Image src={selectColumn3} objectFit='cover' alt="selectColumn3" />
                                </div>
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>4.	ตรวจสอบข้อมูลที่จะถูกลบ จากนั้นกดปุ่มยืนยันเพื่อทำความสะอาดข้อมูล</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={confirmCleansing2} objectFit='cover' alt="confirmCleansing2" />
                            </div>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ผู้ใช้งานจะสังเกตเห็นว่าการลบคอลัมน์ข้อมูลที่ไม่เกี่ยวข้องนั้นจะถูกไฮไลท์ด้วยสีเหลืองทั้งหมด เนื่องจากเป็นการลบคอลัมน์ ทำให้โครงสร้างของข้อมูลทั้งหมดเปลี่ยนแปลง ซึ่งเป็นกรณีกับสีแดง ที่หมายถึง แถวข้อมูลนั้นได้หายไปทั้งแถว </p>
                        </div>
                    </section>
                    <section id="section-three" ref={ref => sectionRefs.current[2] = ref} className='pt-20'>
                        <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ฟังก์ชันที่ 3 ลบข้อมูลที่ซ้ำซ้อน (Delete Duplicate Data)</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>คือการลบแถวข้อมูล ที่มีข้อมูลทุกคอลัมน์ซ้ำกับแถวอื่น</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'>ผู้ใช้งานควรใช้เมื่อ ชุดข้อมูลมีข้อมูลที่เหมือนกันในทุกคอลัมน์ เหมาะกับชุดข้อมูลที่เกิดการผิดพลาดในการบันทึกข้อมูลที่เหมือนกันมามากกว่าหนึ่งครั้ง ทั้งนี้ทั้งนั้น ฟังก์ชันทำความสะอาดนี้ไม่เหมาะกับข้อมูลที่ผ่านการ oversampling หรือการเพิ่มข้อมูลเพื่อให้ชุดข้อมูลเกิดความสมดุล เพราะจะทำให้ข้อมูลที่ถูกสร้างขึ้นจากการสุ่มตัวอย่างเดิมถูกลบออกไปด้วย</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'><strong>วิธีการใช้งาน</strong></p>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>1.	กดเลือกฟังก์ชัน ลบข้อมูลที่ซ้ำซ้อน (Delete Duplicate Data)</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={functionCleansing2} objectFit='cover' alt="functionCleansing2" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>2.	กดถัดไป ระบบจะทำการลบข้อมูลแถวที่มีข้อมูลทุกคอลัมน์ซ้ำกับแถวอื่น</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={DeleteDuplicateData} objectFit='cover' alt="DeleteDuplicateData" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>3.	ตรวจสอบข้อมูลที่จะถูกลบ จากนั้นกดปุ่มยืนยันเพื่อทำความสะอาดข้อมูล</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={confirmCleansing3} objectFit='cover' alt="confirmCleansing3" />
                            </div>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ผู้ใช้งานจะสังเกตเห็นว่าการลบข้อมูลที่ซ้ำซ้อนนั้นจะถูกไฮไลท์ด้วยสีแดง เนื่องจากเป็นการลบข้อมูลทั้งแถว</p>
                        </div>
                    </section>
                    <section id="section-four" ref={ref => sectionRefs.current[3] = ref} className='pt-20'>
                        <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ฟังก์ชันที่ 4 แก้ไขข้อมูลที่ไม่สอดคล้อง (Edit Inconsistent Data)</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>คือการแก้ไขข้อมูลเดียวกันที่บันทึกไม่เหมือนกัน เช่น &quot;กทม.&quot; , &quot;กรุงเทพ&quot; ให้เป็นรูปแบบเดียวกัน โดยจะแก้ไขข้อมูลทุกตัวที่ผู้ใช้เลือกเป็นข้อมูลแบบใหม่ที่ผู้ใช้ต้องการ</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'>ผู้ใช้งานควรใช้เมื่อ มีข้อมูลประเภท string โดยชุดข้อมูลผ่านการจัดเก็บจากหลากหลายบุคคล หลายหน่วยงาน ซึ่งอาจไม่ได้มีการกำหนดมาตรฐานในการบันทึก หรือรวมไปถึงความผิดพลาดจากผู้กรอกข้อมูล ซึ่งทำให้ข้อมูลที่ควรจะเป็นข้อมูลเดียวกันนั้น มีการแสดงผลที่ต่างกัน ฟังก์ชันนี้จึงเหมาะกับการเปลี่ยนข้อมูลที่มีความหมายเดียวกัน แต่รูปแบบต่างกัน ให้กลายเป็นรูปแบบเดียวกัน เพื่อไม่ให้การประมวลผลข้อมูลเกิดความผิดพลาด</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'><strong>วิธีการใช้งาน</strong></p>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>1.	กดเลือกฟังก์ชัน แก้ไขข้อมูลที่ไม่สอดคล้อง (Edit Inconsistent Data)</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={functionCleansing3} objectFit='cover' alt="functionCleansing3" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>2.	เลือกคอลัมน์ที่ต้องการใช้ทำความสะอาดข้อมูลด้วยฟังก์ชันนี้ (ผู้ใช้งานสามารถเลือกทีละ 1 คอลัมน์) จากนั้นกดถัดไป</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={selectColumn4} objectFit='cover' alt="selectColumn4" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>3.	ระบบจะแสดงตัวเลือกข้อมูลให้ผู้ใช้เลือกเปลี่ยนข้อมูล โดยตัวเลือกที่แสดงนั้นคือข้อมูลที่ทั้งหมดในคอลัมน์นั้น จากนั้นกดถัดไป</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={selectData} objectFit='cover' alt="selectData" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px] mt-5 border-0'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>4.	ผู้ใช้งานป้อนข้อมูลใหม่เพื่อเปลี่ยนข้อมูล จากนั้นกดยืนยัน</p>
                            <div class="flex flex-col justify-center items-center">
                                <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-2">
                                    <Image src={inputData} objectFit='cover' alt="inputData" />
                                </div>
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>5.	ตรวจสอบข้อมูลที่จะถูกเปลี่ยนแปลง จากนั้นกดปุ่มยืนยันเพื่อทำความสะอาดข้อมูล</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={confirmCleansing2} objectFit='cover' alt="confirmCleansing2" />
                            </div>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>ผู้ใช้งานจะสังเกตเห็นว่าการแก้ไขข้อมูลที่ไม่สอดคล้องนั้นจะถูกไฮไลท์ด้วยสีเหลือง เนื่องจากเป็นการเปลี่ยนแปลงข้อมูลบางแถวหรือบางคอลัมน์เท่านั้น ส่วนข้อมูลที่ไม่เกิดการเปลี่ยนแปลงจะไม่ถูกไฮไลท์ (สีขาว) </p>
                        </div>
                    </section>
                    <section id="section-five" ref={ref => sectionRefs.current[4] = ref} className='pt-20'>
                        <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ฟังก์ชันที่ 5 จัดการข้อมูลที่ขาดหายไป (Managing Null Values) </p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>คือการเติมข้อมูลหรือตัดแถวข้อมูลที่มีค่าว่าง</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'>ผู้ใช้งานควรใช้เมื่อ ชุดข้อมูลมีข้อมูลที่ไม่ครบถ้วนสมบูรณ์ ในบางครั้งเมื่อนำข้อมูลที่มีค่าว่างไปประมวลผลในโมเดล Machine Learning (การเรียนรู้ของเครื่อง) อาจส่งผลให้เกิดความผิดพลาดขึ้นได้ โดยในฟังก์ชันนี้ผู้ใช้สามารถจัดการกับข้อมูลที่ขาดหายไปได้ 4 แบบคือ 1.) เติมค่าว่างด้วยค่าเฉลี่ย 2.) เติมค่าว่างด้วยค่ามัธยฐาน 3.) เติมข้อมูลที่กำหนดเอง 4.) ตัดข้อมูลที่มีค่าว่าง</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'><strong>วิธีการใช้งาน</strong></p>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>1.	กดเลือกฟังก์ชัน จัดการข้อมูลที่ขาดหายไป (Managing Null Values)</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={functionCleansing4} objectFit='cover' alt="functionCleansing4" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>2.	เลือกคอลัมน์ที่ต้องการใช้ทำความสะอาดข้อมูลด้วยฟังก์ชันนี้ (ผู้ใช้งานสามารถเลือกได้มากกว่า 1 คอลัมน์) จากนั้นกดถัดไป</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={selectColumn3} objectFit='cover' alt="selectColumn3" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>3.	ผู้ใช้งานเลือกว่าต้องการจัดการกับค่าว่างในคอลัมน์ที่เลือกอย่างไร โดยสามารถเลือกได้ 4 อย่างคือ</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-2">
                                <Image src={managingNullValues} objectFit='cover' alt="managingNullValues" />
                            </div>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5 mx-20'>3.1	<strong>เติมข้อมูลด้วยค่าเฉลี่ย</strong> ระบบจะเติมค่าเฉลี่ยแทนค่าว่างในคอลัมน์นั้น โดยค่าเฉลี่ยได้จากการคำนวณของข้อมูลในคอลัมน์นั้น หากคอลัมน์ของข้อมูลเป็นข้อมูลที่ไม่ใช่ตัวเลข จะทำการเติมโดยค่าที่มีมากที่สุดในคอลัมน์นั้น ๆ แทน</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-2">
                                <Image src={managingNullValues1} objectFit='cover' alt="managingNullValues1" />
                            </div>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5 mx-20'>3.2	<strong>เติมข้อมูลด้วยค่ามัธยฐาน</strong> ระบบจะเติมค่ามัธยฐานแทนค่าว่างในคอลัมน์นั้น โดยค่ามัธยฐานได้จากการคำนวณของข้อมูลในคอลัมน์นั้น หากคอลัมน์ของข้อมูลเป็นข้อมูลที่ไม่ใช่ตัวเลข จะทำการเติมโดยค่าที่มีมากที่สุดในคอลัมน์นั้น ๆ แทน</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-2">
                                <Image src={managingNullValues1} objectFit='cover' alt="managingNullValues1" />
                            </div>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5 mx-20'>3.3	<strong>เติมข้อมูลที่กำหนดเอง</strong> ผู้ใช้งานป้อนข้อมูลที่ต้องการ ระบบจะเติมข้อมูลแทนค่าว่างในคอลัมน์ที่ผู้ใช้งานเลือก</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={inputdatafromuser} objectFit='cover' alt="inputdatafromuser" />
                            </div>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5 mx-20'>3.4	<strong>ตัดข้อมูลทิ้ง</strong> ระบบจะลบข้อมูลแถวที่มีค่าว่างทิ้งทั้งแถว แต่หากข้อมูลมีค่าว่างเกิน 15% ของข้อมูลทั้งหมดจะไม่สามารถตัดข้อมูลทิ้งได้ เนื่องจากจะทำให้ชุดข้อมูลเสียข้อมูลที่มีอยู่มากเกินไป</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-2">
                                <Image src={managingNullValues1} objectFit='cover' alt="managingNullValues1" />
                            </div>
                        </div>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10 mt-5'>4.	ตรวจสอบข้อมูลที่จะถูกเปลี่ยนแปลง จากนั้นกดปุ่มยืนยันเพื่อทำความสะอาดข้อมูล</p>
                    </section>
                    <section id="section-six" ref={ref => sectionRefs.current[5] = ref} className='pt-20'>
                        <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ฟังก์ชันที่ 6 แยกคอลัมน์ (Split Column)</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>คือแยกโดยใช้ตัวแบ่ง (Delimiter)</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'>ผู้ใช้งานควรใช้เมื่อ ชุดข้อมูลมีคอลัมน์ที่สามารถแยกรายละเอียดออกมาได้ เช่น หากเป็นข้อมูล วันเดือนปี ผู้ใช้งานสามารถแยกออกมาเป็น 3 คอลัมน์ เป็น วัน เดือน ปี ได้ ทำให้ผู้ใช้งานสามารถมองเห็นรายละเอียดเชิงลึกของข้อมูลได้มากยิ่งขึ้น ฟังก์ชันนี้ใช้สำหรับข้อมูลประเภท string หากนำไปใช้กับข้อมูลประเภท number นั้น จะไม่เกิดการเปลี่ยนแปลงใด ๆ </p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'><strong>วิธีการใช้งาน</strong></p>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px] mt-5 border-0'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>1.	กดเลือกฟังก์ชัน แยกคอลัมน์ (Split Column)</p>
                            <div class="flex flex-col justify-center items-center">
                                <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                    <Image src={functionCleansing5} objectFit='cover' alt="functionCleansing5" />
                                </div>
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>2.	เลือกคอลัมน์ที่ต้องการใช้ทำความสะอาดข้อมูลด้วยฟังก์ชันนี้ (ผู้ใช้งานสามารถเลือกได้ทีละ 1 คอลัมน์) จากนั้น กดปุ่มถัดไป</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={selectColumn4} objectFit='cover' alt="selectColumn4" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>3.	กรอกข้อมูลที่ว่าต้องการแยกคอลัมน์โดยใช้ตัวแบ่งใดในการแยก เช่น , (จุลภาค) : (ทวิภาค) _ (ยัติภาค) – (ยัติภังค์) และป้อนชื่อคอมลัมน์ที่ 1 และ 2 จากนั้น กดปุ่มยืนยัน</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={inputData2} objectFit='cover' alt="inputData2" />
                            </div>
                        </div>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10 mt-5'>4.	ตรวจสอบข้อมูลที่จะถูกเปลี่ยนแปลง จากนั้นกดปุ่มยืนยันเพื่อทำความสะอาดข้อมูล</p>
                    </section>
                    <section id="section-seven" ref={ref => sectionRefs.current[6] = ref} className='pt-20'>
                        <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ฟังก์ชันที่ 7 รวมคอลัมน์ (Merge Column)</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>คือทำการรวมคอลัมน์ 2 คอลัมน์โดยมีตัวเชื่อม (Connector)</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'>ผู้ใช้งานควรใช้เมื่อ มีข้อมูลที่สามารถรวมกันได้ เช่น ชื่อ และ นามสกุล เนื่องจากเป็นข้อมูลที่มีความเป็นเอกลักษณ์อยู่แล้ว และอาจจะไม่ได้ส่งผลต่อการวิเคราะห์เชิงลึกมากนัก ซึ่งเป็นการลดขนาดของชุดข้อมูลทำให้ประหยัดทรัพยากรในการประมวลผลอีกด้วย โดยคอลัมน์ที่ผ่านการรวมคอลัมน์จะมีประเภทเป็น string ผู้ใช้สามารถรวมคอลัมน์ประเภท number ได้ แต่จะถูก cast เป็น string ทั้งหมดหลังจากใช้ฟังก์ชันนี้ </p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'><strong>วิธีการใช้งาน</strong></p>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px] mt-5 border-0'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>1.	กดเลือกฟังก์ชัน รวมคอลัมน์ (Merge Column)</p>
                            <div class="flex flex-col justify-center items-center"></div>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={functionCleansing6} objectFit='cover' alt="functionCleansing6" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>2.	เลือกคอลัมน์ที่ต้องการใช้ทำความสะอาดข้อมูลด้วยฟังก์ชันนี้ (ผู้ใช้งานจะต้องเลือก 2 คอลัมน์์) จากนั้นกดถัดไป </p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={selectColumn3} objectFit='cover' alt="selectColumn3" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>3.	จะต้องเพิ่ม อีกขั้นตอนคือ เลือกคอลัมน์ที่อยู่ทางซ้าย </p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={inputData3} objectFit='cover' alt="inputData3" />
                            </div>
                        </div>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10 mt-5'>4. ตรวจสอบข้อมูลที่จะถูกเปลี่ยนแปลง จากนั้นกดปุ่มยืนยันเพื่อทำความสะอาดข้อมูล</p>
                    </section>
                    <section id="section-eight" ref={ref => sectionRefs.current[7] = ref} className='pt-20'>
                        <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ฟังก์ชันที่ 8 เปลี่ยนข้อมูลประเภท กลุ่ม ที่มีจำนวนน้อย เป็น “อื่น ๆ” (Replace Excess Categories with “Other”) ต้องเพิ่มขั้นตอน </p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>คือการจัดกลุ่มชุดข้อมูลตามประเภทของข้อมูล กลุ่มข้อมูลที่มีจำนวนน้อยกว่าที่กำหนดจะเปลี่ยนเป็นกลุ่ม “อื่นๆ” </p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'>ผู้ใช้งานควรใช้เมื่อ มีข้อมูลประเภท Categories (หมวดหมู่) ที่มีเยอะเกินไป หากนำข้อมูลนี้ไปแสดงผลอาจทำให้ไม่สามารถเห็นรายละเอียดที่ชัดเจน ฟังก์ชันนี้จึงเป็นการรวมหมวดหมู่ข้อมูลที่มีจำนวนน้อย ๆ ให้แสดงรวมกันเป็นคำว่า ”อื่น ๆ” เพื่อให้ผู้ใช้สามารถเข้าใจการแสดงผลข้อมูลได้ง่ายขึ้น ฟังก์ชันนี้หากนำไปใช้กับข้อมูลประเภทตัวเลข จะไม่เกิดการเปลี่ยนแปลงใด ๆ </p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'><strong>วิธีการใช้งาน</strong></p>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>1.	กดเลือกฟังก์ชัน เปลี่ยนข้อมูลประเภท กลุ่ม ที่มีจำนวนน้อย เป็น “อื่น ๆ” (Replace Excess Categories with “Other”)</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={functionCleansing7} objectFit='cover' alt="functionCleansing7" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>2.	เลือกคอลัมน์ที่ต้องการใช้ทำความสะอาดข้อมูลด้วยฟังก์ชันนี้ (ผู้ใช้งานสามารถเลือกได้มากกว่า 1 คอลัมน์) จากนั้นกดถัดไป</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={selectColumn3} objectFit='cover' alt="selectColumn3" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>3.	ตรวจสอบข้อมูลที่จะถูกเปลี่ยนแปลง จากนั้นกดปุ่มยืนยันเพื่อทำความสะอาดข้อมูล</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={confirmCleansing4} objectFit='cover' alt="confirmCleansing4" />
                            </div>
                        </div>
                    </section>
                    <section id="section-nine" ref={ref => sectionRefs.current[8] = ref} className='pt-20'>
                        <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ฟังก์ชันที่ 9 นำข้อมูลที่ไม่ใช่ตัวเลขออก (Remove Unreadable Numbers) (แก้ UI ด้วย)</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>คือการลบแถวข้อมูลที่มีข้อมูลไม่ตรงกับคอลัมน์ที่กำหนด</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'>ผู้ใช้งานควรใช้เมื่อ ชุดข้อมูลมีการจัดเก็บตัวอักษรในช่องที่ควรจะเก็บแค่ตัวเลข ฟังก์ชันนี้จะทำการลบข้อมูลที่ไม่ใช่ตัวเลขทิ้ง และเปลี่ยนประเภทของคอลัมน์ข้อมูลเป็นตัวเลข (int หรือ float) ตามความเหมาะสม</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'><strong>วิธีการใช้งาน</strong></p>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>1.	กดเลือกฟังก์ชัน ลบข้อมูลที่ไม่ตรงกับประเภทข้อมูล (Remove Unreadable Columns)</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={functionCleansing8} objectFit='cover' alt="functionCleansing8" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>2.	เลือกคอลัมน์ที่ต้องการใช้ทำความสะอาดข้อมูลด้วยฟังก์ชันนี้ (ผู้ใช้งานสามารถเลือกได้มากกว่า 1 คอลัมน์) จากนั้นกดถัดไป</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={selectColumn3} objectFit='cover' alt="selectColumn3" />
                            </div>
                        </div>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10 mt-5'>3.	ตรวจสอบข้อมูลที่จะถูกเปลี่ยนแปลง จากนั้นกดปุ่มยืนยันเพื่อทำความสะอาดข้อมูล</p>
                    </section>
                    <section id="section-ten" ref={ref => sectionRefs.current[9] = ref} className='pt-20'>
                        <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ฟังก์ชันที่ 10 ระบุค่าผิดปกติทางสถิติ (Flag Outliers)</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>คือการสร้างคอลัมน์ใหม่หากมีค่าผิดปกติจะระบุค่าเป็น 1 หาไม่มีจะระบุค่าเป็น 0</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'>ผู้ใช้งานควรใช้เมื่อมีชุดข้อมูลที่มีคอลัมน์เป็นค่าตัวเลข การใช้ฟังก์ชันนี้เป็นการชี้จุดให้ผู้ใช้เห็นว่า ข้อมูลแถวใดมีความผิดปกติทางสถิติ และผู้ใช้สามารถตรวจดูความผิดปกติของข้อมูลเหล่านั้นได้ ทั้งนี้ทั้งนั้นฟังก์ชันนี้หากใช้กับข้อมูลที่ไม่ใช่ตัวเลข จะไม่เกิดการเปลี่ยนแปลงใด ๆ เกิดขึ้นทั้งสิ้น โดยในคำนวณหาค่าข้อมูลที่มีค่าผิดปกติทางสถิตินั้น เว็บแอปพลิเคชันนี้จะใช้วิธีการหาแบบ Interquartile Range (ค่าพิสัยระหว่างควอไทล์) โดยค่าผิดปกติที่มีค่าน้อยกว่า 1.5 คูณด้วยค่า IQR และค่าผิดปกติที่มีค่ามากกว่า 1.5 คูณด้วยค่า IQR จะจัดเป็นค่าที่มีความผิดปกติทางสถิติ</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'><strong>วิธีการใช้งาน</strong></p>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px] mt-5 border-0'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>1.	กดเลือกฟังก์ชัน ระบุค่าผิดปกติทางสถิติ (Flag Outliers)</p>
                            <div class="flex flex-col justify-center items-center">
                                <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                    <Image src={functionCleansing9} objectFit='cover' alt="functionCleansing9" />
                                </div>
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>2.	เลือกคอลัมน์ที่ต้องการใช้ทำความสะอาดข้อมูลด้วยฟังก์ชันนี้ (ผู้ใช้งานสามารถเลือกได้มากกว่า 1 คอลัมน์) จากนั้นกดถัดไป</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={selectColumn3} objectFit='cover' alt="selectColumn3" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>3.	เมื่อผู้ใช้งานเลือกฟังก์ชันทำความสะอาดนี้กับคอลัมน์ใด คอลัมน์นั้นจะถูกนำไปคำนวณ และแสดงผลออกมาโดยเพิ่มคอลัมน์มาอีกหนึ่งคอลัมน์ด้านขวาของคอลัมน์ที่เลือกเพื่อแสดงข้อมูลระบุค่าผิดปกติ หากระบุค่าเป็น 1 คือพบเป็นค่าผิดปกติ หากระบุค่าเป็น 0 คือค่าที่ไม่ผิดปกติ</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={flagOutliers} objectFit='cover' alt="flagOutliers" />
                            </div>
                        </div>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10 mt-5'>4. ตรวจสอบข้อมูลที่จะถูกเปลี่ยนแปลง จากนั้นกดปุ่มยืนยันเพื่อทำความสะอาดข้อมูล โดยข้อมูลทั้งหมดจะถูกเปลี่ยนเป็นสีเหลือง เนื่องจากมีการเพิ่มคอลัมน์มาอีกหนึ่งคอลัมน์ทำให้โครงสร้างข้อมูลทั้งหมดเปลี่ยนไป แต่หากใช้ฟังก์ชันนี้กับข้อมูลประเภท String จะไม่เปิดการเปลี่ยนแปลงใด ๆ (สีขาว) </p>
                    </section>
                    <section id="section-eleven" ref={ref => sectionRefs.current[10] = ref} className='pt-20'>
                        <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ฟังก์ชันที่ 11 เปลี่ยนค่าผิดปกติทางสถิติ (Clamp Outliers)</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>คือการเปลี่ยนค่าผิดปกติทางสถิติเป็นค่าที่อยู่ในช่วงแทน</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'>ผู้ใช้งานควรใช้เมื่อมีชุดข้อมูลที่มีคอลัมน์เป็นค่าตัวเลข การใช้ฟังก์ชันนี้เป็นการปรับค่าผิดปกติที่อาจจะส่งผลต่อการประมวลผลเมื่อนำข้อมูลไปใช้เข้าโมเดลการเรียนรู้ของเครื่อง (Machine Learning) การปรับค่าผิดปกติจะแบ่งออกเป็น 2 รูปแบบตามที่ผู้ใช้เลือก ได้แก่ 1.) เปลี่ยนข้อมูลเป็นค่าที่มากที่สุดหรือน้อยที่สุดที่ไม่ผิดปกติทางสถิติ และ 2.) เปลี่ยนข้อมูลที่ผิดปกติทางสถิติทั้งหมดเป็นค่าที่ผู้ใช้ต้องการ ทั้งนี้ทั้งนั้นฟังก์ชันนี้หากใช้กับข้อมูลที่ไม่ใช่ตัวเลข จะไม่เกิดการเปลี่ยนแปลงใด ๆ เกิดขึ้นทั้งสิ้น โดยในคำนวณหาค่าข้อมูลที่มีค่าผิดปกติทางสถิตินั้น เว็บแอปพลิเคชันนี้จะใช้วิธีการหาแบบ Interquartile Range (ค่าพิสัยระหว่างควอไทล์) โดยค่าผิดปกติที่มีค่าน้อยกว่า 1.5 คูณด้วยค่า IQR และค่าผิดปกติที่มีค่ามากกว่า 1.5 คูณด้วยค่า IQR จะจัดเป็นค่าที่มีความผิดปกติทางสถิติ</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'><strong>วิธีการใช้งาน</strong></p>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px] mt-5 border-0'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>1.	กดเลือกฟังก์ชัน ลบค่าผิดปกติทางสถิติ (Delete Outliers)</p>
                            <div class="flex flex-col justify-center items-center">
                                <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                    <Image src={functionCleansing10} objectFit='cover' alt="functionCleansing10" />
                                </div>
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>2.	เลือกคอลัมน์ที่ต้องการใช้ทำความสะอาดข้อมูลด้วยฟังก์ชันนี้ (ผู้ใช้งานสามารถเลือกได้มากกว่า 1 คอลัมน์) จากนั้นกดถัดไป</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={selectColumn3} objectFit='cover' alt="selectColumn3" />
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>3.	ผู้ใช้งานสามารถเลือกว่าต้องการจัดการกับข้อมูลที่มีค่าผิดปกติทางสถิติได้ 2 ตัวเลือกคือ</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={clampOutliers} objectFit='cover' alt="clampOutliers" />
                            </div>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5 mx-20'>3.1	<strong>เปลี่ยนเป็นค่ามากที่สุดหรือน้อยที่สุดที่ไม่ผิดปกติทางสถิติ</strong> ระบบจะทำการเปลี่ยนข้อมูลที่มีค่ามากเกินจนกลายเป็นค่าผิดปกติให้เป็นค่ามากที่สุดที่ยังไม่เป็นค่าผิดปกติ และเปลี่ยนข้อมูลที่มีค่าน้อยเกินจนกลายเป็นค่าผิดปกติให้เป็นค่าน้อยที่สุดที่ยังไม่เป็นค่าผิดปกติโดยอัตมัติ จากนั้นกดปุ่มยืนยัน</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                                <Image src={inputdataAuto} objectFit='cover' alt="inputdataAuto" />
                            </div>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5 mx-20'>3.2 <strong>เปลี่ยนเป็นค่าที่ผู้ใช้งานต้องการ</strong> ผู้ใช้งานป้อนข้อมูลที่ต้องการ ระบบจะเปลี่ยนข้อมูลที่เป็นค่าผิดปกติทางสถิติ ให้เป็นข้อมูลที่ผู้ใช้งานป้อนเข้ามา จากนั้นกดปุ่มยืนยัน</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                <Image src={inputdatafromuser} objectFit='cover' alt="inputdatafromuser" />
                            </div>
                        </div>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10 mt-5'>4.	ตรวจสอบข้อมูลที่จะถูกเปลี่ยนแปลง จากนั้นกดปุ่มยืนยันเพื่อทำความสะอาดข้อมูล</p>
                    </section>
                    <section id="section-twelve" ref={ref => sectionRefs.current[11] = ref} className='pt-20'>
                        <p className='text-textPrimary font-kanit text-[26px] lg:text-[30px] xl:text-[34px] '>ฟังก์ชันที่ 12 ลบค่าผิดปกติทางสถิติ (Delete Outliers)</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-5'>คือการนำแถวข้อมูลที่มีค่าผิดปกติทางสถิติออก</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'>ผู้ใช้งานควรใช้เมื่อมีชุดข้อมูลที่มีคอลัมน์เป็นตัวเลข และมีค่าผิดปกติทางสถิติ การใช้ฟังก์ชันนี้จะเป็นการลบแถวข้อมูลที่มีค่าผิดปกติทิ้ง เนื่องจากค่าผิดปกติของข้อมูลอาจส่งผลกระทบต่อการประมวลผลข้อมูลเมื่อนำข้อมูลเหล่านี้ไปใช้ในการเรียนรู้ของเครื่อง (Machine Learning) ทั้งนี้ทั้งนั้นฟังก์ชันนี้หากใช้กับข้อมูลที่ไม่ใช่ตัวเลข จะไม่เกิดการเปลี่ยนแปลงใด ๆ เกิดขึ้นทั้งสิ้น โดยในการค่าข้อมูลที่มีค่าผิดปกติทางสถิตินั้น เว็บแอปพลิเคชันนี้จะใช้วิธีการหาแบบ Interquartile Range (ค่าพิสัยระหว่างควอไทล์) โดยค่าผิดปกติที่มีค่าน้อยกว่า 1.5 คูณด้วยค่า IQR และค่าผิดปกติที่มีค่ามากกว่า 1.5 คูณด้วยค่า IQR จะจัดเป็นค่าที่มีความผิดปกติทางสถิติ</p>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mt-10'><strong>วิธีการใช้งาน</strong></p>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px] mt-5 border-0'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>1.	กดเลือกฟังก์ชัน เปลี่ยนค่าผิดปกติทางสถิติ (Clamp Outliers)</p>
                            <div class="flex flex-col justify-center items-center">
                                <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                                    <Image src={functionCleansing11} objectFit='cover' alt="functionCleansing11" />
                                </div>
                            </div>
                        </div>
                        <div className='w-[400px] lg:w-[550px] xl:w-[800px]   mt-5 flex flex-col justify-center border-0 items-center items-center'>
                            <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10'>2.	เลือกคอลัมน์ที่ต้องการใช้ทำความสะอาดข้อมูลด้วยฟังก์ชันนี้ (ผู้ใช้งานสามารถเลือกได้มากกว่า 1 คอลัมน์) จากนั้นกดถัดไป</p>
                            <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5 item-center justify-center">
                                <Image src={selectColumn3} objectFit='contain' alt="selectColumn3" />
                            </div>
                        </div>
                        <p className='text-textGray text-[18px] lg:text-[22px] xl:text-[26px] mx-10 mt-5'>3.	ตรวจสอบข้อมูลที่จะถูกเปลี่ยนแปลง จากนั้นกดปุ่มยืนยันเพื่อทำความสะอาดข้อมูล</p>
                    </section>
                </div>
            </div>
            <div className='flex flex-col w-full mt-2 font-kanit text-textPrimary text-center items-center'>
                <div onClick={handleClean} className='px-12 py-2 bg-primary text-white text-[26px] lg:text-[30px] xl:text-[34px] w-fit rounded-2xl mt-8 mb-20 hover:bg-hoverPrimary hover:cursor-pointer'>ทำความสะอาดข้อมูล</div>
            </div>


        </div>
    )
}

export default Document