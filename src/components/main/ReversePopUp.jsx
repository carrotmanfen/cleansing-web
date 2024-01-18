import React from 'react';

const ReversePopUp = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="w-screen h-screen bg-black bg-opacity-30 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none font-kanit text-textPrimary">
      <div className="relative w-2/5 h-2/3 mx-auto my-6">
        {/* Modal content */}
        <div className="relative flex flex-col w-full bg-white p-4 border-2 border-gray rounded-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-center p-5 rounded-t">
            <h3 className="text-3xl text-textPrimary text-center">คุณต้องการที่จะย้อนการทำความสะอาดข้อมูลหรือไม่</h3>
            
          </div>
          {/* Body */}
          <div className="relative p-6 flex-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ReversePopUp;
