import React, { useState, useEffect } from "react";
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
import useAccount from '@/hooks/useAccount';
import { atomUserRole } from '@/atoms/atomUserRole';
import { useRecoilState } from "recoil";
import useProject from "@/hooks/useProject";
import useCleansing from "@/hooks/useCleansing";
import Alert from '@mui/material/Alert';

const ConfirmClean = () => {
  const [menu, setMenu] = useState(1);
  const [projectName, setProjectName] = useState("")
  const [rowsData, setRowData] = useState(rows)
  const [columnsData, setColumnsData] = useState(columns)
  const [user, setUser] = useRecoilState(atomUserRole)
  const [notification, setNotification] = useState('');
  const {refreshLogin} = useAccount()
  const { getProject, data } = useProject()
  const [projectId, setProjectId] = useState("")
  const {data:dataConfirm, error, getDataCheck, cleanConfirm } = useCleansing()

  const handleFindProjectName = () => {
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

  const buttonLeftClick = () => {
    setMenu(1);
    setRowData(dataConfirm.rows)
  };
  const buttonRightClick = () => {
    setMenu(2);
    const filteredRows = dataConfirm.rows.filter((row) => row['st@tus'] === 'delete' || row['st@tus'] === 'edit');
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
                backgroundColor: row['st@tus']=="delete" ? '#FCA1A1' :row['st@tus']=="edit"? "#FFED92" :'white'
            }}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  const handleConfirm = () =>{
    const queryParams = new URLSearchParams(window.location.search);
    const searchProjectId = queryParams.get('projectId');
    const searchMethod = queryParams.get('clean');
    const searchColumn = queryParams.get('column');
    const resultArray = searchColumn.split(',');
    const dataSet = data.data_set
    dataSet.columns_match=resultArray
    if(searchMethod=="3"){
        const searchNewValue = queryParams.get('newValue');
        const newValue = parseInt(searchNewValue)
        const searchOldValue = queryParams.get('oldValue');
        const oldValue = parseInt(searchOldValue)
        if(!isNaN(newValue)) {
            dataSet.data_change = newValue
          } else {
              dataSet.data_change = searchNewValue
          }
          if(!isNaN(oldValue)) {
            dataSet.data_select = oldValue
          } else {
              dataSet.data_select = searchOldValue
          }
    }else if(searchMethod=="4"){
        const searchOrderSelect = queryParams.get('orderSelect')
        dataSet.order_select = searchOrderSelect
    }else if (searchMethod=="5"){
        const searchDelimiter = queryParams.get('delimiter')
        const searchCol1 = queryParams.get('columnName1')
        const searchCol2 = queryParams.get('columnName2')
        dataSet.delimiter = searchDelimiter
        dataSet.column_1 = searchCol1
        dataSet.column_2 = searchCol2
        dataSet.columns_match = resultArray[0]
    }else if(searchMethod=="10"){
        const searchOrder = queryParams.get('order')
        const orderValue = parseFloat(searchOrder)
        if(!isNaN(orderValue)){
            dataSet.order_select = orderValue
        }else{
            dataSet.order_select = searchOrder
        }
    }
    console.log("confirm");
    cleanConfirm(searchMethod, dataSet, searchProjectId)
  }
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const searchProjectId = queryParams.get('projectId');
    const searchMethod = queryParams.get('clean');
    const searchColumn = queryParams.get('column');
    const resultArray = searchColumn.split(',');
    setProjectId(searchProjectId)
    if (data != null) {
        handleFindProjectName()
        if(dataConfirm === null){
            const dataSet = data.data_set
            dataSet.columns_match=resultArray
            if(searchMethod=="3"){
                const searchNewValue = queryParams.get('newValue');
                const newValue = parseFloat(searchNewValue)
                const searchOldValue = queryParams.get('oldValue');
                const oldValue = parseFloat(searchOldValue)
                if(!isNaN(newValue)) {
                    dataSet.data_change = newValue
                } else {
                    dataSet.data_change = searchNewValue
                }
                if(!isNaN(oldValue)) {
                dataSet.data_select = oldValue
                } else {
                    dataSet.data_select = searchOldValue
                }
            }else if(searchMethod=="4"){
                const searchOrderSelect = queryParams.get('orderSelect')
                dataSet.order_select = searchOrderSelect
            }else if (searchMethod=="5"){
                const searchDelimiter = queryParams.get('delimiter')
                const searchCol1 = queryParams.get('columnName1')
                const searchCol2 = queryParams.get('columnName2')
                dataSet.delimiter = searchDelimiter
                dataSet.column_1 = searchCol1
                dataSet.column_2 = searchCol2
                dataSet.columns_match = resultArray[0]
            }
            else if(searchMethod=="10"){
                const searchOrder = queryParams.get('order')
                const orderValue = parseFloat(searchOrder)
                if(!isNaN(orderValue)){
                    dataSet.order_select = orderValue
                }else{
                    dataSet.order_select = searchOrder
                }
            }
            getDataCheck(searchMethod,dataSet)
        }
    }
    if(dataConfirm!=null){
        setColumnsData(dataConfirm.columns)
        setRowData(dataConfirm.rows)
    }
  }, [data, user, dataConfirm]);

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
            <Link href={`/main?projectId=${projectId}`} className="py-2 px-10 text-[16px] bg-gray hover:bg-textGray hover:text-white text-white} text-black rounded-md">
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
              <Image src={redDot} height={20} width={20} alt="redDot" objectFit="contain"/>
              <p className="mr-4">ข้อมูลที่จะถูกลบ</p>
              <Image src={yellowDot} height={20} width={20} alt="yellowDot" objectFit="contain"/>
              <p>ข้อมูลที่จะถูกเปลี่ยนแปลง</p>
        </div>
            <div className="flex flex-col relative">
            {error && 
                <div className="absolute w-full z-50 -top-[180px]">
                    <Alert severity="error" className="w-full font-kanit text-lg">{error}</Alert>
                </div>
            }
                <Paper style={{ height: "65vh", width: "100%" }}>
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
