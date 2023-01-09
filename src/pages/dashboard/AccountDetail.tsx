import {forwardRef, ReactElement, Ref, useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import Close from 'mdi-material-ui/Close'
import DialogNetworkGraph from "./DialogNetworkGraph";

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

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface DialogInfoProps {
  show: boolean
  setShow: any
  current?: any
}

const AccountDetail = (props: DialogInfoProps) => {

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
                 Message Detail
              </Typography>
            </Box>
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
                    <TableRow key={row.name} onClick={() => {setShowDialog(true)}}>
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
          </DialogContent>
        </Dialog>
        {
          showDialog ?
          <DialogNetworkGraph
            showDialog={showDialog}
            setShowDialog={setShowDialog}
            currentData={current}
          /> : ""
        }
        
      </Card>
    );
}

export default AccountDetail
