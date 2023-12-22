import React, { useState, useEffect } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { logo } from '@/assets'
import useAccount from '@/hooks/useAccount'
import { useRecoilState } from "recoil";
import { atomUserRole } from "@/atoms/atomUserRole";
import { useRouter } from "next/router";

const Login = () => {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router= useRouter()
  const {isPending, login} = useAccount()

  const [userRole, setUserRole] = useRecoilState(atomUserRole)

  const handleUsernameChange = (e) => {
    setUsername(e.target.value); // Update the state when the input changes
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update the state when the input changes
  };

  const handleLogin = async()=>{
    if(password&&username){
        await login(username, password)
        
        // router.push('/myProject')
        
    }else{
        console.log("Please fill all attribute")
    }
  }

  return (
    <div className="relative w-screen h-full">
      <div className="w-full flex flex-col items-center pb-20 ">
        <div className='mt-8'>
          <Image src={logo} width={150} height={200} objectFit='contain' alt="logo" />
        </div>
        <p className="text-[32px] text-textPrimary font-kanit mt-2">เข้าสู่ระบบ</p>
        <div className='w-[500px] flex flex-col gap-4 mt-5 justify-around font-kanit text-[24px]'>
          <p className="w-full text-left">ชื่อผู้ใช้งาน</p>
          <input
            type="text"
            className="w-full px-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:ring focus:border-primary"
            placeholder="คลีนเนอร์"
            value={username}
            onChange={handleUsernameChange}
          />

          <p className="w-full text-left">รหัสผ่าน</p>
          <input
            type="password"
            className="w-full px-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:ring focus:border-primary"
            placeholder="******"
            value={password}
            onChange={handlePasswordChange}
          />

          <div className="flex flex-row w-full justify-between">
            <Link href={"/"}>
              <button className="px-16 py-2 mt-8 bg-gray hover:bg-textGray rounded-2xl">ยกเลิก</button>
            </Link>
            <button onClick={handleLogin} className="px-16 py-2 mt-8 bg-primary hover:bg-hoverPrimary rounded-2xl text-white">ยืนยัน</button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login