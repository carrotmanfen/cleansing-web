import React, {useState} from 'react';
import Image from 'next/legacy/image';
import { afterArrow, arrowLeftWhite } from '@/assets';
import { useRouter } from 'next/router';
import useCleansing from "@/hooks/useCleansing";

const PopUpCleansing = ({ isOpen, close, columns, rows }) => {
    const [cleanMenu, setCleanMenu] = useState(1)
    const router = useRouter()
    const [checkedItems, setCheckedItems] = useState(Array(columns.length).fill(false));
    const [cleanMethod, setMethod] = useState("")
    const {data3, getDataMethod3} = useCleansing()
    const [option4, setOption4] = useState("hello")
    const [selectColumn3, setSelectColumn3] = useState("")
    const [radio3, setRadio3] = useState("")
    const [delimiter, setDelimiter] = useState("")
    const [column1, setColumn1] = useState("")
    const [column2, setColumn2] = useState("")
    const handleCheckboxChange = (index) => {
      const newCheckedItems = [...checkedItems];
      newCheckedItems[index] = !newCheckedItems[index];
      setCheckedItems(newCheckedItems);
      console.log(newCheckedItems)
    };
    const handleCheckboxChangeOnly2 = (index) => {
        const newCheckedItems = [...checkedItems];
        
        // Count the number of checked items
        const checkedCount = newCheckedItems.filter((item) => item).length;
      
        // If already two items are checked, prevent further changes
        if (checkedCount === 2 && !newCheckedItems[index]) {
          return;
        }
      
        // Toggle the checkbox
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);
        console.log(newCheckedItems);
      };
    const handleRadio3Check = (value) =>{
        setRadio3(value)
    }
    
    const isAnyCheckboxChecked = checkedItems.some((isChecked) => isChecked);
  
    const [numberFill, setNumberFill] = useState("")

    const handleClose = () =>{
        close()
        setNumberFill("")
        setCleanMenu(1)
        setSelectColumn3("")
        setOption4("")
    }

    function removeNaN(arr) {
        // Filter out the NaN values
        let filteredArr = arr.filter(item => !isNaN(item));
    
        return filteredArr;
    }
    
    const handleMethod3 = async() =>{
        const dataSet = {
            columns:columns,
            rows:rows,
            columns_match:radio3
        }
        await getDataMethod3(dataSet)
        setCleanMenu(8)
    }

    const handleConfirm = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const searchProjectId = queryParams.get('projectId');
        const columnSelect = new Array()
        checkedItems.map((check,index)=>{
            if(check){
                columnSelect.push(columns[index].dataKey)
            }
        })
        if(cleanMethod==3){
            router.push("/main/confirmClean?projectId="+searchProjectId+"&clean="+cleanMethod+"&column="+radio3+"&oldValue="+selectColumn3+"&newValue="+numberFill)
        }else if(cleanMethod==4){
            router.push("/main/confirmClean?projectId="+searchProjectId+"&clean="+cleanMethod+"&column="+columnSelect+"&orderSelect="+option4)
        }else if(cleanMethod==5){
            router.push("/main/confirmClean?projectId="+searchProjectId+"&clean="+cleanMethod+"&column="+radio3+"&delimiter="+delimiter+"&columnName1="+column1+"&columnName2="+column2)
        }else if(cleanMethod==55){
            router.push("/main/confirmClean?projectId="+searchProjectId+"&clean="+cleanMethod+"&column="+columnSelect+"&delimiter="+delimiter+"&columnNewName="+column1)
        }else if(cleanMethod==10){
            router.push("/main/confirmClean?projectId="+searchProjectId+"&clean="+cleanMethod+"&column="+columnSelect+"&order="+numberFill)
        }
        else{
            router.push("/main/confirmClean?projectId="+searchProjectId+"&clean="+cleanMethod+"&column="+columnSelect)
        }
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
            :cleanMenu==2?<div onClick={()=>setCleanMenu(9)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">จัดการข้อมูลที่ขาดหายไป (Managing Null Values)</h3>
            </div>
            :cleanMenu==3?<div onClick={()=>setCleanMenu(2)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                {option4=="fillManual"?<h3 className="text-[20px] text-white group-hover:underline">เติมด้วยค่าที่กำหนดเอง</h3>:<h3 className="text-[20px] text-white group-hover:underline">เติมด้วยค่าทางสถิติ</h3>}
            </div>
            :cleanMenu==4?
            <div onClick={()=>setCleanMenu(1)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">ลบข้อมูลที่ซ้ำซ้อน</h3>
            </div>
            :cleanMenu==6?
            <div onClick={()=>setCleanMenu(1)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">แก้ไขข้อมูลที่ผิดปกติ</h3>
            </div>
            :
            cleanMenu==7?
            <div onClick={()=>{setCleanMenu(8); setNumberFill("")}} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">เติมข้อมูลรูปแบบใหม่</h3>
            </div>
            :cleanMenu==8?
            <div onClick={()=>{setCleanMenu(6); setNumberFill("")}} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">เลือกข้อมูลเฉพาะทั้งหมด</h3>
            </div>
            :cleanMenu==11?
            <div onClick={()=>{setCleanMenu(10); setNumberFill("")}} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">เลือกฟังก์ชันที่ต้องการเปลี่ยนค่าทางสถิติ</h3>
            </div>
            :cleanMenu==12?
            <div onClick={()=>setCleanMenu(11)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">เติมด้วยค่ามากที่สุดและน้อยที่สุด</h3>
            </div>
            :cleanMenu==13?
            <div onClick={()=>setCleanMenu(11)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">เติมด้วยค่าที่กำหนดเอง</h3>
            </div>
            :cleanMenu==15?
            <div onClick={()=>setCleanMenu(14)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">กรอกข้อมูลให้ครบถ้วน</h3>
            </div>
            
            :cleanMenu==16?
            <div onClick={()=>setCleanMenu(1)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">เลือกคอลัมน์ที่ต้องการเชื่อม (เลือก 2 คอลัมน์)</h3>
            </div>
            :cleanMenu==17?
            <div onClick={()=>setCleanMenu(16)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">กรอกข้อมูลให้ครบถ้วน</h3>
            </div>
            
            :
            <div onClick={()=>setCleanMenu(1)} className='flex flex-row group hover:cursor-pointer'>
                <div className='flex items-center mr-8'>
                    <Image src={arrowLeftWhite} alt='arrow' objectFit='contain'/>
                </div>
                <h3 className="text-[20px] text-white group-hover:underline">เลือกคอลัมน์ที่จะทำความสะอาดข้อมูล</h3>
            </div>
            }
            <button onClick={handleClose} className='text-[24px] text-white h-full px-3 text-center hover:text-black'>
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

            <div onClick={()=>{setCleanMenu(4); setCheckedItems(Array(columns.length).fill(false)); setMethod("2")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>ลบข้อมูลที่ซ้ำซ้อน (Delete Duplicate Data)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>ลบแถวข้อมูลที่มีข้อมูลทุกตัวซ้ำกับแถวอื่น</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>

            <div onClick={()=>{setCleanMenu(6); setCheckedItems(Array(columns.length).fill(false)); setMethod("3")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>แก้ไขข้อมูลที่ไม่สอดคล้อง (Edit Inconsistant Data)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>แก้ไขข้อมูลเดียวกันที่บันทึกไม่เหมือนกัน เช่น "กทม." , "กรุงเทพ" ให้เป็นรูปแบบเดียวกัน</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
            <div onClick={()=>{setCleanMenu(9); setMethod("4")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>จัดการข้อมูลที่ขาดหายไป (Managing Null Values)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>เติมข้อมูลหรือตัดแถวข้อมูลที่มีค่าว่าง</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>

            <div onClick={()=>{setCleanMenu(14); setCheckedItems(Array(columns.length).fill(false)); setMethod("5")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>แยกคอลัมน์ (Split Column)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>แยกโดยใช้ตัวแบ่ง (Delimiter)</p>
                </div>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
            <div onClick={()=>{setCleanMenu(16); setCheckedItems(Array(columns.length).fill(false)); setMethod("55")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
                <div className='flex flex-col'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>รวมคอลัมน์ (Merge Column)</p>
                    <p className='text-[16px] text-textGray cursor-pointer'>ทำการรวมคอลัมน์ 2 คอลัมน์โดยมีตัวเชื่อม (Connector)</p>
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
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>นำข้อมูลที่ไม่ตรงกับประเภทข้อมูลออก (Remove Unreadable Columns)</p>
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

            <div onClick={()=>{setCleanMenu(10); setCheckedItems(Array(columns.length).fill(false)); setMethod("10")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar pb-2 hover:bg-gray cursor-pointer'>
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
            <div onClick={()=>{setOption4("mean");  setCleanMenu(3)}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar hover:bg-gray cursor-pointer'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>เติมข้อมูลด้วยค่าเฉลี่ย</p>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
            <div onClick={()=>{setOption4("median");  setCleanMenu(3)}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar hover:bg-gray cursor-pointer'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>เติมข้อมูลด้วยค่ามัธยฐาน</p>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
            <div onClick={()=>{setCleanMenu(3); setOption4("fillManual");}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar hover:bg-gray cursor-pointer'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>เติมด้วยค่าที่กำหนดเอง</p>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
            <div onClick={()=>{setOption4("remove");  setCleanMenu(3)}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar hover:bg-gray cursor-pointer'>
                    <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>ตัดข้อมูลทิ้ง</p>
                <div className='flex items-center mr-8'>
                    <Image src={afterArrow} alt='arrow' objectFit='fill'/>
                </div>
            </div>
          </div>
          :cleanMenu==3&&option4=="mean"?
          <div className='flex pl-12 flex-col justify-center border-b border-borderNavbar py-4 gap-4'>
            <div className='flex flex-row gap-8'>
                <p className='text-[20px] font-kanit text-textPrimary'>ระบบจำทำการคำนวณค่าและแทนที่ข้อมูลโดยอัตโนมัติ</p>
                <div className='flex items-center mr-8'>
                    <button 
                    onClick={()=>{
                        handleConfirm()
                    }} 
                    className='text-[20px] font-kanit bg-primary rounded-md py-2 px-4 text-white'>ยืนยัน</button>
                </div>
            </div>
          </div>
          :cleanMenu==3&&option4=="median"?
          <div className='flex pl-12 flex-col justify-center border-b border-borderNavbar py-4 gap-4'>
            <div className='flex flex-row gap-8'>
                <p className='text-[20px] font-kanit text-textPrimary'>ระบบจำทำการคำนวณค่าและแทนที่ข้อมูลโดยอัตโนมัติ</p>
                <div className='flex items-center mr-8'>
                    <button 
                    onClick={()=>{
                        handleConfirm()
                    }} 
                    className='text-[20px] font-kanit bg-primary rounded-md py-2 px-4 text-white'>ยืนยัน</button>
                </div>
            </div>
          </div>
          :cleanMenu==3&&option4=="remove"?
          <div className='flex pl-12 flex-col justify-center border-b border-borderNavbar py-4 gap-4'>
            <div className='flex flex-row gap-8'>
                <p className='text-[20px] font-kanit text-textPrimary'>ระบบจำทำการคำนวณค่าและแทนที่ข้อมูลโดยอัตโนมัติ</p>
                <div className='flex items-center mr-8'>
                    <button 
                    onClick={()=>{
                        handleConfirm()
                    }} 
                    className='text-[20px] font-kanit bg-primary rounded-md py-2 px-4 text-white'>ยืนยัน</button>
                </div>
            </div>
          </div>
          :cleanMenu==3?
          <div className='flex pl-12 flex-col justify-center border-b border-borderNavbar py-4 gap-4'>
            <p className='text-[20px] font-kanit text-textPrimary'>ใส่ข้อมูล</p>
            <div className='flex flex-row gap-8'>
                <input type='text' value={numberFill} className='text-start text-[20px] text-textPrimary border-2 w-full rounded-md px-3'
                onChange={(e)=>{setNumberFill(e.target.value); setOption4(e.target.value)}}/>
                <div className='flex items-center mr-8'>
                    <button 
                    onClick={()=>{
                        if(numberFill!=""){
                            handleConfirm()
                        }
                    }} 
                    className={`text-[20px] font-kanit rounded-md py-2 px-4 text-white ${numberFill!=""?`bg-primary hover:bg-hoverPrimary`:`bg-gray hover:cursor-not-allowed`}`}>ยืนยัน</button>
                </div>
            </div>
          </div>
          :cleanMenu==4?
          <div className='flex pl-12 flex-col justify-center border-b border-borderNavbar cursor-pointer py-4 gap-4'>
            <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>การทำความสะอาดด้วยวิธีนี้จะลบแถวที่มีคอลัมน์ซ้ำกันทุกแถวโดยอัตโนมัติ</p>
            <div className='w-full flex items-center justify-end p-4'>
              <button onClick={handleConfirm} className={`text-[20px] font-kanit  px-6 py-2 rounded-lg bg-primary text-white hover:bg-hoverPrimary`}>ถัดไป <span className='ml-4'>{"->"}</span></button>
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
          
          :cleanMenu==6?
          <div className='flex flex-col'>
              {columns.map((column, index) => (
                <label key={index} className='flex flex-row w-full justify-between items-center gap-2 hover:cursor-pointer border-b border-borderNavbar p-3 hover:bg-gray'>
                    <input
                    type='radio'
                    name='radioGroup'  
                    onChange={() => handleRadio3Check(column.dataKey)}
                    className='hover:cursor-pointer'
                    />
                    <p className='w-full text-[20px] font-kanit text-textPrimary'>{column.label}</p>
                </label>
                ))}
            <div className='w-full flex items-center justify-end p-4'>
              <button onClick={handleMethod3} disabled={!radio3} className={`text-[20px] font-kanit  px-6 py-2 rounded-lg ${radio3?`bg-primary text-white hover:bg-hoverPrimary`:`bg-gray hover:cursor-not-allowed`} `}>ถัดไป <span className='ml-4'>{"->"}</span></button>
            </div>
          </div>
          
          :cleanMenu==7?
          <div className='flex pl-12 flex-col justify-center border-b border-borderNavbar py-4 gap-4'>
            <p className='text-[20px] font-kanit text-textPrimary'>ใส่ข้อมูล {radio3}</p>
            <div className='flex flex-row gap-8'>
                <input type='text' value={numberFill} className='text-start text-[20px] text-textPrimary border-2 w-full rounded-md px-3'
                onChange={(e)=>setNumberFill(e.target.value)}/>
                <div className='flex items-center mr-8'>
                    <button 
                    onClick={()=>{
                        if(numberFill!=""){
                            handleConfirm()
                        }
                    }} 
                    className={`text-[20px] font-kanit rounded-md py-2 px-4 text-white ${numberFill!=""?`bg-primary hover:bg-hoverPrimary`:`bg-gray hover:cursor-not-allowed`}`}>ยืนยัน</button>
                </div>
            </div>
          </div>
          :cleanMenu==8?
          <div className='flex flex-col'>
              {data3.map((column, index) => (
                <label key={index} className='flex flex-row w-full justify-between items-center gap-2 hover:cursor-pointer border-b border-borderNavbar p-3 hover:bg-gray'>
                    <input
                    type='radio'
                    name='radioGroupFor3'
                    checked={selectColumn3 === column}
                    onChange={() => {setSelectColumn3(column); console.log(column)}}
                    className='hover:cursor-pointer'
                    />
                    <p className='w-full text-[20px] font-kanit text-textPrimary'>{column}</p>
                </label>
                ))}
            <div className='w-full flex items-center justify-end p-4'>
              <button onClick={() => {setCleanMenu(7)}} disabled={!selectColumn3} className={`text-[20px] font-kanit  px-6 py-2 rounded-lg ${selectColumn3?`bg-primary text-white hover:bg-hoverPrimary`:`bg-gray hover:cursor-not-allowed`} `}>ถัดไป <span className='ml-4'>{"->"}</span></button>
            </div>
          </div>
          :cleanMenu==9?
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
              <button onClick={()=>setCleanMenu(2)} disabled={!isAnyCheckboxChecked} className={`text-[20px] font-kanit  px-6 py-2 rounded-lg ${isAnyCheckboxChecked?`bg-primary text-white hover:bg-hoverPrimary`:`bg-gray hover:cursor-not-allowed`} `}>ถัดไป <span className='ml-4'>{"->"}</span></button>
            </div>
          </div>
          :cleanMenu==10?<div className='flex flex-col'>
          {columns.map((column, index)=>{
            return(
                <label key={index} className='flex flex-row w-full justify-between items-center gap-2 hover:cursor-pointer border-b border-borderNavbar p-3 hover:bg-gray'>
                    <input type="checkbox" checked={checkedItems[index]} onChange={() => handleCheckboxChange(index)} className='hover:cursor-pointer'/>
                    <p className='w-full text-[20px] font-kanit text-textPrimary'>{column.label}</p>
                </label>
            )
          })}
        <div className='w-full flex items-center justify-end p-4'>
          <button onClick={()=>setCleanMenu(11)} disabled={!isAnyCheckboxChecked} className={`text-[20px] font-kanit  px-6 py-2 rounded-lg ${isAnyCheckboxChecked?`bg-primary text-white hover:bg-hoverPrimary`:`bg-gray hover:cursor-not-allowed`} `}>ถัดไป <span className='ml-4'>{"->"}</span></button>
        </div>
      </div>
      
      :cleanMenu==11?
      <div className="relative flex-auto">
          <div onClick={()=>{ setCleanMenu(12); setNumberFill("clamp")}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar hover:bg-gray cursor-pointer'>
                  <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>เปลี่ยนเป็นค่ามากที่สุดหรือน้อยที่สุดที่ไม่ผิดปกติทางสถิติ</p>
              <div className='flex items-center mr-8'>
                  <Image src={afterArrow} alt='arrow' objectFit='fill'/>
              </div>
          </div>
          <div onClick={()=>{ setCleanMenu(13)}} className='flex pl-12 flex-row justify-between border-b border-borderNavbar hover:bg-gray cursor-pointer'>
                  <p className=' w-full py-2 text-start text-[20px] text-textPrimary'>เปลี่ยนเป็นค่าที่ผู้ใช้ต้องการ</p>
              <div className='flex items-center mr-8'>
                  <Image src={afterArrow} alt='arrow' objectFit='fill'/>
              </div>
          </div>
          
        </div>
        :cleanMenu==12?
        <div className='flex pl-12 flex-col justify-center border-b border-borderNavbar py-4 gap-4'>
            <div className='flex flex-row gap-8'>
                <p className='text-[20px] font-kanit text-textPrimary'>ระบบจำทำการคำนวณค่าและแทนที่ข้อมูลโดยอัตโนมัติ</p>
                <div className='flex items-center mr-8'>
                    <button 
                    onClick={()=>{
                        handleConfirm()
                    }} 
                    className='text-[20px] font-kanit bg-primary rounded-md py-2 px-4 text-white'>ยืนยัน</button>
                </div>
            </div>
          </div>
        :cleanMenu==13?
        <div className='flex pl-12 flex-col justify-center border-b border-borderNavbar py-4 gap-4'>
            <p className='text-[20px] font-kanit text-textPrimary'>ใส่ข้อมูล</p>
            <div className='flex flex-row gap-8'>
                <input type='text' value={numberFill} className='text-start text-[20px] text-textPrimary border-2 w-full rounded-md px-3'
                onChange={(e)=>{setNumberFill(e.target.value); setOption4(e.target.value)}}/>
                <div className={`flex items-center mr-8 `}>
                    <button 
                    onClick={()=>{
                        if(numberFill!=""){
                            handleConfirm()
                        }
                    }} 
                    className={`text-[20px] font-kanit rounded-md py-2 px-4 text-white ${numberFill!=""?`bg-primary hover:bg-hoverPrimary`:`bg-gray hover:cursor-not-allowed`}`}>ยืนยัน</button>
                </div>
            </div>
          </div>
      :cleanMenu==14?
      <div className='flex flex-col'>
              {columns.map((column, index) => (
                <label key={index} className='flex flex-row w-full justify-between items-center gap-2 hover:cursor-pointer border-b border-borderNavbar p-3 hover:bg-gray'>
                    <input
                    type='radio'
                    name='radioGroup'  
                    onChange={() => handleRadio3Check(column.dataKey)}
                    className='hover:cursor-pointer'
                    />
                    <p className='w-full text-[20px] font-kanit text-textPrimary'>{column.label}</p>
                </label>
                ))}
            <div className='w-full flex items-center justify-end p-4'>
              <button onClick={()=>setCleanMenu(15)} disabled={!radio3} className={`text-[20px] font-kanit  px-6 py-2 rounded-lg ${radio3?`bg-primary text-white hover:bg-hoverPrimary`:`bg-gray hover:cursor-not-allowed`} `}>ถัดไป <span className='ml-4'>{"->"}</span></button>
            </div>
          </div>
          :cleanMenu==15?
          <div className='flex px-12 flex-col justify-center border-b border-borderNavbar py-4 gap-4'>
          <div className='flex flex-col gap-8 items-start'>
              <div className='flex flex-col w-full'>
                <p className='text-[20px] font-kanit text-textPrimary'>แบ่งโดยใช้ (เช่น , : _ -)</p>
                <input type='text' value={delimiter} className='text-start text-[20px] text-textPrimary border-2 w-full rounded-md px-3'
                onChange={(e)=>{const inputValue = e.target.value.slice(0, 1); 
                setDelimiter(inputValue);
                setOption4(inputValue);}}/>
              </div>
              <div className='flex flex-col w-full'>
                <p className='text-[20px] font-kanit text-textPrimary'>ชื่อของคอลัมน์ที่ 1</p>
                <input type='text' value={column1} className='text-start text-[20px] text-textPrimary border-2 w-full rounded-md px-3'
                onChange={(e)=>{setColumn1(e.target.value); }}/>
              </div>
              <div className='flex flex-col w-full'>
                <p className='text-[20px] font-kanit text-textPrimary'>ชื่อของคอลัมน์ที่ 2</p>
                <input type='text' value={column2} className='text-start text-[20px] text-textPrimary border-2 w-full rounded-md px-3'
                onChange={(e)=>{setColumn2(e.target.value); }}/>
              </div>
              <div className={`flex w-full justify-end`}>
                  <button 
                  onClick={()=>{
                      if(delimiter!=""&&column1!=""&&column2!=""){
                          handleConfirm()
                      }
                  }} 
                  className={`text-[20px] font-kanit rounded-md py-2 px-4 text-white ${delimiter!=""&&column1!=""&&column2!=""?`bg-primary hover:bg-hoverPrimary`:`bg-gray hover:cursor-not-allowed`}`}>ยืนยัน</button>
              </div>
          </div>
        </div>

          :cleanMenu==16?
          <div className='flex flex-col'>
              {columns.map((column, index)=>{
                return(
                    <label key={index} className='flex flex-row w-full justify-between items-center gap-2 hover:cursor-pointer border-b border-borderNavbar p-3 hover:bg-gray'>
                        <input type="checkbox" checked={checkedItems[index]} onChange={() => handleCheckboxChangeOnly2(index)} className='hover:cursor-pointer'/>
                        <p className='w-full text-[20px] font-kanit text-textPrimary'>{column.label}</p>
                    </label>
                )
              })}
            <div className='w-full flex items-center justify-end p-4'>
              <button onClick={()=>{setCleanMenu(17);}} disabled={checkedItems.filter(item => item).length !== 2} className={`text-[20px] font-kanit  px-6 py-2 rounded-lg ${checkedItems.filter(item => item).length == 2?`bg-primary text-white hover:bg-hoverPrimary`:`bg-gray hover:cursor-not-allowed`} `}>ถัดไป <span className='ml-4'>{"->"}</span></button>
            </div>
          </div>
          
          :cleanMenu==17?
          <div className='flex px-12 flex-col justify-center border-b border-borderNavbar py-4 gap-4'>
          <div className='flex flex-col gap-8 items-start'>
              <div className='flex flex-col w-full'>
                <p className='text-[20px] font-kanit text-textPrimary'>เชื่อมโดยใช้ (เช่น , : _ -)</p>
                <input type='text' value={delimiter} className='text-start text-[20px] text-textPrimary border-2 w-full rounded-md px-3'
                onChange={(e)=>{const inputValue = e.target.value.slice(0, 1); 
                setDelimiter(inputValue);
                }}/>
              </div>
              <div className='flex flex-col w-full'>
                <p className='text-[20px] font-kanit text-textPrimary'>ชื่อของคอลัมน์ใหม่</p>
                <input type='text' value={column1} className='text-start text-[20px] text-textPrimary border-2 w-full rounded-md px-3'
                onChange={(e)=>{setColumn1(e.target.value); }}/>
              </div>
              <div className={`flex w-full justify-end`}>
                  <button 
                  onClick={()=>{
                      if(delimiter!=""&&column1!=""){
                          handleConfirm()
                      }
                  }} 
                  className={`text-[20px] font-kanit rounded-md py-2 px-4 text-white ${delimiter!=""&&column1!=""?`bg-primary hover:bg-hoverPrimary`:`bg-gray hover:cursor-not-allowed`}`}>ยืนยัน</button>
              </div>
          </div>
        </div>

          :
          <p></p>
    }
        </div>
      </div>
    </div>
  );
};

export default PopUpCleansing;
