import React, { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'

import Fade, { FadeProps } from '@mui/material/Fade'
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  IconButton,
  LinearProgress,
  Pagination,
  Tooltip,
  Typography
} from '@mui/material'
import Close from 'mdi-material-ui/Close'
import { OpenInNew, DotsVertical, ArrowUp, ArrowDown, TrashCanOutline, MicrosoftExcel } from 'mdi-material-ui'
import { GetDetailMessageOverall } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'
import DialogNetworkGraphByFitler from '../dashboard/DialogNetworkGraphByFilter'
import moment from 'moment'
import { DataGrid } from '@mui/x-data-grid'
import { withStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteConfirmDialog from '../dashboard/DeleteConfirmDialog'
import axios, { AxiosRequestConfig } from 'axios'
import { API_PATH } from 'src/utils/const'
import authConfig from 'src/configs/auth'
import toast from 'react-hot-toast'
import { saveAs } from 'file-saver'

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
  setIsLoading?: any
}

export const StyledDataGrid = withStyles({
  root: {
    '& .MuiDataGrid-row': {
      maxHeight: 'none !important',
      height: '90px',
      paddingTop: '15px',
      borderBottom: '1px solid #8080802e'
    },
    '&>.MuiDataGrid-main': {
      '&>.MuiDataGrid-columnHeaders': {
        borderBottom: 'none'
      },

      '& div div div div >.MuiDataGrid-cell': {
        borderBottom: 'none !important',
        minHeight: '70px !important'
      }
    }
  }
})(DataGrid)

