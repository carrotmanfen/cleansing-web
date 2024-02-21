//index.jsx
import React, { useState, useEffect } from "react";
import NavbarMain from "@/components/main/NavbarMain";
import { NavbarDetail } from "@/components/main/NavbarDetail";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { rows, columns } from "@/constants/tableData";
import { PivotView } from "@/components/main/PivotView";
import PopUpChangeProjectName from "@/components/main/PopUpChangeProjectName";
import PopUpCleansing from "@/components/main/PopUpCleansing";
import DownloadPopup from "@/components/main/DownloadPopup";
import useProject from "@/hooks/useProject";
import useChangeProjectName from "@/hooks/useChangeProjectName";
import useDownload from "@/hooks/useDownload";
import { atomUserRole } from '@/atoms/atomUserRole';
import { useRecoilState } from "recoil";
import Alert from '@mui/material/Alert';
import useAccount from '@/hooks/useAccount';
import ReversePopUp from "@/components/main/ReversePopUp";
import useReverse from "@/hooks/useReverse";

const Main = () => {
  const [menu, setMenu] = useState(1);
  const [popUpChangeProjectName, setPopUpChangeProjectName] = useState(false)
  const [projectNameFill, setProjectNameFill] = useState("")
  const [projectName, setProjectName] = useState("")
  const { getProject, data, updateProject } = useProject()
  const { changeProjectNameInAccount } = useChangeProjectName()
  const { handleDownload } = useDownload()
  const [fileName, setFileName] = useState("defaultFilename");
  const [selectOption, setSelectOption] = useState("csv");
  const [user, setUser] = useRecoilState(atomUserRole)
  const [notification, setNotification] = useState('');
  const {refreshLogin} = useAccount()
  const [reverse, setReverse] = useState(false)
  const {reverseProject} = useReverse()

  const handleUpdateProject = async(id, data_set) =>{
    await updateProject(id, data_set)
    await getProject();
    // window.location.reload();
  }

  const handleClosePopUpChangeProjectName = () => {
    setPopUpChangeProjectName(false)
  }

  const handleOpenPopUpChangeProjectName = () => {
    setPopUpChangeProjectName(true)
  }

  const handleChangeProjectNameFill = (e) => {
    setProjectNameFill(e.target.value)
    setNotification('');
  }

  const handleChangeProjectName = async (e) => {
    
    if (!projectNameFill) {
      setNotification('กรุณาป้อนชื่อโปรเจกต์');
      return;
    } else {
      await changeProjectNameInAccount(projectNameFill)
      await getProject()
      setProjectName(projectNameFill)
      setPopUpChangeProjectName(false)
    }
  }

  const buttonLeftClick = () => {
    setMenu(1);
  };
  const buttonRightClick = () => {
    setMenu(2);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 25
  // const pageCount = Math.ceil(data.data_set.rows.length / rowsPerPage);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  // const visibleRows = data.data_set.rows.slice(startIndex, endIndex);

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef(function Scroller(props, ref) {
      return <TableContainer component={Paper} {...props} ref={ref} />;
    }),
    Table: function CustomTable(props) {
      return (
        <Table
          {...props}
          sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
        />
      );
    },
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef(function CustomTableBody(props, ref) {
      return <TableBody {...props} ref={ref} />;
    }),
  };

  function fixedHeaderContent() {
    if (data == null) {
      return (<p> </p>)
    }
    else {
      return (
        <TableRow>
          {data.data_set.columns.map((column) => (
            <TableCell
              key={column.dataKey}
              variant="head"
              align={"center"}
              style={{ width: 200 }}
              sx={{
                backgroundColor: "#3498DB",
                fontSize: 20,
                color: "white",
                fontFamily: "Sarabun",
                border: 1,
                borderColor: "black",
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '200px',
              }}
            >
              {column.label}
            </TableCell>
          ))}
        </TableRow>
      );
    }
  }

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {data.data_set.columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={"left"}
            sx={{
              border: 1,
              borderColor: "black",
              overflow: 'hidden',
            //   textOverflow: 'ellipsis',
            //   whiteSpace: 'nowrap',
              maxWidth: '200px',
            }}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  const [popUpCleansing, setPopUpCleansing] = useState(false)

  const handleOpenCleansing = () => {
    setPopUpCleansing(true)
  }

  const handleCloseCleansing = () => {
    setPopUpCleansing(false)
  }

  const [downloadPopup, setDownloadPopup] = useState(false)

  const handleDownloadPopup = () => {
    setDownloadPopup(true);
    if(projectName===""){
        setFileName("defaultFilename")
    }else{
        setFileName(projectName);
    }
    setSelectOption("csv");
  }
  const handleCloseDownload = () => {
    setDownloadPopup(false)
  }

  const handleFindProjectName = async() => {
    if(projectName==""){
        const queryParams = new URLSearchParams(window.location.search);
        const searchProjectId = queryParams.get('projectId');
        
        const results = user.project.filter(
          (project) =>{
              if(project._id!==null)
                return project._id.toLowerCase().includes(searchProjectId.toLowerCase())
          }
        );
        if(results[0].project_name){
            console.log(results[0].project_name)
            setProjectName(results[0].project_name)
        }
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleChangeProjectName();
    }
  };

  const handleReversePopUp = () =>{
    setReverse(true)
  }

  const closeReversePopUp = () =>{
    setReverse(false)
  }

  const handleReverseVersion = async() =>{
    console.log("click")
    const queryParams = new URLSearchParams(window.location.search);
    const searchProjectId = queryParams.get('projectId');
    console.log(data.clean.clean_id)
    await reverseProject(searchProjectId, data.clean.clean_id)
    await getProject()
    window.location.reload()
  }

  useEffect(() => {
    if (data != null && user.isLogin != false) {
      handleFindProjectName()
      setProjectNameFill(projectName)
    }
  }, [data, user]);
  useEffect(() => {
        
    if (user.isLogin === false) {
        const username = localStorage.getItem('username')
        if(username){
            refreshLogin(username)
        }else{
            window.location.replace("/login")
        }
    }
  }, [user.isLogin,refreshLogin]);
  return (
    <div className="relative w-screen h-full">
      {data&&<NavbarMain popup={handleOpenPopUpChangeProjectName} projectName={projectName} downloadOnClick={handleDownloadPopup} />}
      {data&&<NavbarDetail rowNumber={data.data_set.rows.length} colNumber={data.data_set.columns.length} clean_name={data.clean.clean_name} onClick={handleReversePopUp}/>}
      <PopUpChangeProjectName isOpen={popUpChangeProjectName}>
        <div className="fixed top-4 z-50 left-1/2 transform -translate-x-1/2 w-1/2">
            {notification && <Alert severity="error" className="w-full font-kanit text-lg">{notification}</Alert>}
        </div>
        <input type="text" value={projectNameFill} onChange={handleChangeProjectNameFill} className="border rounded-md w-full px-4 py-3 text-[16px] font-kanit" placeholder="พิมพ์ชื่อใหม่ของโปรเจกต์" onKeyDown={handleEnterKeyPress} />
        <div className="flex flex-row w-full justify-between mt-8">
          <button onClick={handleClosePopUpChangeProjectName} className="px-10 py-2 bg-gray rounded-lg hover:bg-textGray">ยกเลิก</button>
          <button onClick={handleChangeProjectName} className="px-10 py-2 bg-primary hover:bg-hoverPrimary rounded-lg text-white">ยืนยัน</button>
        </div>
      </PopUpChangeProjectName>
      <ReversePopUp isOpen={reverse}>
      <div className="fixed top-4 z-50 left-1/2 transform -translate-x-1/2 w-1/2">
            {notification && <Alert severity="error" className="w-full font-kanit text-lg">{notification}</Alert>}
        </div>
        <div className="flex flex-row w-full justify-around mt-8">
          <button onClick={closeReversePopUp} className="px-10 py-2 bg-gray rounded-lg hover:bg-textGray">ยกเลิก</button>
          <button onClick={handleReverseVersion} className="px-10 py-2 bg-primary hover:bg-hoverPrimary rounded-lg text-white">ยืนยัน</button>
        </div>
      </ReversePopUp>
      {data&&<PopUpCleansing isOpen={popUpCleansing} close={handleCloseCleansing} columns={data.data_set.columns} rows={data.data_set.rows} />}
      {data&&<DownloadPopup
        isOpen={downloadPopup}
        onClose={handleCloseDownload}
        projectName={projectName}
        handleDownload={() => handleDownload(data, fileName, selectOption)}
        fileName={fileName}
        setFileName={setFileName}
        selectOption={selectOption}
        setSelectOption={setSelectOption}/>}
      <div className="flex flex-col w-full px-10 font-kanit">
        <div className="flex flex-row py-4 justify-between">
          <div className="gap-4 flex flex-row">
            <button
              onClick={buttonLeftClick}
              className={`py-2 px-4 text-[16px] ${menu === 1
                ? `bg-primary hover:bg-hoverPrimary text-white`
                : `bg-white hover:bg-gray text-black border`
                }  rounded-md`}
            >
              มุมมองตาราง
            </button>
            <button
              onClick={buttonRightClick}
              className={`py-2 px-4 text-[16px] ${menu === 2
                ? `bg-primary hover:bg-hoverPrimary text-white`
                : `bg-white hover:bg-gray text-black border`
                } rounded-md`}
            >
              มุมมองภาพรวม
            </button>
          </div>
          <button
            onClick={handleOpenCleansing}
            className={`py-2 px-4 text-[16px] bg-cleansing hover:bg-hoverCleansing text-white} text-white rounded-md`}
          >
            ทำความสะอาดข้อมูล
          </button>
        </div>
        {
          menu == 1 ? <div className="flex flex-col">
            {data&&<Paper style={{ height: "70vh", width: "100%" }}>
              <TableVirtuoso
                data={data.data_set.rows.slice(startIndex, endIndex)}
                components={VirtuosoTableComponents}
                fixedHeaderContent={fixedHeaderContent}
                itemContent={rowContent}
              />
            </Paper>}

            {data&&<div className="w-full flex justify-end mt-6">
              <Pagination
                count={Math.ceil(data.data_set.rows.length / rowsPerPage)}
                color="primary"
                page={page}
                onChange={handlePageChange}
              />
            </div>}
          </div>

            : (data == null ? <p> </p> :<div className="w-full">
              <PivotView dataColumns={data.data_set.columns} dataRows={data.data_set.rows} updateProjectFunction={handleUpdateProject}/>
            </div>)

        }
      </div>
    </div>
  );
};

export default Main;
