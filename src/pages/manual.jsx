import React, { useState, useEffect } from 'react'
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
    changProjectName
} from '@/assets'
import Link from 'next/link'
import { atomUserRole } from "@/atoms/atomUserRole";
import { useRecoilState } from "recoil";
import useAccount from '@/hooks/useAccount';

const Manual = () => {
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
    return (
        <div className='relative w-screen h-full'>
            <Navbar menu={2} />
            <div className='w-full flex flex-col items-center'>
                <p className='text-[32px] text-textPrimary font-kanit mt-20'>คู่มือการใช้งาน</p>
                <div className='w-[700px] flex flex-col mt-20 justify-around border-0'>
                    <p className='text-textPrimary font-kanit text-[24px]'>ขั้นตอนที่ 1 : สมัครสมาชิก</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={register} width={700} height={400} objectFit='contain' alt="register" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> ผู้ใช้งานที่เข้ามาใช้งาน <strong>คลีนเนอร์</strong> ครั้งแรกต้องสมัครสมาชิก เพื่อสร้างบัญชีกับ <strong>คลีนเนอร์</strong> ก่อนใช้งาน</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5'>ขั้นตอนที่ 2 : เข้าสู่ระบบ</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={login} width={700} height={400} objectFit='contain' alt="login" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> เข้าสู่ระบบด้วยบัญชีที่เคยสร้างไว้กับ <strong>คลีนเนอร์</strong> เพื่อเข้าถึงข้อมูลที่เคยบันทึกไว้ในบัญชีนั้น ไม่ว่าจะเป็นโปรเจกต์ ประวัติการทำความสะอาดข้อมูล และดาวน์โหลดไฟล์โปรเจกต์ที่ทำความสะอาดแล้ว เป็นต้น</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5'>ขั้นตอนที่ 3 : ศึกษาข้อมูลที่สำคัญ</p>
                    <p className='text-textPrimary font-kanit text-[24px] mt-5 mx-10'>•	คู่มือการใช้งาน</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={userManual} width={700} height={400} objectFit='contain' alt="userManual" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> ภายในหน้า <strong>คู่มือ</strong> จะมีรายละเอียดการใช้งาน <strong>คลีนเนอร์</strong> ให้ผู้ใช้งานได้ศึกษาว่าขั้นตอนการใช้งาน <strong>คลีนเนอร์</strong> เป็นอย่างไร และฟังก์ชันแต่ละฟังก์ชันทำงานอย่างไร เพื่อให้ผู้ใช้งานสามารถใช้งาน <strong>คลีนเนอร์</strong> ได้อย่างสะดวกมากยิ่งขึ้น</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5 mx-10'>•	ทฤษฎีการทำงานของฟังก์ชันทำความสะอาดข้อมูล</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={doc} width={700} height={350} objectFit='contain' alt="theory" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> ภายในหน้า <strong>ทฤษฎี</strong> จะมีรายละเอียดการใช้งานฟังก์ชันทำความสะอาดทั้ง 11 ฟังก์ชัน ให้ผู้ใช้งานได้ศึกษาวิธีการใช้งานแต่ละฟังก์ชันอย่างละเอียด พร้อมทั้งคำอธิบายหลักการทำงานของฟังก์ชันนั้นๆ เพื่อให้ผู้ใช้งานสามารถเข้าใจหลักการทำงานของฟังก์ชันความสะอาดข้อมูลทั้ง 11 ฟังก์ชัน และใช้งานได้อย่างมีประสิทธิภาพมากยิ่งขึ้น</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5 mx-10'>•	โปรเจกต์ของฉัน</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={myProject} width={700} height={400} objectFit='contain' alt="myProject" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> ผู้ใช้งานสามารถดูโปรเจกต์ที่สร้างไว้ได้ภายในหน้า <strong>โปรเจกต์ของฉัน</strong> และสามารถเลือกโปรเจกต์ที่ต้องการทำความสะอาดได้ภายในหน้านี้ และหากต้องการสร้างโปรเจกต์ใหม่ สามารถกดปุ่ม <strong>อัปโหลด</strong> เพื่ออัปโหลดไฟล์หรือเชื่อมต่อฐานข้อมูลเพื่อสร้างโปรเจกต์ใหม่ และหากต้องการลบโปรเจกต์ ผู้ใช้งานสามารถกดปุ่มรูปถังขยะมุมล่างขวาของโปรเจกต์นั้นๆ เพื่อทำการลบโปรเจกต์</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5'>ขั้นตอนที่ 4 : อัปโหลดข้อมูล</p>
                    <p className='text-textPrimary font-kanit text-[24px] mt-5 mx-10'>•	อัปโหลดไฟล์ชุดข้อมูล</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={uploadFile} width={700} height={400} objectFit='contain' alt="uploadFile" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> การอัปโหลดข้อมูลเข้าสู่ <strong>คลีนเนอร์</strong> จะรองรับไฟล์ประเภท json, csv, xls และ xlsx เท่านั้น โดยผู้ใช้งานสามารถกดปุ่ม <strong>แนบไฟล์</strong> เพื่อทำการเลือกอัปโหลดไฟล์ชุดข้อมูลที่ต้องการอัปโหลดจากเครื่องคอมพิวเตอร์ของผู้ใช้งาน โดยสามารถอัปโหลดได้ทีละไฟล์ จากนั้นกดปุ่ม <strong>อัปโหลด</strong> เพื่อทำการอัปโหลดไฟล์ชุดข้อมูล</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5 mx-10'>•	เชื่อมต่อฐานข้อมูล MySQL</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={connectMysql} width={700} height={400} objectFit='contain' alt="connectMysql" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> ผู้ใช้งานสามารถเชื่อมต่อฐานข้อมูล MySQL เพื่อดึงชุดข้อมูลของผู้ใช้งานมาทำความสะอาด โดยกรอกข้อมูลที่จำเป็นในการเชื่อมต่อฐานข้อมูลและกดปุ่ม <strong>ยืนยัน</strong> เพื่อทำการเชื่อมฐานข้อมูล โดยการทำความสะอาดภายใน <strong>คลีนเนอร์</strong> จะไม่ได้ไปอัพเดตข้อมูลในฐานข้อมูล MySQL ของผู้ใช้งาน <strong>คลีนเนอร์</strong> ทำเพียงแค่ดึงชุดข้อมูลมาเท่านั้น เมื่อทำความสะอาดเสร็จแล้วผู้ใช้งานสามารถดาวน์โหลดชุดข้อมูลกลับไปได้ในรูปแบบไฟล์ csv</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5 mx-10'>•	เลือกใช้ชุดข้อมูลทดลอง</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={datatest} width={700} height={400} objectFit='contain' alt="datatest" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> ภายในหน้า <strong>ชุดข้อมูลสำหรับทดลอง</strong> จะมีชุดข้อมูลให้ผู้ใช้งานเลือกใช้ทดลองได้ 3 ชุด คือ Zomato Café Reviews, ดัชนีสมรรถนะสิ่งแวดล้อมของประเทศไทย และ ผลการรับฟังประสบการณ์ผู้ป่วยสู่การปรับระบบบริการ ซึ่งเมื่อผู้ใช้งานเลือกชุดข้อมูลใด ชุดข้อมูลนั้นจะถูกเพิ่มเข้าไปในหน้า <strong>โปรเจกต์ของฉัน</strong> เพื่อเก็บเป็นโปรเจกต์ของผู้ใช้งาน</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5'>ขั้นตอนที่ 5 : ทำความสะอาดข้อมูล</p>
                    <p className='text-textPrimary font-kanit text-[24px] mt-5 mx-10'>•	เปลี่ยนชื่อโปรเจกต์</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={changProjectName} width={700} height={400} objectFit='contain' alt="changProjectName" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> เมื่อผู้ใช้งานกดเข้ามาภายในโปรเจกต์ ภายในหน้านี้ผู้ใช้งานสามารถเปลี่ยนชื่อโปรเจกต์นั้นได้โดยกดปุ่มรูปดินสอเพื่อทำการเปลี่ยนชื่อโปรเจกต์</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5 mx-10'>•	มุมมองตาราง</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={tableView} width={700} height={400} objectFit='contain' alt="tableView" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> ฟังก์ชัน <strong>มุมมองตาราง</strong> จะช่วยให้ผู้ใช้งานเห็นมุมมองชุดข้อมูลนั้นในรูปแบบตาราง โดยมีการแสดงแบบ Pagination เพื่อแบ่งการแสดงข้อมูลออกเป็นหน้าย่อยๆ ผู้ใช้งานสามารถกดเลือกหน้าที่มุมขวาล่างเพื่อดูข้อมูลในแต่ละหน้า</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5 mx-10'>•	มุมมองภาพรวม</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={overallView} width={700} height={400} objectFit='contain' alt="overallView" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> ฟังก์ชัน <strong>มุมมองภาพรวม</strong> จะช่วยให้ผู้ใช้งานสามารถเห็นภาพรวมของชุดข้อมูลนั้นได้ โดยมีการแสดงแผนภูมิของแต่ละคอลัมน์ และผู้ใช้งานสามารถเปลี่ยนประเภทข้อมูลของแต่ละคอลัมน์ได้ภายในหน้านี้</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5 mx-10'>•	การใช้ฟังก์ชันทำความสะอาดข้อมูล</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900 mt-5">
                            <Image src={functionCleansing} width={700} height={350} objectFit='contain' alt="functionCleansing" />
                        </div>
                        <p className='text-textGray text-[16px] py-6'> เมื่อผู้ใช้งานกดปุ่ม <strong>ทำความสะอาดข้อมูล</strong> จะมี Pop up ฟังก์ชันทำความสะอาดข้อมูลทั้ง 11 ฟังก์ชัน ขึ้นมาให้ผู้ใช้งานได้เลือกว่าต้องการใช้ฟังก์ชันทำความสะอาดข้อมูลใดกับชุดข้อมูลนี้ โดยสามารถเลือกใช้ได้ทีละ 1 ฟังก์ชัน</p>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={selectColumn} width={700} height={380} objectFit='contain' alt="selectColumn" />
                        </div>
                        <p className='text-textGray text-[16px] py-6'> เมื่อเลือกฟังก์ชันที่ต้องการแล้ว ระบบจะให้ผู้ใช้งานเลือกคอลัมน์ที่ต้องการให้ทำความสะอาดข้อมูล ซึ่งฟังก์ชันบางอย่างที่ไม่เหมาะกับประเภทข้อมูลของคอลัมน์นั้น หากเป็นเช่นนั้นระบบจะแจ้งเตือนให้ผู้ใช้งานเลือกคอลัมน์ที่ต้องการทำความสะอาดใหม่อีกครั้ง เพื่อให้เหมาะสมกับฟังก์ชันทำความสะอาดข้อมูล จากนั้นผู้ใช้งานกดปุ่ม <strong>ถัดไป</strong> เพื่อทำความสะอาดข้อมูล</p>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={afterClean} width={700} height={400} objectFit='contain' alt="afterClean" />
                        </div>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900 py-6">
                            <Image src={dataHaveAction} width={700} height={400} objectFit='contain' alt="dataHaveAction" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> เมื่อระบบทำความสะอาดเสร็จแล้วจะแสดงข้อมูลออกมาอยู่ในหน้า <strong>ข้อมูลหลังทำความสะอาด</strong> หากผู้ใช้งานต้องการดูเฉพาะข้อมูลที่จะถูกลบ หรือเปลี่ยนแปลง สามารถกดปุ่ม <strong>ข้อมูลที่ถูกจัดการ</strong> ซึ่งข้อมูลแถวใดที่มีไฮไลท์สีเหลือง หมายความว่าข้อมูลแถวนั้นจะถูกแก้ไข และข้อมูลแถวที่มีไฮไลท์สีแดง หมายความว่าข้อมูลแถวนั้นจะถูกลบ สามารถอ่านรายละเอียดการทำงานแต่ละฟังก์ชันเพิ่มเติมได้ที่ <a className="text-primary underline" href="/document">เอกสารทฤษฎีการทำงานของฟังก์ชันทำความสะอาดข้อมูล</a> เมื่อผู้ใช้งานต้องการยืนยันการทำความสะอาดข้อมูลสามารถกดปุ่ม ยืนยัน ด้านขวาบนเพื่อทำการยืนยันการทำความสะอาดข้อมูล</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5 mx-10'>•	ยกเลิกการใช้ฟังก์ชันทำความสะอาดข้อมูล</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={navbarDetail} width={700} height={400} objectFit='contain' alt="navbarDetail" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> แถบเมนูด้านบนจะแสดงประวัติการทำความสะอาดข้อมูลของชุดข้อมูลนั้นๆ หากผู้ใช้งานต้องการยกเลิกการทำความสะอาดข้อมูลครั้งล่าสุดสามารถกดปุ่มกากบาท ที่ประวัติการทำความสะอาดข้อมูลนั้น จากนั้นจะมี Pop up ยืนยันการยกเลิกการทำความสะอาดข้อมูลครั้งล่าสุดขึ้นมาให้ผู้ใช้งานกดยืนยันอีกครั้ง เมื่อผู้ใช้งานกดปุ่ม <strong>ยืนยัน</strong> ข้อมูลจะกลับไปเป็นข้อมูลเดิมก่อนที่จะใช้ฟังก์ชันทำความสะอาดนั้น</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5'>ขั้นตอนที่ 6 : ดาวน์โหลดข้อมูล</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <div class="rounded-lg shadow-xl dark:shadow-gray-900">
                            <Image src={download} width={700} height={380} objectFit='contain' alt="download" />
                        </div>
                        <p className='text-textGray text-[16px] mt-6'> การดาวน์โหลดไฟล์ชุดข้อมูล เมื่อผู้ใช้งานกดปุ่ม <strong>ดาวน์โหลด</strong> บนสุดทางด้านขวาระบบจะแสดง Pop up ดาวน์โหลดไฟล์ให้ผู้ใช้งานแก้ไขชื่อไฟล์ (หากต้องการ) จากนั้นกดปุ่ม <strong>ดาวน์โหลด</strong> หรือหากต้องการยกเลิกการดาวน์โหลดสามารถกดปุ่มกากบาทที่ด้านขวาบนของ Pop up เพื่อปิด Pop up ดาวน์โหลดไฟล์ โดยไฟล์ชุดข้อมูลที่ดาวน์โหลดจาก <strong>คลีนเนอร์</strong> จะเป็นไฟล์ประเภท csv เท่านั้น</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full mt-2 font-kanit text-textPrimary text-center items-center'>
                <Link href={"/uploadPage"} className='px-12 py-2 bg-primary text-white text-[24px] w-fit rounded-2xl mt-8 hover:bg-hoverPrimary'>ทำความสะอาดข้อมูล</Link>
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