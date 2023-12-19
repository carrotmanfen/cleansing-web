import React, {useState} from 'react';

const DownloadPopup = ({ isOpen , onClose, projectName }) => {
    
  const [fileName, setFileName] = useState(projectName)
  const [selectOption, setSelectOption] = useState("csv");
  if (!isOpen) {
    return null;
  }else{
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
                <div className='flex flex-row mx-12 justify-between gap-12'>
    
                    <input type="text" className='border-2 rounded-md p-2 text-[20px] w-full font-kanit text-textPrimary focus:border-primary focus:outline-none selection:border-primary '
                    value={fileName}
                    onChange={(e) => {
                        setFileName(e.target.value);
                      }}/>
                    <select
                        className='border-2 rounded-md py-2 px-4 text-[20px] font-kanit text-textPrimary focus:border-primary selection:border-primary'
                        value={selectOption}
                        onChange={(e) => {
                          setSelectOption(e.target.value);
                        }}
                      >
                        <option value='csv'>csv</option>
                        <option value='xsl'>xsl</option>
                      </select>
                </div>
                <div onClick={()=>{console.log(fileName)}} className="relative py-10 flex flex-row justify-around">
                    <button className='font-kanit text-[20px] text-white bg-primary px-16 py-3 rounded-xl hover:bg-hoverPrimary'>ดาวน์โหลด</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }

};

export default DownloadPopup;
