//DownloadPopup.jsx
import React, { useState } from 'react';
import Alert from '@mui/material/Alert';

const DownloadPopup = ({ isOpen, onClose, projectName, handleDownload, data, fileName, setFileName, selectOption, setSelectOption }) => {

  const [notification, setNotification] = useState('');

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!fileName.trim()) {
        setNotification('กรุณาป้อนชื่อไฟล์');
        return;
      }
      else {
        handleDownload(data, fileName, selectOption);
      }
    }
  };

  if (!isOpen) {
    return null;
  } else {
    return (
      <div className="w-screen h-screen bg-black bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none font-kanit text-textPrimary">
        <div className="relative w-2/5 h-2/3 mx-auto my-6">
          {/* Modal content */}
          <div className="relative flex flex-col w-full bg-white border-2 border-borderNavbar rounded-lg outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 rounded-t bg-primary">
              <h3 className="text-[20px] text-white">ดาวน์โหลด</h3>
              <button onClick={onClose} className='text-[24px] text-white h-full px-3 text-center hover:text-black'>
                X
              </button>
            </div>
            {/* Body */}
            <div className='flex flex-col'>
              <p className='px-12 font-kanit text-[24px] text-textPrimary pt-12 mb-4'>ชื่อไฟล์</p>
              <div className='flex flex-row mx-12 justify-between items-center gap-4'>

                <input type="text" className='border-2 rounded-md p-2 text-[20px] w-full font-kanit text-textPrimary focus:border-primary focus:outline-none selection:border-primary '
                  value={fileName}
                  onChange={(e) => {
                    setFileName(e.target.value);
                    setNotification(''); // Clear the notification when the user starts typing
                  }}
                  onKeyDown={handleInputKeyDown} />
                <div className="fixed top-4 z-50 left-1/2 transform -translate-x-1/2 w-1/2">
                  {notification && <Alert severity="error" className="w-full font-kanit text-lg">{notification}</Alert>}
                </div>

                <p
                  className='rounded-md text-[20px] font-kanit text-textPrimary focus:border-primary selection:border-primary'
                  
                >
                  .CSV
                </p>

              </div>
              <div onClick={()=>window.open(process.env.NEXT_PUBLIC_WEB_SERVICE_URL+"manual#section-seven", '_blank')} className=' mx-12 mt-4 text-primary hover:text-hoverPrimary hover:cursor-pointer flex flex-row w-full gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[30px] h-[30px]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                    </svg>
                    <p className='rounded-md text-[20px] font-kanit underline'>วิธีการเปิดไฟล์ด้วย Decoder Unicode UTF-8</p>
              </div> 
              <div className="py-10 flex flex-row justify-around">
                <button onClick={async () => {
                  if (!fileName.trim()) {
                    setNotification('กรุณาป้อนชื่อไฟล์');
                  } else {
                    handleDownload(data, fileName, selectOption);
                  }
                }} className='font-kanit text-[20px] text-white bg-primary px-16 py-3 rounded-xl hover:bg-hoverPrimary'>ดาวน์โหลด</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

};

export default DownloadPopup;
