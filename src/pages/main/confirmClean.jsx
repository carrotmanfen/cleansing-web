import React, { useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link"
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
import { rows, columns } from "@/constants/tableDataConfirm";
import { redDot, yellowDot } from "@/assets";

const ConfirmClean = () => {
  const [menu, setMenu] = useState(1);
  const [projectName, setProjectName] = useState("project 1")
  const [rowsData, setRowData] = useState(rows)
  const [columnsData, setColumnsData] = useState(columns)

  const buttonLeftClick = () => {
    setMenu(1);
    setRowData(rows)
  };
  const buttonRightClick = () => {
    setMenu(2);
    const filteredRows = rowsData.filter((row) => row.status === 'delete' || row.status === 'edit');
    setRowData(filteredRows);

  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 25
  const pageCount = Math.ceil(rowsData.length / rowsPerPage);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleRows = rowsData.slice(startIndex, endIndex);

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
        {columnsData.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={"center"}
            style={{ width: 300 }}
            sx={{
              backgroundColor: "#008F7A",
              color: "white",
              fontFamily: "Sarabun",
              border: 1,
              borderColor: "black",
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '300px',
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
        {columnsData.map((column) => (
          <TableCell
            key={column.dataKey}
            align={"left"}
            sx={{
                border: 1,
                borderColor: 'black',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '300px',
                backgroundColor: row.status=="delete" ? '#FCA1A1' :row.status=="edit"? "#FFED92" :'white'
            }}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  const handleConfirm = () =>{
    console.log("confirm");
  }

  return (
    <div className="relative w-screen h-full">
      <NavbarMain disableButton={true}  projectName={projectName} />
      <NavbarDetail rowNumber={3000} colNumber={400} />
     
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
              ข้อมูลหลังทำความสะอาด
            </button>
            <button
              onClick={buttonRightClick}
              className={`py-2 px-4 text-[16px] ${
                menu === 2
                  ? `bg-primary hover:bg-hoverPrimary text-white`
                  : `bg-white hover:bg-gray text-black border`
              } rounded-md`}
            >
              ข้อมูลที่ถูกจัดการ
            </button>
          </div>
          <div className="flex flex-row gap-6 ">
            <Link href={"/main"} className="py-2 px-10 text-[16px] bg-gray hover:bg-textGray hover:text-white text-white} text-black rounded-md">
                ยกเลิก
            </Link>
            <button
                onClick={handleConfirm}
                className={`py-2 px-10 text-[16px] bg-primary hover:bg-hoverPrimary text-white} text-white rounded-md`}
            >
                ยืนยัน
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-2 pb-4">
              <Image src={redDot} height={20} width={20} objectFit="contain"/>
              <p className="mr-4">ข้อมูลที่จะถูกลบ</p>
              <Image src={yellowDot} height={20} width={20} objectFit="contain"/>
              <p>ข้อมูลที่จะถูกเปลี่ยนแปลง</p>
        </div>
            <div className="flex flex-col">
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
      </div>
    </div>
  );
};

export default ConfirmClean;
