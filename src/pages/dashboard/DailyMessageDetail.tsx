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
import { Box, Card, Dialog, DialogContent, IconButton, Pagination, Typography } from "@mui/material";
import Close from 'mdi-material-ui/Close'
import DialogNetworkGraph from "./DialogNetworkGraph";
import { GetDetailMessage } from "src/services/api/dashboards/overall/overallDashboardApi";

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
  params?: any
  keywordId?: number
  setKeywordId?: any
}

const DailyMessageDetail = (props: DialogInfoProps) => {
    const { show, setShow, current, params, keywordId, setKeywordId } = props
    const [ showDialog, setShowDialog ] = useState<boolean>(false);
    const [page, setPage] = useState(0);
    const [messageId, setMessageId ] = useState<number | string>();
    const [pageCount, setPageCount] = useState<number>(0);

    const {resultMessageDetail, totalMessage} = GetDetailMessage(params?.campaign, params?.platformId, params?.date, params?.endDate, params?.period, params?.previousDate, params?.previousEndDate, keywordId, page, 10);

    const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value-1);
    };

    const onCloseDialog = () => {
      setShow(false);
      setPage(0);
      setPageCount(0);
      if (keywordId) {
        setKeywordId("");
      }
    }

    useEffect(()=> {
      if (totalMessage > 0) {
       setPageCount(Math.ceil(totalMessage / 10));
      }
    }, [totalMessage]);

    return (
      <Card>
        <Dialog
          fullWidth
          open={show}
          maxWidth='md'
          scroll='body'
          onClose={onCloseDialog}
          TransitionComponent={Transition}
        > 
        <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
            <IconButton
              size='small'
              onClick={onCloseDialog}
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
                  {(resultMessageDetail || []).map((messageDetail :any, index : number) => (
                    <StyledTableRow key={index} onClick={() => {setShowDialog(true), setMessageId(messageDetail.message_id)}}>
                      <StyledTableCell align="center">{messageDetail.message_id}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {messageDetail.message_detail}
                      </StyledTableCell>
                      <StyledTableCell align="center">{messageDetail.account_name}</StyledTableCell>
                      <StyledTableCell align="center">{messageDetail.post_date}</StyledTableCell>
                      <StyledTableCell align="center">{messageDetail.post_time}</StyledTableCell>
                      <StyledTableCell align="center">{messageDetail.day}</StyledTableCell>
                      <StyledTableCell align="center">{messageDetail.device}</StyledTableCell>
                      <StyledTableCell align="center">{messageDetail.channel}</StyledTableCell>
                      <StyledTableCell align="center">{messageDetail.bully_level}</StyledTableCell>
                      <StyledTableCell align="center">{messageDetail.bully_type}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center'}}> 
              <Pagination count={pageCount} page={page+1} onChange={handleChangePagination} variant='outlined' color='primary'/>
              {/* <Button disabled={disableLoadMore} variant="contained" color="primary" onClick={(e) => {handleChangePagination(e, page)}}>
                Load More
              </Button> */}
            </Box>

          </DialogContent>
        </Dialog>
        <DialogNetworkGraph
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          currentData={current}
          params ={params}
          keywordId = {keywordId}
          messageId = {messageId}
        />
      </Card>
    );
}

export default DailyMessageDetail
