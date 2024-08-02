import React from 'react';

const PopUpDeleteProject = ({ isOpen , onClick, onClickCancel }) => {
  if (!isOpen) {
    return null;
  }

  const handleDelete = async() =>{
    await onClick()
    onClickCancel()
  }

  return (
    <div className="w-screen h-screen bg-black bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none font-kanit text-textPrimary">
      <div className="relative w-2/5 h-2/3 mx-auto my-6">
        {/* Modal content */}
        <div className="relative flex flex-col w-full bg-white p-4 border-2 border-black rounded-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-center p-5 rounded-t">
            <h3 className="text-3xl text-textPrimary">คุณต้องการที่จะลบโปรเจกต์นี้ใช่หรือไม่</h3>
            
          </div>
          {/* Body */}
          <div className="relative p-6 flex flex-row justify-around">
            <button onClick={onClickCancel} className='font-kanit text-[20px] px-12 py-3 bg-white border-2 rounded-xl hover:bg-gray'>ยกเลิก</button>
            <button onClick={handleDelete} className='font-kanit text-[20px] text-white bg-primaryRed px-12 py-3 border-black border-2 rounded-xl hover:bg-hoverRed'>ยืนยัน</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpDeleteProject;
