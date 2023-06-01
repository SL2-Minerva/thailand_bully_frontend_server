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
import { GetMessageDetailVoiceDashboard } from 'src/services/api/dashboards/overall/overallDashboardApi'
import moment from 'moment'
import Translations from 'src/layouts/components/Translations'
import DialogNetworkGraphByFitler from '../dashboard/DialogNetworkGraphByFilter'
import { OpenInNew } from 'mdi-material-ui'

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
  paramsId?: any
  setParamsId?: any
  reportNo?: string
  title?: string
  networkTitle?: string
  keywordId?: number
  setKeywordId?: any
  type?: string
}

const MessageDetail = (props: DialogInfoProps) => {
  const {
    show,
    setShow,
    current,
    params,
    paramsId,
    setParamsId,
    reportNo,
    title,
    networkTitle,
    keywordId,
    setKeywordId,
    type
  } = props
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [page, setPage] = useState(0)
  const [messageId, setMessageId] = useState<number | string>()
  const [pageCount, setPageCount] = useState<number>(0)

  let paramData: any = {}
  const todayDate = new Date()
  if (params?.period === 'customrange' && params?.previousDate !== todayDate && params?.previousEndDate !== todayDate) {
    paramData = {
      campaign_id: params?.campaign || '',
      source: paramsId?.sourceId || '',
      start_date: params?.date ? moment(params?.date).format('YYYY-MM-DD') : '',
      end_date: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : '',
      period: params?.period,
      keyword_id: paramsId?.keywordId || keywordId || '',
      organization_id: paramsId?.organization_id || '',
      classification_id: paramsId?.classification_id || '',
      start_date_period: params?.previousDate ? moment(params?.previousDate).format('YYYY-MM-DD') : '',
      end_date_period: params?.previousEndDate ? moment(params?.previousEndDate).format('YYYY-MM-DD') : '',
      page: page,
      limit: 10,
      report_number: reportNo,
      page_name: params?.page,
      label: params?.label
    }
  } else {
    paramData = {
      campaign_id: params?.campaign || '',
      source: paramsId?.sourceId || '',
      start_date: params?.date ? moment(params?.date).format('YYYY-MM-DD') : '',
      end_date: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : '',
      period: params?.period,
      keyword_id: paramsId?.keywordId || keywordId || '',
      classification_id: paramsId?.classification_id || '',
      organization_id: paramsId?.organization_id || '',
      page: page,
      limit: 10,
      report_number: reportNo,
      page_name: params?.page,
      label: params?.label
    }
  }

  if (params?.Llabel) {
    paramData.Llabel = params?.Llabel
  }

  if (params.select_period) {
    paramData.select_period = params?.select_period
  }

  const { resultMessageDetail, totalMessage, loadingMessageDetail } = GetMessageDetailVoiceDashboard(paramData)

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  const onCloseDialog = () => {
    setShow(false)
    setPage(0)
    setPageCount(0)
    setParamsId({
      keywordId: null,
      sourceId: null,
      campaign_id: null,
      organization_id: null
    })
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
        <DialogContent sx={{ pb: 6, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={onCloseDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          {loadingMessageDetail && <LinearProgress style={{ width: '100%' }} />}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              <Translations text={title || 'Daily Messages: Message Transactions'} />
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={{maxHeight: '640px'}}>
            <Table style={{ minWidth: '00px' }} aria-label='customized table' stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>No.</StyledTableCell>
                  <StyledTableCell align='center'>Message Detail</StyledTableCell>
                  <StyledTableCell align='center'>Message Type</StyledTableCell>
                  <StyledTableCell align='center'>{type && type === 'channel' ? 'Source Name' : 'Account Name'}</StyledTableCell>
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
                    key={index}
                    hover={true}
                    onClick={() => {
                      if (messageDetail.parent) {
                        setMessageId(messageDetail.message_id)
                      }
                    }}
                    sx={{
                      cursor: messageDetail.parent ? 'pointer' : '',
                      backgroundColor: messageDetail.parent ? '#00ff0038' : '#fff'
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
                      width={300}
                    >
                      {messageDetail.message_detail}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
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
                      {messageDetail.bully_level}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        setShowDialog(true)
                      }}
                    >
                      {messageDetail.bully_type}
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
            {/* <Button disabled={disableLoadMore} variant="contained" color="primary" onClick={(e) => {handleChangePagination(e, page)}}>
                Load More
              </Button> */}
          </Box>
        </DialogContent>
      </Dialog>

      {messageId && params?.campaign ? (
        <DialogNetworkGraphByFitler
          showDialog={showDialog}
          setShowDialog={setShowDialog}
          currentData={current}
          params={params}
          keywordId={paramsId?.keywordId}
          messageId={messageId}
          setKeywordId={setParamsId}
          setMessageId={setMessageId}
          reportNo={reportNo}
          title={networkTitle || 'Daily Messages: Social Network Analysis'}
        />
      ) : (
        ''
      )}
    </Card>
  )
}

export default MessageDetail
