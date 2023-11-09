import React, { useState } from "react";
import NavbarMain from "@/components/NavbarMain";
import { NavbarDetail } from "@/components/NavbarDetail";
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

const Main = () => {
  const [menu, setMenu] = useState(1);

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
            align={column.numeric || false ? "center" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "#3498DB",
              color: "white",
              fontFamily: "Sarabun",
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
            align={column.numeric || false ? "center" : "left"}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div className="relative w-screen h-full">
      <NavbarMain projectName={"project 1"} />
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
            className={`py-2 px-4 text-[16px] bg-primary hover:bg-hoverPrimary text-white} text-white rounded-md`}
          >
            ทำความสะอาดข้อมูล
          </button>
        </div>
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
  );
};

export default Main;
