import React, { useState } from "react";
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

const Main = () => {
  const [menu, setMenu] = useState(1);
  const [popUpChangeProjectName, setPopUpChangeProjectName] = useState(false)
  const [projectName, setProjectName] = useState("project 1")
  const [projectNameFill, setProjectNameFill] = useState(projectName)

  const handleClosePopUpChangeProjectName = () =>{
    setPopUpChangeProjectName(false)
  }

  const handleOpenPopUpChangeProjectName = () =>{
    setPopUpChangeProjectName(true)
  }

  const handleChangeProjectNameFill = (e) =>{
    setProjectNameFill(e.target.value)
  }
  
  const handleChangeProjectName = (e) =>{
    setProjectName(projectNameFill)
    setPopUpChangeProjectName(false)
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
  const pageCount = Math.ceil(rows.length / rowsPerPage);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = rows.slice(startIndex, endIndex);

  const VirtuosoTableComponents = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={"center"}
            style={{ width: 200 }}
            sx={{
              backgroundColor: "#3498DB",
              fontSize:20,
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

  function rowContent(_index, row) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={"left"}
            sx={{
              border: 1,
              borderColor: "black",
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
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

  const handleOpenCleansing = () =>{
    setPopUpCleansing(true)
  }

  const handleCloseCleansing = () =>{
    setPopUpCleansing(false)
  }
  
  const [downloadPopup, setDownloadPopup] = useState(false)  
  const handleDownloadPopup = () =>{
    setDownloadPopup(true)
  }
  const handleCloseDownload = () =>{
    setDownloadPopup(false)
  }

  return (
    <div className="relative w-screen h-full">
      <NavbarMain popup={handleOpenPopUpChangeProjectName} projectName={projectName} downloadOnClick={handleDownloadPopup} />
      <NavbarDetail rowNumber={3000} colNumber={400} />
      <PopUpChangeProjectName isOpen={popUpChangeProjectName}>
        <input type="text" value={projectNameFill} onChange={handleChangeProjectNameFill} className="border rounded-md w-full px-4 py-3 text-[16px] font-kanit" placeholder="พิมพ์ชื่อใหม่ของโปรเจกต์"/>
        <div className="flex flex-row w-full justify-between mt-8">
          <button onClick={handleClosePopUpChangeProjectName} className="px-10 py-2 bg-gray rounded-lg hover:bg-textGray">ยกเลิก</button>
          <button onClick={handleChangeProjectName} className="px-10 py-2 bg-primary hover:bg-hoverPrimary rounded-lg text-white">ยืนยัน</button>
        </div>
      </PopUpChangeProjectName>
      <PopUpCleansing isOpen={popUpCleansing} close={handleCloseCleansing} columns={columns}/>
      <DownloadPopup isOpen={downloadPopup} onClose={handleCloseDownload} projectName={projectName}/>
      <div className="flex flex-col w-full px-10 font-kanit">
        <div className="flex flex-row py-4 justify-between">
          <div className="gap-4 flex flex-row">
            <button
              onClick={buttonLeftClick}
              className={`py-2 px-4 text-[16px] ${
                menu === 1
                  ? `bg-primary hover:bg-hoverPrimary text-white`
                  : `bg-white hover:bg-gray text-black border`
              }  rounded-md`}
            >
              มุมมองตาราง
            </button>
            <button
              onClick={buttonRightClick}
              className={`py-2 px-4 text-[16px] ${
                menu === 2
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
            menu==1?<div className="flex flex-col">
                <Paper style={{ height: "70vh", width: "100%" }}>
                    <TableVirtuoso
                        data={visibleRows}
                        components={VirtuosoTableComponents}
                        fixedHeaderContent={fixedHeaderContent}
                        itemContent={rowContent}
                    />
                </Paper>

                <div className="w-full flex justify-end mt-6">
                    <Pagination
                        count={pageCount}
                        color="primary"
                        page={page}
                        onChange={handlePageChange}
                    />
                </div>
            </div>

            :<div className="w-full">
                <PivotView/>
            </div>

        }
      </div>
    </div>
  );
};

export default Main;
