import React, { useState, useEffect } from 'react'
import Image from 'next/legacy/image'
import { Navbar } from '../components/Navbar'
import { doc } from '@/assets'
import Link from 'next/link'
import { atomUserRole } from "@/atoms/atomUserRole";
import { useRecoilState } from "recoil";
import useAccount from '@/hooks/useAccount';

const Document = () => {
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
            <Navbar menu={1} />
            <div className='w-full flex flex-col items-center'>
                <div className='w-[700px] flex flex-col mt-10 justify-around border-0'>
                    <p className='text-textPrimary font-kanit text-[24px]'>Why Data Important</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <Image src={doc} width={700} height={500} objectFit='corver' alt="doc" />
                        <p className='text-textGray text-[16px] mt-2'> Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of descriptionSome of descriptionSome of descriptionSome of descriptionSome of description</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5'>Cleansing Data</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <Image src={doc} width={700} height={500} objectFit='contain' alt="doc" />
                        <p className='text-textGray text-[16px] mt-2'> Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of descriptionSome of descriptionSome of descriptionSome of descriptionSome of description</p>
                    </div>

                    <p className='text-textPrimary font-kanit text-[24px] mt-5'>Profiling of Data</p>
                    <div className='w-[700px] mt-5 flex flex-col justify-center border-0'>
                        <Image src={doc} width={700} height={500} objectFit='corver' alt="doc" />
                        <p className='text-textGray text-[16px] mt-2'> Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of description Some of descriptionSome of descriptionSome of descriptionSome of descriptionSome of description</p>
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

export default Document