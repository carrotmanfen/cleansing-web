import React,{useState} from 'react'
import Link from 'next/link'
import { logo, downloadIcon, arrowLeft, pencilIcon } from '@/assets'
import Image from 'next/legacy/image'

const NavbarMain = ({projectName, popup, disableButton, downloadOnClick}) => {
  return (
    <div className='w-screen flex flex-row justify-between sticky h-[80px] border-b-2 border-borderNavbar z-50 top-0 bg-white'>
            <div className='flex flex-row items-center gap-4 h-full font-kanit text-[20px] text-textPrimary pl-8'>
                <Link href={"/myProject"} className='h-full mt-4'>
                    <div className='flex flex-row'>
                        <Image src={arrowLeft} objectFit='contain' alt='arrow'/>
                        <Image src={logo} width={60} height={60} objectFit='contain' alt="logo" />
                    </div>
                </Link>
                <p className="pl-2 text-center">
                    {projectName}
                </p>
                <div onClick={popup} className={`px-2 rounded-md hover:border ${disableButton?`cursor-not-allowed`:``}`}>
                    <Image src={pencilIcon} width={15} height={15} objectFit='contain' alt='pencilIcon'/>
                </div>
            </div>
            <div className='flex flex-row items-center gap-8 h-full font-kanit text-[20px] pr-8'>
                <button onClick={downloadOnClick} className={`w-42 py-1 border-2 border-primary bg-primary rounded-2xl text-white hover:bg-hoverPrimary px-4 ${disableButton?`cursor-not-allowed`:``}`}>
                        <div className='flex flex-row gap-3 '>
                            <p>ดาวน์โหลด</p>
                            <Image src={downloadIcon} objectFit='contain' alt='download' />
                        </div>

                </button>
            </div>
        </div>
  )
}



export default NavbarMain