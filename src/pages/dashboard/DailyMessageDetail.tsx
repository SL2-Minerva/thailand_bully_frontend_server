import {forwardRef, ReactElement, Ref, useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import Close from 'mdi-material-ui/Close'
import DialogNetworkGraph from "./DialogNetworkGraph";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#e8d63aa1",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  show: boolean
  setShow: any
  action?: string
  current?: any
  table?: any
}

const DailyMessageDetail = (props: DialogInfoProps) => {
    const { show, setShow, current } = props
    const [ showDialog, setShowDialog ] = useState<boolean>(false);
    useEffect(() => {
        console.log("detail page loaded!");
    }, [current])

    return (
      <Card>
        <Dialog
          fullWidth
          open={show}
          maxWidth='md'
          scroll='body'
          onClose={() => setShow(false)}
          TransitionComponent={Transition}
        > 
        <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton
              size='small'
              onClick={() => setShow(false)}
              sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
            >
              <Close />
            </IconButton>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
                 Daily Message Detail
              </Typography>
            </Box>

            <TableContainer component={Paper}>
              <Table style={{ minWidth: '00px' }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Message ID</StyledTableCell>
                    <StyledTableCell>Message Detail</StyledTableCell>
                    <StyledTableCell>Account Name</StyledTableCell>
                    <StyledTableCell>Post Date</StyledTableCell>
                    <StyledTableCell>Post Time</StyledTableCell>
                    <StyledTableCell>Day</StyledTableCell>
                    <StyledTableCell>Device</StyledTableCell>
                    <StyledTableCell>Channel</StyledTableCell>
                    <StyledTableCell>Bully Level</StyledTableCell>
                    <StyledTableCell>Bully Type</StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow key={row.name} onClick={() => {setShowDialog(true)}}>
                      <StyledTableCell align="center">{row.calories}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.fat}</StyledTableCell>
                      <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                      <StyledTableCell align="center">{row.protein}</StyledTableCell>
                      <StyledTableCell align="center">{row.calories}</StyledTableCell>
                      <StyledTableCell align="center">{row.fat}</StyledTableCell>
                      <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                      <StyledTableCell align="center">{row.protein}</StyledTableCell>
                      <StyledTableCell align="center">{row.protein}</StyledTableCell>

                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>
        <DialogNetworkGraph
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          currentData={current}
        />
      </Card>
    );
}

export default DailyMessageDetail
