import {useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Keyword', 159, 6.0, 24, 4.0),
];

const AccountDetail = () => {

    useEffect(() => {
        console.log("detail page loaded!");
    }, [])

    return (
        <TableContainer component={Paper} sx={{ minHeight: 450, maxHeight: 450 }}>
          <Table aria-label="customized table">
            <TableHead sx={{ backgroundColor: "#e8d63aa1 !important" }}>
              <TableRow>
                <TableCell>Message ID</TableCell>
                <TableCell variant="head"> Message Detail </TableCell>
                <TableCell variant="head"> Account Type </TableCell>
                <TableCell variant="head"> Channel/Platform </TableCell>
                <TableCell variant="head"> Post Date </TableCell>
                <TableCell variant="head"> Post Time </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                    <TableCell>0001</TableCell>
                    <TableCell style={{ whiteSpace: 'normal', width: 300 }}>                    
                         Before putting each word on the canvas, it is drawn on a separate canvas to read back the pixels to record is drawn spaces.
                    </TableCell>
                    <TableCell>Influencer</TableCell>
                    <TableCell>Twitter</TableCell>
                    <TableCell>21-11-2022</TableCell>
                    <TableCell> 11:07</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
}

export default AccountDetail
