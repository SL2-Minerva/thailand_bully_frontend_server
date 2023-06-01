import { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, LinearProgress, Pagination, Typography } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import { OpenInNew } from 'mdi-material-ui'
import { GetDetailMessage } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'
import DialogNetworkGraphByFitler from './DialogNetworkGraphByFilter'
import moment from 'moment'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e8d63a',
    color: theme.palette.common.black
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(() => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover
  // },

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

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
  reportNo?: any
  title?: any
  networkTitle?: any
}

const DailyMessageDetail = (props: DialogInfoProps) => {
  const { show, setShow, current, params, keywordId, setKeywordId, reportNo, title, networkTitle } = props
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [page, setPage] = useState(0)
  const [messageId, setMessageId] = useState<number | string>()
  const [pageCount, setPageCount] = useState<number>(0)

  const platformId = params?.platformId || ''

  const { resultMessageDetail, totalMessage, loadingMessageDetail } = GetDetailMessage(
    params?.campaign,
    platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.previousDate,
    params?.previousEndDate,
    keywordId,
    page,
    10,
    reportNo,
    params?.page,
    params?.label,
    params?.ylabel
  )

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  const onCloseDialog = () => {
    setShow(false)
    setPage(0)
    setPageCount(0)
    if (keywordId) {
      setKeywordId('')
    }
  }

  useEffect(() => {
    if (totalMessage > 0) {
      const count = Math.ceil(totalMessage / 10)
      setPageCount(count)
    }
  }, [totalMessage])

  const cardTitle = title ? title : 'Daily Messages: Message Transactions'
  const titleNetwork = networkTitle ? networkTitle : 'Daily Messages: Social Network Analysis'

  return (
    <Card>
      <Dialog
        fullWidth
        open={show}
        maxWidth='xl'
        scroll='body'
        onClose={onCloseDialog}
        TransitionComponent={Transition}
      >
        <DialogContent
          sx={{
            pb: 6,
            pt: { xs: 8, sm: 12.5 },
            position: 'relative'
          }}
        >
          <IconButton size='small' onClick={onCloseDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          {loadingMessageDetail && <LinearProgress style={{ width: '100%' }} />}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              <Translations text={cardTitle} />
            </Typography>
          </Box>

          <TableContainer component={Paper} style={{maxHeight: 640}}>
            <Table aria-label='customized table' stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>No.</StyledTableCell>
                  <StyledTableCell align='center'>Message Detail</StyledTableCell>
                  <StyledTableCell align='center'>Message Type</StyledTableCell>
                  <StyledTableCell align='center'>Account Name</StyledTableCell>
                  <StyledTableCell align='center'>Post Time</StyledTableCell>
                  <StyledTableCell align='center'>Device</StyledTableCell>
                  <StyledTableCell align='center'>Channel</StyledTableCell>
                  <StyledTableCell align='center'>Sentiment</StyledTableCell>
                  <StyledTableCell align='center'>Bully Level</StyledTableCell>
                  <StyledTableCell align='center'>Bully Type</StyledTableCell>
                  <StyledTableCell align='center'>Link</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(resultMessageDetail || []).map((messageDetail: any, index: number) => (
                  <StyledTableRow
                    sx={{
                      cursor: messageDetail.parent ? 'pointer' : '',
                      backgroundColor: messageDetail.parent ? '#00ff0038' : '#fff'
                    }}
                    key={index}
                    onClick={() => {
                      if (messageDetail.parent) {
                        setMessageId(messageDetail.message_id)
                      }
                    }}
                  >
                    <StyledTableCell
                      onClick={() => {
                        setShowDialog(true)
                      }}
                    >
                      <b>{index + 1 + page * 10}</b>
                    </StyledTableCell>
                    <StyledTableCell
                      component='th'
                      scope='row'
                      onClick={() => {
                        setShowDialog(true)
                      }}
                      style={{ overflow: 'hidden', width: '300px' }}
                    >
                      <span
                        style={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {messageDetail.message_detail}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      component='th'
                      scope='row'
                      onClick={() => {
                        setShowDialog(true)
                      }}
                    >
                      {messageDetail.message_type || '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        setShowDialog(true)
                      }}
                    >
                      {messageDetail.account_name}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        setShowDialog(true)
                      }}
                    >
                      {moment(messageDetail.post_date)?.format('DD.MM.YYYY') + ', ' + messageDetail.post_time}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        setShowDialog(true)
                      }}
                    >
                      {messageDetail.device === 'android' ? (
                        <img alt={'logo'} width={25} height={25} src={`/images/logos/android.png`} />
                      ) : messageDetail.device === 'webapp' ? (
                        <img alt={'logo'} width={25} height={25} src={`/images/logos/website.png`} />
                      ) : messageDetail.device === 'iphone' ? (
                        <img alt={'logo'} width={25} height={25} src={`/images/logos/ios.png`} />
                      ) : (
                        '-'
                      )}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        setShowDialog(true)
                      }}
                    >
                      {messageDetail?.channel === 'facebook' ? (
                        <img alt={'logo'} width={28} height={28} src={`/images/logos/facebook-round.png`} />
                      ) : messageDetail?.channel === 'twitter' ? (
                        <img alt={'logo'} width={25} height={25} src={`/images/logos/twitter.png`} />
                      ) : messageDetail?.channel === 'youtube' ? (
                        <img width={28} height={28} alt={'logo'} src={`/images/logos/youtube-text.png`} />
                      ) : messageDetail?.channel === 'instagram' ? (
                        <img width={28} alt={'logo'} height={28} src={`/images/logos/instagram.png`} />
                      ) : messageDetail?.channel === 'pantip' ? (
                        <img width={28} alt={'logo'} height={28} src={`/images/logos/pantip.png`} />
                      ) : messageDetail?.channel === 'google' ? (
                        <img width={25} alt={'logo'} height={25} src={`/images/logos/google.png`} />
                      ) : (
                        <span style={{ textTransform: 'uppercase' }}>{messageDetail?.channel}</span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        setShowDialog(true)
                      }}
                    >
                      {messageDetail.sentiment || '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        setShowDialog(true)
                      }}
                    >
                      {messageDetail.bully_level || '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        setShowDialog(true)
                      }}
                    >
                      {messageDetail.bully_type || '-'}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {messageDetail.link_message ? (
                        <a href={messageDetail.link_message} target='_blank' rel='noopener noreferrer'>
                          <OpenInNew style={{ color: '#0047ff9e' }} />
                        </a>
                      ) : (
                        ''
                      )}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={pageCount}
              page={page + 1}
              onChange={handleChangePagination}
              variant='outlined'
              color='primary'
            />
          </Box>
        </DialogContent>
      </Dialog>

      {messageId && params?.campaign ? (
        <DialogNetworkGraphByFitler
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          currentData={current}
          params={params}
          keywordId={keywordId}
          messageId={messageId}
          setKeywordId={setKeywordId}
          setMessageId={setMessageId}
          reportNo={reportNo}
          title={titleNetwork}
        />
      ) : (
        ''
      )}
    </Card>
  )
}

export default DailyMessageDetail
