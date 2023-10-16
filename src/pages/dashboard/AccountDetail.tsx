import { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Fade, { FadeProps } from '@mui/material/Fade'
import { Box, Card, Dialog, DialogContent, IconButton, LinearProgress, Pagination, Typography } from '@mui/material'
import Close from 'mdi-material-ui/Close'
import Translations from 'src/layouts/components/Translations'
import { GetDetailMessage } from 'src/services/api/dashboards/overall/overallDashboardApi'
import DialogNetworkGraphByFitler from './DialogNetworkGraphByFilter'

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
  authorName: string
  setAuthorName: any
  message_id: string
  setMessage_id: any
}

const AccountDetail = (props: DialogInfoProps) => {
  const {
    show,
    setShow,
    current,
    title,
    networkTitle,
    params,
    reportNo,
    keywordId,
    setKeywordId,
    authorName,
    setAuthorName,
    message_id,
    setMessage_id
  } = props
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [pageCount, setPageCount] = useState<number>(0)
  const [page, setPage] = useState(0)
  const platformId = params?.platformId || ''
  const [messageId, setMessageId] = useState<number | string>()

  const { resultMessageDetail, totalMessage, loadingMessageDetail } = GetDetailMessage(
    params?.campaign,
    platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordId,
    page,
    10,
    reportNo,
    params?.page,
    params?.label,
    params?.ylabel,
    'level3',
    authorName,
    message_id
  )

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  const onCloseDialog = () => {
    setShow(false)
    setShowDialog(false)
    setPage(0)
    setPageCount(0)
    if (keywordId) {
      setKeywordId('')
    }
    setAuthorName('')
    setMessage_id('')
  }

  useEffect(() => {
    if (totalMessage > 0) {
      setPageCount(Math.ceil(totalMessage / 10))
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
              <Translations text={title || ''} />
            </Typography>
          </Box>
          <TableContainer component={Paper} sx={{ minHeight: 450, maxHeight: 450 }}>
            <Table aria-label='customized table'>
              <TableHead sx={{ backgroundColor: '#e8d63aa1 !important' }}>
                <TableRow>
                  <TableCell variant='head' align='center'>
                    {' '}
                    Message Detail{' '}
                  </TableCell>
                  <TableCell variant='head' align='center'> Account Name </TableCell>
                  <TableCell variant='head' align='center'> Channel/Platform </TableCell>
                  <TableCell variant='head' align='center'> Post Date </TableCell>
                  <TableCell variant='head' align='center'> Post Time </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(resultMessageDetail || []).map((row: any, index: number) => (
                  <TableRow
                    key={index}
                    onClick={() => {
                      setShowDialog(true), setMessageId(row.message_id)
                    }}
                  >
                    <TableCell style={{ whiteSpace: 'normal', width: 800 }}  align='left'>{row.message_detail}</TableCell>
                    <TableCell  align='center'>{row.account_name}</TableCell>
                    <TableCell  align='center'>
                      {row?.channel == 'facebook' ? (
                        <img alt={'logo'} width={34} height={34} src={`/images/logos/facebook-round.png`} />
                      ) : row?.channel == 'twitter' ? (
                        <img alt={'logo'} width={34} height={34} src={`/images/logos/x-black.jpg`} />
                      ) : row?.channel == 'youtube' ? (
                        <img width={34} height={34} alt={'logo'} src={`/images/logos/youtube-text.png`} />
                      ) : row?.channel == 'instagram' ? (
                        <img width={34} alt={'logo'} height={34} src={`/images/logos/instagram.png`} />
                      ) : row?.channel == 'pantip' ? (
                        <img width={34} alt={'logo'} height={34} src={`/images/logos/pantip.png`} />
                      ) : row?.channel == 'google' ? (
                        <img width={34} alt={'logo'} height={34} src={`/images/logos/google.png`} />
                      ) :row?.channel == 'tiktok' ? (
                        <img width={34} alt={'logo'} height={34} src={`/images/logos/tiktok.png`} />
                      ) : (
                        <span style={{ textTransform: 'uppercase' }}>{row?.channel}</span>
                      )}
                    </TableCell>
                    <TableCell  align='center'>{row.post_date}</TableCell>
                    <TableCell align='center'> {row.post_time}</TableCell>
                  </TableRow>
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
      {showDialog && messageId && params?.campaign ? (
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
          title={networkTitle}
        />
      ) : (
        ''
      )}
    </Card>
  )
}

export default AccountDetail
