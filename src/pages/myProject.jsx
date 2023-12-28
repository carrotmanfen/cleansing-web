import React, {useState} from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link';
import { paper } from '@/assets'
import { Navbar } from '@/components/Navbar'
import { Projects } from '@/components/myProject/Projects'
import PopUpDeleteProject from '@/components/myProject/popUpDeleteProject';
import { atomUserRole } from "@/atoms/atomUserRole";
import { useRecoilValue } from "recoil";

const MyProject = () => {
    const [isPopUpDelete, setIsPopUpDelete] = useState(false)
    const user = useRecoilValue(atomUserRole)
    const handleDelete = () =>{
        setIsPopUpDelete(true);
    }
    const handleCanCelDelete = () =>{
        setIsPopUpDelete(false);
    }
    const handleDeleteProject = () =>{
        console.log("delete")
    }

    const mockData = [
        {
            projectName:"project1",
            fileName:"fileName.csv"
        },
        {
            projectName:"project1",
            fileName:"fileName.csv"
        },
        {
            projectName:"project1",
            fileName:"fileName.csv"
        },
        {
            projectName:"projecv2222211122222t1",
            fileName:"fileName.csv"
        },
        {
            projectName:"project1",
            fileName:"fileName.csv"
        },
        {
            projectName:"project1",
            fileName:"fileName.csv"
        },
        {
            projectName:"project1",
            fileName:"fileName.csv"
        },
        {
            projectName:"project1",
            fileName:"fileName.csv"
        }
    ]
  return (
    <div className="relative w-screen h-full">
        <Navbar menu={3}/>
        <PopUpDeleteProject isOpen={isPopUpDelete} onClickCancel={handleCanCelDelete} onClick={handleDeleteProject}/>    
        <div className='flex flex-col w-full px-16 justify-center'>
            <p className='font-kanit text-textPrimary text-[32px] text-center mt-10'>โปรเจกต์ของฉัน</p>
            <div className='grid grid-cols-4 gap-12 mt-16'>
                <div className='flex flex-col w-full h-full border-2 border-borderNavbar rounded-xl '>
                    <div className='flex flex-col py-4'>
                        <Image src={paper} alt='paper' objectFit='fill' width={100} height={100} />
                        <p className='font-kanit text-textPrimary text-[24px] w-full text-center'>สร้างโปรเจกท์ใหม่</p>
                    </div>
                    <Link href={"/uploadPage"}  className='font-kanit text-[24px] w-full text-center border-t border-borderNavbar py-4 flex flex-row justify-center px-6 bg-primary text-white rounded-b-lg hover:bg-hoverPrimary hover:cursor-pointer'>
                        <p className=''>
                           + อัปโหลด
                        </p>
                    </Link>
                </div>
                {user.project.map((data,index)=>{
                    console.log(data.project_name)
                    return(
                        <div key={index}>
                            <Projects projectId={data._id} projectName={data.project_name} fileName={data.file_name} onClick={handleDelete}/>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default MyProject