export const initialSort = {
  message_type: '',
  author: '',
  date: '',
  device: '',
  source: '',
  engagement: '',
  sentiment: '',
  bully_level: '',
  bully_type: ''
}

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f6f7f7',
    color: theme.palette.common.black,
    '& .hidden-button': {
      display: 'none'
    },
    '&:hover .hidden-button': {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

export const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

const MessageDetail = (props: DialogInfoProps) => {
  const { show, setShow, current, params, keywordId, setKeywordId, reportNo, title, networkTitle, setIsLoading } = props
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [page, setPage] = useState(1)
  const [messageId, setMessageId] = useState<number | string>()
  const [pageCount, setPageCount] = useState<number>(0)
  const [data, setData] = useState<any>([])
  const [fieldName, setFieldName] = useState<string>('')
  const [sortSelect, setSortSelect] = useState('')
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [sortColumns, setSortColumn] = useState<any>(initialSort)
  const [deleteMsgId, setDeleteMsgId] = useState<string>('')
  const [reload, setReload] = useState<boolean>(false)

  const platformId = params?.platformId || ''

  const { resultMessageDetail, totalMessage, loadingMessageDetail } = GetDetailMessageOverall(
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
    params?.ylabel,
    fieldName,
    sortSelect,
    reload
  )

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const onCloseDialog = () => {
    setShow(false)
    setPage(1)
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

  useEffect(() => {
    if (loadingMessageDetail) {
      setData([])
    }
    if (!loadingMessageDetail && resultMessageDetail) {
      setData(resultMessageDetail)
    }
  }, [loadingMessageDetail])

  const cardTitle = title ? title : 'Daily Messages: Message Transactions'
  const titleNetwork = networkTitle ? networkTitle : 'Daily Messages: Social Network Analysis'

  const handleButtonSort = (field: string, sortName: string) => {
    setFieldName(field)
    setSortSelect(sortName)
    setSortColumn({ ...initialSort, [field]: sortName })
  }

  const excelExport = () => {
    setIsLoading(true)
    const instance = axios.create({ baseURL: API_PATH })
    const method = 'GET'
    const url = `/export/monitoring`
    const headers = {
      Authorization: `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`
    }
    let exportParams: any = {}
    const todayDate = new Date()

    if (params?.period === 'customrange' && params?.previousDate !== todayDate && params?.previousEndDate !== todayDate) {
        exportParams = {
        campaign_id: params?.campaign || '',
        source: platformId || '',
        start_date: params?.date ? moment(params?.date).format('YYYY-MM-DD') : '',
        end_date: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : '',
        period: params?.period,
        keyword_id: keywordId || '',
        start_date_period: params?.previousDate ? moment(params?.previousDate).format('YYYY-MM-DD') : '',
        end_date_period: params?.previousEndDate ? moment(params?.previousEndDate).format('YYYY-MM-DD') : '',
        page: page,
        limit: 10,
        report_number: reportNo,
        page_name: params?.page?.toString(),
        label: params?.label?.toString(),
        field: fieldName,
        sort: sortSelect
      }
    } else {
        exportParams = {
        campaign_id: params?.campaign || '',
        source: platformId || '',
        start_date: params?.date ? moment(params?.date).format('YYYY-MM-DD') : '',
        end_date: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : '',
        period: params?.period,
        keyword_id: keywordId || '',
        page: page,
        limit: 10,
        report_number: reportNo,
        page_name: params?.page?.toString(),
        label: params?.label?.toString(),
        field: fieldName,
        sort: sortSelect
      }
    }
    const options: AxiosRequestConfig = {
      url,
      method,
      responseType: 'blob',
      headers,
      params: exportParams
    }

    return instance
      .request<any>(options)
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        setIsLoading(false)
        saveAs(url, 'Overall Daily Messages.xlsx')
        toast.success('Successfully Downloaded!')
      })
      .catch(() => {
        setIsLoading(false)
        toast.error('Somenthing went wrong')
      })
  }

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
            pt: { xs: 3, sm: 6 },
            position: 'relative'
          }}
        >
          <IconButton size='small' onClick={onCloseDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          {loadingMessageDetail && <LinearProgress style={{ width: '100%' }} />}
          <Box sx={{ mb: 8 }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem', textAlign: 'center' }}>
              <Translations text={cardTitle} />
              {excelExport ? (
                <Button
                  size='small'
                  variant='outlined'
                  color='secondary'
                  onClick={() => {
                    if (excelExport) {
                      excelExport()
                      onCloseDialog()
                    }
                  }}
                  sx={{ marginLeft: '20px' }}
                >
                  <MicrosoftExcel fontSize='medium' sx={{ mr: 2 }} />
                  Excel
                </Button>
              ) : (
                ''
              )}
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={{ maxHeight: '640px' }}>
            <Table style={{ minWidth: '00px' }} aria-label='customized table' stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>No.</StyledTableCell>
                  <StyledTableCell align='center'>Message Detail</StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type =
                        sortColumns.message_type === '' ? 'asc' : sortColumns.message_type === 'asc' ? 'desc' : ''
                      handleButtonSort('message_type', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.message_type === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.message_type === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='Unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      Message Type
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type = sortColumns.author === '' ? 'asc' : sortColumns.author === 'asc' ? 'desc' : ''
                      handleButtonSort('author', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.author === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.author === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      <span style={{ textAlign: 'center' }}>Account Name</span>
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type = sortColumns.date === '' ? 'asc' : sortColumns.date === 'asc' ? 'desc' : ''
                      handleButtonSort('date', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.date === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.date === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      Post Time
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type = sortColumns.device === '' ? 'asc' : sortColumns.device === 'asc' ? 'desc' : ''
                      handleButtonSort('device', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.device === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.device === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      Device
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type = sortColumns.source === '' ? 'asc' : sortColumns.source === 'asc' ? 'desc' : ''
                      handleButtonSort('source', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.source === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.source === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      Channel
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type =
                        sortColumns.engagement === '' ? 'asc' : sortColumns.engagement === 'asc' ? 'desc' : ''
                      handleButtonSort('engagement', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.engagement === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.engagement === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      Engagement
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type = sortColumns.sentiment === '' ? 'asc' : sortColumns.sentiment === 'asc' ? 'desc' : ''
                      handleButtonSort('sentiment', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.sentiment === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.sentiment === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      Sentiment
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type =
                        sortColumns.bully_level === '' ? 'asc' : sortColumns.bully_level === 'asc' ? 'desc' : ''
                      handleButtonSort('bully_level', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.bully_level === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.bully_level === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      Bully Level
                    </span>
                  </StyledTableCell>
                  <StyledTableCell
                    align='center'
                    onClick={() => {
                      const type =
                        sortColumns.bully_type === '' ? 'asc' : sortColumns.bully_type === 'asc' ? 'desc' : ''
                      handleButtonSort('bully_type', type)
                    }}
                  >
                    <span style={{ display: 'flex', justifyContent: 'center' }}>
                      <span className='hidden-button' style={{ margin: 'auto', color: 'grey' }}>
                        {sortColumns.bully_type === 'desc' ? (
                          <Tooltip title='Descending'>
                            <ArrowDown style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : sortColumns.bully_type === 'asc' ? (
                          <Tooltip title='Ascending'>
                            <ArrowUp style={{ fontSize: '20px' }} />
                          </Tooltip>
                        ) : (
                          <Tooltip title='unsort'>
                            <DotsVertical style={{ fontSize: '20px' }} />
                          </Tooltip>
                        )}
                      </span>
                      Bully Type
                    </span>
                  </StyledTableCell>
                  <StyledTableCell align='center'>Link</StyledTableCell>
                  <StyledTableCell align='center'>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(data || []).map((messageDetail: any, index: number) => (
                  <StyledTableRow
                    key={index}
                    hover={true}
                    sx={{
                      cursor: messageDetail.parent ? 'pointer' : '',
                      backgroundColor: messageDetail.parent ? '#00ff0038' : '#fff'
                    }}
                  >
                    <StyledTableCell
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      <b>{index + 1 + (page - 1) * 10}</b>
                    </StyledTableCell>
                    <StyledTableCell
                      component='th'
                      scope='row'
                      width={200}
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      <span
                        style={{
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3
                        }}
                      >
                        {messageDetail.message_detail}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail.message_type || '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail.account_name}
                    </StyledTableCell>

                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {moment(messageDetail.post_date)?.format('DD.MM.YYYY') + ', ' + messageDetail.post_time}
                    </StyledTableCell>

                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setShowDialog(true)
                        }
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
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail?.channel === 'facebook' ? (
                        <img alt={'logo'} width={28} height={28} src={`/images/logos/facebook-round.png`} />
                      ) : messageDetail?.channel === 'twitter' ? (
                        <img alt={'logo'} width={25} height={25} src={`/images/logos/x-black.jpg`} />
                      ) : messageDetail?.channel === 'youtube' ? (
                        <img width={28} height={28} alt={'logo'} src={`/images/logos/youtube-text.png`} />
                      ) : messageDetail?.channel === 'instagram' ? (
                        <img width={28} alt={'logo'} height={28} src={`/images/logos/instagram.png`} />
                      ) : messageDetail?.channel === 'pantip' ? (
                        <img width={28} alt={'logo'} height={28} src={`/images/logos/pantip.png`} />
                      ) : messageDetail?.channel === 'google' ? (
                        <img width={25} alt={'logo'} height={25} src={`/images/logos/google.png`} />
                      ) : messageDetail?.source_name == 'tiktok' ? (
                        <img width={34} alt={'logo'} height={34} src={`/images/logos/tiktok.png`} />
                      ) : (
                        <span style={{ textTransform: 'uppercase' }}>{messageDetail?.channel}</span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail.engagement || '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail.sentiment || '-'}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail.bully_level}
                    </StyledTableCell>
                    <StyledTableCell
                      align='center'
                      onClick={() => {
                        if (messageDetail.parent) {
                          setMessageId(messageDetail.message_id)
                          setShowDialog(true)
                        }
                      }}
                    >
                      {messageDetail.bully_type}
                    </StyledTableCell>

                    <StyledTableCell align='center'>
                      {messageDetail.link_message ? (
                        <a
                          href={messageDetail.link_message}
                          onClick={event => {
                            event.stopPropagation()
                          }}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <OpenInNew style={{ color: '#0047ff9e' }} />
                        </a>
                      ) : (
                        ''
                      )}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <a
                        onClick={() => {
                          setDeleteMsgId(messageDetail.id)
                          setShowConfirm(true)
                        }}
                        target='_self'
                        rel='noopener noreferrer'
                      >
                        <TrashCanOutline style={{ color: 'grey' }} />
                      </a>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={pageCount}
              page={page}
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

      {showConfirm ? (
        <DeleteConfirmDialog
          showDialog={showConfirm}
          setShowDialog={setShowConfirm}
          id={deleteMsgId}
          reload={reload}
          setReload={setReload}
        />
      ) : (
        ''
      )}
    </Card>
  )
}

export default MessageDetail
