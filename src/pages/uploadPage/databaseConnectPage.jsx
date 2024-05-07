import React, { useState, useEffect } from "react";
import Image from 'next/legacy/image'
import Link from "next/link";
import { Navbar } from "../../components/Navbar";
import { databaseIcon, uploadIcon } from "@/assets";
import { root } from "postcss";
import useAddProject from '@/hooks/useAddProject';
import Alert from '@mui/material/Alert';
import { atomUserRole } from "@/atoms/atomUserRole";
import { useRecoilState } from "recoil";
import useAccount from '@/hooks/useAccount';

const DatabaseConnectPage = () => {
  const [host, setHost] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [database, setDatabase] = useState('');
  const [table, setTable] = useState('');
  const {error, setError, isPending, showLoading, hideLoading, createProject} = useAddProject()
  const [userRole, setUserRole] = useRecoilState(atomUserRole)
  const {refreshLogin} = useAccount()

  const handleHostChange = (e) => {
    setHost(e.target.value); // Update the state when the input changes
    setError(null)
  };

  const handleUserChange = (e) => {
    setUser(e.target.value); // Update the state when the input changes
    setError(null)
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update the state when the input changes
    setError(null)
  };

  const handleDatabaseChange = (e) => {
    setDatabase(e.target.value); // Update the state when the input changes
    setError(null)
  };

  const handleTableChange = (e) => {
    setTable(e.target.value); // Update the state when the input changes
    setError(null)
  };
  function convertStringsToNumbers(data, columnName) {
    // Check if all values in the column can be converted to a number
    if (data.every(row => !isNaN(Number(row[columnName])))) {
      // If so, convert them
      data.forEach(row => {
        row[columnName] = Number(row[columnName]);
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
      return 'string';
    }
}

  const handleConnect = async () => {
    console.log(host)
    console.log(user)
    console.log(password)
    console.log(database)
    console.log(table)
    showLoading()
    const response = await fetch("/api/connect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: host,
        user: user,
        password: password,
        database: database,
        table: table,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.data);
      const columns = Object.keys(result.data[0]);
      console.log(columns)
      const transformedColumns = columns.map(label => ({
        label: label,
        dataKey: label,
        type: determineColumnType(result.data.map(row => row[label])),
      }));
      columns.map(column => {
        convertStringsToNumbers(result.data, column);
        });
      console.log(transformedColumns)
      await createProject(transformedColumns, result.data, table, database)
      hideLoading()
    } else {
      // Handle the error
      hideLoading()
      setError(true)
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
    <div className="relative w-screen h-full">
      <Navbar />
      <div className="w-full flex flex-col items-center pb-20 ">
      {error && <div className='w-full flex justify-center absolute mt-24'>
                    <Alert severity="error" className='w-1/2 font-kanit text-[16px]'>เกิดข้อผิดพลาด - ข้อมูลฐานข้อมูลไม่ถูกต้องหรือเซิฟเวอร์ไม่ตอบสนอง</Alert>
                </div>}
        <p className="text-[32px] text-textPrimary font-kanit mt-8">เชื่อมฐานข้อมูล</p>
        <div className='w-[500px] flex flex-col gap-4 mt-8 justify-around font-kanit text-[24px]'>
          <p className="w-full text-left">Host<span className="text-primaryRed"> *</span></p>
          <input
            type="text"
            className="w-full px-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:ring focus:border-primary"
            placeholder="localhost"
            value={host}
            onChange={handleHostChange}
          />

          <p className="w-full text-left">User<span className="text-primaryRed"> *</span></p>
          <input
            type="text"
            className="w-full px-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:ring focus:border-primary"
            placeholder="root"
            value={user}
            onChange={handleUserChange}
          />

          <p className="w-full text-left">Password</p>
          <input
            type="password"
            className="w-full px-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:ring focus:border-primary"
            placeholder="*******"
            value={password}
            onChange={handlePasswordChange}
          />

          <p className="w-full text-left">Database<span className="text-primaryRed"> *</span></p>
          <input
            type="text"
            className="w-full px-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:ring focus:border-primary"
            placeholder="Database Name"
            value={database}
            onChange={handleDatabaseChange}
          />

          <p className="w-full text-left">Table<span className="text-primaryRed"> *</span></p>
          <input
            type="text"
            className="w-full px-4 py-2 border-2 border-primary rounded-lg focus:outline-none focus:ring focus:border-primary"
            placeholder="root"
            value={table}
            onChange={handleTableChange}
          />

          <div className="flex flex-row w-full justify-between">
            <Link href={"/uploadPage"}>
              <button className="px-16 py-2 mt-8 bg-gray hover:bg-textGray rounded-2xl">ยกเลิก</button>
            </Link>
            <button 
                onClick={handleConnect} 
                className={`px-16 py-2 mt-8 rounded-2xl  ${host && user && database && table ? 'bg-primary hover:bg-hoverPrimary text-white' : 'bg-gray cursor-not-allowed text-textPrimary'}`}
                disabled={!host || !user || !database || !table}
            >
                    ยืนยัน
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseConnectPage;