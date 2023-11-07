import React, {useState} from 'react'
import NavbarMain from '@/components/NavbarMain'
import { NavbarDetail } from '@/components/NavbarDetail'
import Pagination from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

const Main = () => {
    const [menu, setMenu] = useState(1)

    const buttonLeftClick = () => {
        setMenu(1)
    }
    const buttonRightClick = () => {
        setMenu(2)
    }

    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(5)

    const handlePageChange = (event, page) => {
        setPage(page);
      };

      const sample = [
        ['Frozen yoghurt', 159, 6.0, 24, 4.0],
        ['Ice cream sandwich', 237, 9.0, 37, 4.3],
        ['Eclair', 262, 16.0, 24, 6.0],
        ['Cupcake', 305, 3.7, 67, 4.3],
        ['Gingerbread', 356, 16.0, 49, 3.9],
      ];
      function createData(id, dessert, calories, fat, carbs, protein, test, test2, test3, test4, test5, test6, test7, test8, test9, test10) {
        return { id, dessert, calories, fat, carbs, protein, test, test2, test3, test4, test5, test6, test7, test8, test9, test10 };
      }
      const columns = [
        {
          width: 200,
          label: 'Dessert',
          dataKey: 'dessert',
        },
        {
          width: 120,
          label: 'Calories\u00A0(g)',
          dataKey: 'calories',
          numeric: true,
        },
        {
          width: 120,
          label: 'Fat\u00A0(g)',
          dataKey: 'fat',
          numeric: true,
        },
        {
          width: 120,
          label: 'Carbs\u00A0(g)',
          dataKey: 'carbs',
          numeric: true,
        },
        {
          width: 120,
          label: 'Protein\u00A0(g)',
          dataKey: 'protein',
          numeric: true,
        },
        {
            width: 120,
            label: 'Protein\u00A0(g)',
            dataKey: 'test',
            numeric: true,
          },
          {
            width: 120,
            label: 'Protein\u00A0(g)',
            dataKey: 'test2',
            numeric: true,
          },
          {
            width: 120,
            label: 'Protein\u00A0(g)',
            dataKey: 'test3',
            numeric: true,
          },
          {
            width: 120,
            label: 'Protein\u00A0(g)',
            dataKey: 'test4',
            numeric: true,
          },
          {
            width: 120,
            label: 'Protein\u00A0(g)',
            dataKey: 'test5',
            numeric: true,
          },
          {
            width: 120,
            label: 'Protein\u00A0(g)',
            dataKey: 'test6',
            numeric: true,
          },
          {
            width: 120,
            label: 'Protein\u00A0(g)',
            dataKey: 'test7',
            numeric: true,
          },
          {
            width: 120,
            label: 'Protein\u00A0(g)',
            dataKey: 'test8',
            numeric: true,
          },
          {
            width: 120,
            label: 'Protein\u00A0(g)',
            dataKey: 'test9',
            numeric: true,
          },{
            width: 120,
            label: 'Protein\u00A0(g)',
            dataKey: 'test10',
            numeric: true,
          },
      ];
      
      const rows = Array.from({ length: 200 }, (_, index) => {
        const randomSelection = sample[Math.floor(Math.random() * sample.length)];
        return createData(index, ...randomSelection);
      });
      
      const VirtuosoTableComponents = {
        Scroller: React.forwardRef((props, ref) => (
          <TableContainer component={Paper} {...props} ref={ref} />
        )),
        Table: (props) => (
          <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
        ),
        TableHead,
        TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
        TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
      };
      
        function fixedHeaderContent() {
          return (
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.dataKey}
                  variant="head"
                  align={column.numeric || false ? 'right' : 'left'}
                  style={{ width: column.width }}
                  sx={{
                    backgroundColor: 'background.paper',
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
                  align={column.numeric || false ? 'right' : 'left'}
                >
                  {row[column.dataKey]}
                </TableCell>
              ))}
            </React.Fragment>
          );
        }    

      

  return (
    <div  className='relative w-screen h-full'>
        <NavbarMain projectName={"project 1"}/>
        <NavbarDetail rowNumber={3000} colNumber={400}/>
        <div className='flex flex-col w-full border px-10 font-kanit'>
            <div className='flex flex-row py-4 justify-between'>
                <div className='gap-4 flex flex-row'>
                    <button onClick={buttonLeftClick} className={`py-2 px-4 text-[16px] ${menu===1?`bg-primary hover:bg-hoverPrimary text-white`:`bg-white hover:bg-gray text-black border`}  rounded-md`}>มุมมองตาราง</button>
                    <button onClick={buttonRightClick} className={`py-2 px-4 text-[16px] ${menu===2?`bg-primary hover:bg-hoverPrimary text-white`:`bg-white hover:bg-gray text-black border`} rounded-md`}>มุมมองภาพรวม</button>
                </div>
                    <button className={`py-2 px-4 text-[16px] bg-primary hover:bg-hoverPrimary text-white} text-white rounded-md`}>ทำความสะอาดข้อมูล</button>
            </div>
            <Paper style={{ height: 400, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>

            <div className='w-full flex justify-end'>
                <Pagination count={pageCount} color="primary" page={page} onChange={handlePageChange}/>
            </div>
        </div>
    </div>
  )
}

export default Main