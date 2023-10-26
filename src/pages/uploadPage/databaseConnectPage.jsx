import React, { useState, useEffect } from "react";
import Image from 'next/legacy/image'
import Link from "next/link";
import { Navbar } from "../../components/Navbar";
import { databaseIcon, uploadIcon } from "@/assets";
import { root } from "postcss";

const DatabaseConnectPage = () => {
  const [data, setData] = useState(null);

  const [host, setHost] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [database, setDatabase] = useState('');
  const [table, setTable] = useState('');

  const handleHostChange = (e) => {
    setHost(e.target.value); // Update the state when the input changes
  };

  const handleUserChange = (e) => {
    setUser(e.target.value); // Update the state when the input changes
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Update the state when the input changes
  };

  const handleDatabaseChange = (e) => {
    setDatabase(e.target.value); // Update the state when the input changes
  };

  const handleTableChange = (e) => {
    setTable(e.target.value); // Update the state when the input changes
  };

  const handleConnect = async () => {
	console.log(host)
	console.log(user)
	console.log(password)
	console.log(database)
	console.log(table)
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
      setData(result.data);
    } else {
      // Handle the error
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="relative w-screen h-full">
      <Navbar />
      <div className="w-full flex flex-col items-center pb-20 ">
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
				<button onClick={handleConnect} className="px-16 py-2 mt-8 bg-primary hover:bg-hoverPrimary rounded-2xl text-white">ยืนยัน</button>
			</div>
		</div>
      </div>
    </div>
  );
};

export default DatabaseConnectPage;
