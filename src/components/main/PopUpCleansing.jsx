import React, {useState} from 'react';
import Image from 'next/legacy/image';
import { afterArrow, arrowLeftWhite } from '@/assets';
import { useRouter } from 'next/router';

const PopUpCleansing = ({ isOpen, close, columns }) => {
    const [cleanMenu, setCleanMenu] = useState(1)
    const router = useRouter()
    const [checkedItems, setCheckedItems] = useState(Array(columns.length).fill(false));
    const [cleanMethod, setMethod] = useState("")
    const handleCheckboxChange = (index) => {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      setCheckedItems(newCheckedItems);
      console.log(newCheckedItems)
    };
  
    const isAnyCheckboxChecked = checkedItems.some((isChecked) => isChecked);
  
    const [numberFill, setNumberFill] = useState("")

    const handleConfirm = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const searchProjectId = queryParams.get('projectId');
        const columnSelect = new Array()
        checkedItems.map((check,index)=>{
            if(check){
                columnSelect.push(columns[index].label)
            }
        })
        router.push("/main/confirmClean?projectId="+searchProjectId+"&clean="+cleanMethod+"&column="+columnSelect)
    }


  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-screen h-screen bg-black bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none font-kanit text-textPrimary">
      <div className="relative w-1/3 mx-auto my-6 max-h-screen">
        {/* Modal content */}
        <div className="relative flex flex-col w-full bg-white border-2 border-gray rounded-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 rounded-t bg-primary">
            {cleanMenu==1?<h3 className="text-[20px] text-white">ทำความสะอาดข้อมูล</h3>
            :cleanMenu==2?<div onClick={()=>setCleanMenu(1)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">จัดการข้อมูลที่ขาดหายไป (Managing Null Values)</h3>
            </div>
            :cleanMenu==3?<div onClick={()=>setCleanMenu(2)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">เติมด้วยค่าที่กำหนดเอง</h3>
            </div>
            :
            <div onClick={()=>setCleanMenu(1)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">เลือกคอลัมน์ที่จะทำความสะอาดข้อมูลเลือกคอลัมน์ที่จะทำความสะอาดข้อมูล</h3>
            </div>
            }
            <button onClick={close} className='text-[24px] text-white h-full px-3 text-center hover:text-black'>
                X
            </button>
          </div>
          {/* Body */}
          {cleanMenu==1?<div className="relative flex-auto">
            <div onClick={()=>{setCleanMenu(5); setCheckedItems(Array(columns.length).fill(false)); setMethod("1");}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>ลบคอลัมน์ข้อมูลที่ไม่เกี่ยวข้อง (Delete Irrelevant Data)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>ลบคอลัมน์ที่ไม่จำเป็นในการนำไปประมวลผลออก เพื่อเป็นการลดขนาดของชุดข้อมูล</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>

            <div onClick={()=>{setCleanMenu(5); setCheckedItems(Array(columns.length).fill(false)); setMethod("2")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>ลบข้อมูลที่ซ้ำซ้อน (Delete Duplicate Data)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>ลบแถวข้อมูลที่มีข้อมูลทุกตัวซ้ำกับแถวอื่น</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>

            <div onClick={()=>{setCleanMenu(5); setCheckedItems(Array(columns.length).fill(false)); setMethod("3")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>แก้ไขข้อมูลที่ผิดปกติ</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>กับลบค่าว่างคือการลบข้อมูลค่าว่างคือการลบข้อมูลค่าว่าง</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
            <div onClick={()=>{setCleanMenu(2); setMethod("4")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>จัดการข้อมูลที่ขาดหายไป (Managing Null Values)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>เติมข้อมูลหรือตัดแถวข้อมูลที่มีค่าว่าง</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>

            <div onClick={()=>{setCleanMenu(5); setCheckedItems(Array(columns.length).fill(false)); setMethod("5")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>เปลี่ยนค่าวันที่ให้เป็นมาตรฐาน (Standardize Date Columns)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>ใช้มาตรฐาน ISO 8601 (“ปปปป-ดด-วว”)</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
            <div onClick={()=>{setCleanMenu(5); setCheckedItems(Array(columns.length).fill(false)); setMethod("6")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>เปลี่ยนข้อมูลประเภท กลุ่ม ที่มีจำนวนน้อย เป็น “อื่น ๆ” 
(Replace Excess Categories with “Other”)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>จัดกลุ่มชุดข้อมูลตามประเภทของข้อมูล กลุ่มข้อมูลที่มีจำนวนน้อยกว่าที่กำหนดจะเปลี่ยนเป็นกลุ่ม “อื่นๆ”</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>


            <div onClick={()=>{setCleanMenu(5); setCheckedItems(Array(columns.length).fill(false)); setMethod("7")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>นำข้อมูลที่ไม่ตรงกับประเภทข้อมูล (Remove Unreadable Columns)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>ลบแถวข้อมูลที่มีข้อมูลไม่ตรงกับ Column ที่กำหนด</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>

            <div onClick={()=>{setCleanMenu(5); setCheckedItems(Array(columns.length).fill(false)); setMethod("8")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>ระบุค่าผิดปกติทางสถิติ (Flag Outliers)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>ทำการสร้างคอลัมน์ใหม่หากมีค่าผิดปกติจะระบุค่าเป็น 1 หาไม่มีจะระบุค่าเป็น 0</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>

            <div onClick={()=>{setCleanMenu(5); setCheckedItems(Array(columns.length).fill(false)); setMethod("9")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>เปลี่ยนค่าผิดปกติทางสถิติ (Clamp Outliers)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>เปลี่ยนค่าผิดปกติทางสถิติเป็นค่าที่อยู่ในช่วงแทน</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>

            <div onClick={()=>{setCleanMenu(5); setCheckedItems(Array(columns.length).fill(false)); setMethod("10")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>ลบค่าผิดปกติทางสถิติ (Delete Outliers)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>นำแถวข้อมูลที่มีค่าผิดปกติทางสถิติออก</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
          </div>
          :cleanMenu==2?<div className="relative flex-auto">
            <div onClick={()=>{setCleanMenu(5); setCheckedItems(Array(columns.length).fill(false));}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar hover:bg-gray cursor-pointer'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>เติมข้อมูลด้วยค่าเฉลี่ย</p>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
            <div onClick={()=>{setCleanMenu(5); setCheckedItems(Array(columns.length).fill(false));}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar hover:bg-gray cursor-pointer'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>เติมข้อมูลด้วยค่ามัธยฐาน</p>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
            <div onClick={()=>setCleanMenu(3)} className='flex pl-12 flex-row justify-between border-b border-borderNavbar hover:bg-gray cursor-pointer'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>เติมด้วยค่าที่กำหนดเอง</p>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
            <div onClick={()=>{setCleanMenu(5); setCheckedItems(Array(columns.length).fill(false));}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar hover:bg-gray cursor-pointer'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>ตัดข้อมูลทิ้ง</p>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
          </div>
          :cleanMenu==3?
          <div className='flex pl-12 flex-col justify-center border-b border-borderNavbar cursor-pointer py-4 gap-4'>
            <p className='text-[20px] font-kanit text-textPrimary'>ใส่ตัวเลข</p>
            <div className='flex flex-row gap-8'>
                <input type='number' value={numberFill} className='text-start text-[20px] text-textPrimary border-2 w-full rounded-md px-3'
                onChange={(e)=>setNumberFill(e.target.value)}/>
                <div className='flex items-center mr-8'>
                    <button 
                    onClick={()=>{
                        if(numberFill!=""){
                            setCleanMenu(5); 
                            setCheckedItems(Array(columns.length).fill(false));
                        }
                    }} 
                    className='text-[20px] font-kanit bg-primary rounded-md py-2 px-4 text-white'>ยืนยัน</button>
                </div>
            </div>
          </div>
          :cleanMenu==5?
          <div className='flex flex-col'>
              {columns.map((column, index)=>{
                return(
                    <label key={index} className='flex flex-row w-full justify-between items-center gap-2 hover:cursor-pointer border-b border-borderNavbar p-3 hover:bg-gray'>
                        <input type="checkbox" checked={checkedItems[index]} onChange={() => handleCheckboxChange(index)} className='hover:cursor-pointer'/>
                        <p className='w-full text-[20px] font-kanit text-textPrimary'>{column.label}</p>
                    </label>
                )
              })}
            <div className='w-full flex items-center justify-end p-4'>
              <button onClick={handleConfirm} disabled={!isAnyCheckboxChecked} className={`text-[20px] font-kanit  px-6 py-2 rounded-lg ${isAnyCheckboxChecked?`bg-primary text-white hover:bg-hoverPrimary`:`bg-gray hover:cursor-not-allowed`} `}>ถัดไป <span className='ml-4'>{"->"}</span></button>
            </div>
          </div>
          
          :<p></p>}
        </div>
      </div>
    </div>
  );
};

export default PopUpCleansing;
