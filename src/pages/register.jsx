import React, { useState, useEffect } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { logo } from '@/assets'
import useAccount from '@/hooks/useAccount'
import Alert from '@mui/material/Alert';
import { atomUserRole } from "@/atoms/atomUserRole";
import { useRecoilState } from "recoil";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [notification, setNotification] = useState('');
  const [userRole, setUserRole] = useRecoilState(atomUserRole)
  const { isPending, register, refreshLogin, error, setError } = useAccount();

  const handleUsernameChange = (e) => {
    setError(false)
    setUsername(e.target.value); // Update the state when the input changes
    setNotification('');
  };

  const handlePasswordChange = (e) => {
    setError(false)
    setPassword(e.target.value); // Update the state when the input changes
    setNotification('');
  };

  const handleConfirmPassChange = (e) => {
    setError(false)
    setConfirmPass(e.target.value); // Update the state when the input changes
    setNotification('');
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    if (!username) {
      setNotification('กรุณาป้อนชื่อผู้ใช้งาน');
      return;
    }

    if (!password) {
      setNotification('กรุณาป้อนรหัสผ่าน');
      return;
    }

    if (!confirmPass) {
      setNotification('กรุณาป้อนยืนยันรหัสผ่าน');
      return;
    }

    if (password !== confirmPass) {
      setNotification('รหัสผ่านและรหัสยืนยันไม่ถูกต้อง กรุณาป้อนใหม่อีกครั้ง');
      return;
    }

    // If all validations pass, proceed with registration
    register(username, password);
  };

  useEffect(() => {
        
    if (userRole.isLogin === false) {
        const username = localStorage.getItem('username')
        if(username){
            refreshLogin(username)
        }
    }
  }, [userRole.isLogin,refreshLogin]);

  return (
    <div className="relative w-screen h-full">
      <div className="fixed top-4 z-50 left-1/2 transform -translate-x-1/2 w-1/2">
        {error &&
          <Alert severity="error" className="w-full font-kanit text-lg">
            บัญชีนี้ถูกใช้แล้ว
          </Alert>
        }
        {notification && <Alert severity="error" className="w-full font-kanit text-lg">{notification}</Alert>}
      </div>
      <div className="w-full flex flex-col items-center pb-20 ">
        <div className='mt-8'>
          <Image src={logo} width={150} height={200} objectFit='contain' alt="logo" />
        </div>
        <p className="text-[32px] text-textPrimary font-kanit mt-2">สมัครสมาชิก</p>
        <div className='w-[500px] flex flex-col gap-4 mt-5 justify-around font-kanit text-[24px]'>
          <p className="w-full text-left">ชื่อผู้ใช้งาน</p>
          <input
            type="text"
            className="w-full px-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:ring focus:border-primary"
            placeholder="คลีนเนอร์"
            value={username}
            onChange={handleUsernameChange}
            onKeyDown={handleEnterKeyPress}
          />

          <p className="w-full text-left">รหัสผ่าน</p>
          <input
            type="password"
            className="w-full px-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:ring focus:border-primary"
            placeholder="******"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleEnterKeyPress}
          />

          <p className="w-full text-left">ยืนยันรหัสผ่าน</p>
          <input
            type="password"
            className="w-full px-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:ring focus:border-primary"
            placeholder="******"
            value={confirmPass}
            onChange={handleConfirmPassChange}
            onKeyDown={handleEnterKeyPress}
          />
          <div className="flex flex-row w-full justify-between">
            <Link href={"/"}>
              <button className="px-16 py-2 mt-8 bg-gray hover:bg-textGray rounded-2xl">ยกเลิก</button>
            </Link>
            <button onClick={handleRegister} className="px-16 py-2 mt-8 bg-primary hover:bg-hoverPrimary rounded-2xl text-white">ยืนยัน</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register