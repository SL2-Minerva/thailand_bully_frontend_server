import { forwardRef, ReactElement, Ref, useEffect, useState } from 'react'
import Fade, { FadeProps } from '@mui/material/Fade'
import {
  Box,
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
import DialogNetworkGraph from '../dashboard/DialogNetworkGraph'
import { GetMessageDetailSentimentDashboard } from 'src/services/api/dashboards/overall/overallDashboardApi'
import moment from 'moment'
import Translations from 'src/layouts/components/Translations'
import { ArrowDown, ArrowUp, DotsVertical, OpenInNew } from 'mdi-material-ui'
import { initialSort, StyledTableCell, StyledTableRow } from '../dashboard/DailyMessageDetail'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

// import { GridColDef } from '@mui/x-data-grid'
// import { StyledDataGrid } from '../dashboard/DailyMessageDetail'

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
}

const MessageDetail = (props: DialogInfoProps) => {
  const { show, setShow, current, params, paramsId, setParamsId, reportNo, title, networkTitle } = props
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [page, setPage] = useState(0)
  const [messageId, setMessageId] = useState<number | string>()
  const [pageCount, setPageCount] = useState<number>(0)
  const [data, setData] = useState<any>([])
  const [fieldName, setFieldName] = useState<string>('')
  const [sortSelect, setSortSelect] = useState('')
  const [sortColumns, setSortColumn] = useState<any>(initialSort)

  const handleButtonSort = (field: string, sortName: string) => {
    setFieldName(field)
    setSortSelect(sortName)
    setSortColumn({ ...initialSort, [field]: sortName })
  }

  let paramData: any = {}
  const todayDate = new Date()
  paramData.Llabel = ''
  if (params?.period === 'customrange' && params?.previousDate !== todayDate && params?.previousEndDate !== todayDate) {
    paramData = {
      campaign_id: params?.campaign || '',
      source: paramsId?.sourceId || '',
      start_date: params?.date ? moment(params?.date).format('YYYY-MM-DD') : '',
      end_date: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : '',
      period: params?.period,
      keyword_id: paramsId?.keywordId || '',
      organization_id: paramsId?.organization_id || '',
      classification_id: paramsId?.classification_id || '',
      start_date_period: params?.previousDate ? moment(params?.previousDate).format('YYYY-MM-DD') : '',
      end_date_period: params?.previousEndDate ? moment(params?.previousEndDate).format('YYYY-MM-DD') : '',
      page: page,
      limit: 10,
      report_number: reportNo,
      page_name: params?.page,
      label: params?.label,
      field: fieldName,
      sort: sortSelect
    }
  } else {
    paramData = {
      campaign_id: params?.campaign || '',
      source: paramsId?.sourceId || '',
      start_date: params?.date ? moment(params?.date).format('YYYY-MM-DD') : '',
      end_date: params?.endDate ? moment(params?.endDate).format('YYYY-MM-DD') : '',
      period: params?.period,
      keyword_id: paramsId?.keywordId || '',
      classification_id: paramsId?.classification_id || '',
      organization_id: paramsId?.organization_id || '',
      page: page,
      limit: 10,
      report_number: reportNo,
      page_name: params?.page,
      label: params?.label,
      field: fieldName,
      sort: sortSelect
    }
  }

  // const columns: GridColDef[] = [
  //   {
  //     field: 'id',
  //     headerName: '#',
  //     sortable: false,
  //     renderCell: index => index.api.getRowIndex(index.row.id) + 1 + +page * 10
  //   },
  //   {
  //     field: 'message_detail',
  //     headerName: 'Message Detail',
  //     flex: 1,
  //     align: 'left',
  //     headerAlign: 'center',
  //     sortable: false,
  //     minWidth: 300,
  //     renderCell: params => (
  //       <span
  //         style={{
  //           overflow: 'hidden',
  //           display: '-webkit-box',
  //           WebkitBoxOrient: 'vertical',
  //           WebkitLineClamp: 3,
  //           whiteSpace: 'pre-wrap'
  //         }}
  //       >
  //         {params.row.message_detail}
  //       </span>
  //     )
  //   },
  //   {
  //     field: 'message_type',
  //     headerName: 'Message Type',
  //     flex: 1,
  //     align: 'center',
  //     headerAlign: 'center'
  //   },
  //   {
  //     field: 'account_name',
  //     minWidth: 210,
  //     headerName: 'Account Name',
  //     flex: 1,
  //     align: 'center',
  //     headerAlign: 'center'
  //   },
  //   {
  //     field: 'post_time',
  //     headerName: 'Post Time',
  //     flex: 1,
  //     align: 'center',
  //     headerAlign: 'center',
  //     renderCell: params => (
  //       <span>
  //         {' '}
  //         {moment(params.row.post_date).format('DD.MM.YYYY')} <br /> {params.row.post_time}
  //       </span>
  //     )
  //   },
  //   {
  //     field: 'device',
  //     headerName: 'Deivce',
  //     flex: 1,
  //     align: 'center',
  //     headerAlign: 'center',
  //     renderCell: params => (
  //       <span>
  //         {params.row.device === 'android' ? (
  //           <img alt={'logo'} width={25} height={25} src={`/images/logos/android.png`} />
  //         ) : params.row.device === 'webapp' || params.row.device === 'website' ? (
  //           <img alt={'logo'} width={25} height={25} src={`/images/logos/website.png`} />
  //         ) : params.row.device === 'iphone' || params.row.device === 'iOS' || params.row.device === 'ios' ? (
  //           <img alt={'logo'} width={25} height={25} src={`/images/logos/ios.png`} />
  //         ) : (
  //           '-'
  //         )}
  //       </span>
  //     )
  //   },
  //   {
  //     field: 'channel',
  //     headerName: 'Channel',
  //     flex: 1,
  //     align: 'center',
  //     headerAlign: 'center',
  //     renderCell: params => (
  //       <span>
  //         {params.row?.channel === 'facebook' ? (
  //           <img alt={'logo'} width={28} height={28} src={`/images/logos/facebook-round.png`} />
  //         ) : params.row?.channel === 'twitter' ? (
  //           <img alt={'logo'} width={25} height={25} src={`/images/logos/twitter.png`} />
  //         ) : params.row?.channel === 'youtube' ? (
  //           <img width={28} height={28} alt={'logo'} src={`/images/logos/youtube-text.png`} />
  //         ) : params.row?.channel === 'instagram' ? (
  //           <img width={28} alt={'logo'} height={28} src={`/images/logos/instagram.png`} />
  //         ) : params.row?.channel === 'pantip' ? (
  //           <img width={28} alt={'logo'} height={28} src={`/images/logos/pantip.png`} />
  //         ) : params.row?.channel === 'google' ? (
  //           <img width={25} alt={'logo'} height={25} src={`/images/logos/google.png`} />
  //         ) : (
  //           <span style={{ textTransform: 'uppercase' }}>{params.row?.channel}</span>
  //         )}
  //       </span>
  //     )
  //   },
  //   {
  //     field: 'engagement',
  //     headerName: 'Engagement',
  //     flex: 1,
  //     align: 'center',
  //     headerAlign: 'center'
  //   },
  //   {
  //     field: 'sentiment',
  //     headerName: 'Sentiment',
  //     flex: 1,
  //     align: 'center',
  //     headerAlign: 'center'
  //   },
  //   {
  //     field: 'bully_level',
  //     headerName: 'Bully Level',
  //     flex: 1,
  //     align: 'center',
  //     headerAlign: 'center'
  //   },
  //   {
  //     field: 'bully_type',
  //     headerName: 'Bully Type',
  //     flex: 1,
  //     align: 'center',
  //     headerAlign: 'center'
  //   },
  //   {
  //     field: 'link_message',
  //     headerName: 'Link',
  //     flex: 1,
  //     align: 'center',
  //     headerAlign: 'center',
  //     sortable: false,
  //     renderCell: params => (
  //       <span>
  //         {params.row.link_message ? (
  //           <a
  //             href={params.row.link_message}
  //             target='_blank'
  //             rel='noopener noreferrer'
  //             onClick={event => {
  //               event.stopPropagation()
  //             }}
  //           >
  //             <OpenInNew style={{ color: '#0047ff9e' }} />
  //           </a>
  //         ) : (
  //           ''
  //         )}
  //       </span>
  //     )
  //   }
  // ]

  if (params?.Llabel) {
    paramData.Llabel = params?.Llabel
  }
  const { resultMessageDetail, totalMessage, loadingMessageDetail } = GetMessageDetailSentimentDashboard(paramData)

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
        <DialogContent sx={{ pb: 6, pt: { xs: 3, sm: 6 }, position: 'relative' }}>
          <IconButton size='small' onClick={onCloseDialog} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Close />
          </IconButton>
          {loadingMessageDetail && <LinearProgress style={{ width: '100%' }} />}
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              <Translations text={title || 'Daily Messages: Message Transactions'} />
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
                </TableRow>
              </TableHead>
              <TableBody>
                {(data || []).map((messageDetail: any, index: number) => (
                  <StyledTableRow
                    key={index}
                    hover={true}
                    onClick={() => {
                      if (messageDetail.parent) {
                        setMessageId(messageDetail.message_id)
                        setShowDialog(true)
                      }
                    }}
                    sx={{
                      cursor: messageDetail.parent ? 'pointer' : '',
                      backgroundColor: messageDetail.parent ? '#00ff0038' : '#fff'
                    }}
                  >
                    <StyledTableCell>
                      <b>{index + 1 + page * 10}</b>
                    </StyledTableCell>
                    <StyledTableCell component='th' scope='row' width={300}>
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
                    <StyledTableCell align='center'>{messageDetail.message_type || '-'}</StyledTableCell>
                    <StyledTableCell align='center'>{messageDetail.account_name}</StyledTableCell>

                    <StyledTableCell align='center'>
                      {moment(messageDetail.post_date)?.format('DD.MM.YYYY') + ', ' + messageDetail.post_time}
                    </StyledTableCell>

                    <StyledTableCell align='center'>
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
                    <StyledTableCell align='center'>
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
                    <StyledTableCell align='center'>{messageDetail.engagement || '-'}</StyledTableCell>
                    <StyledTableCell align='center'>{messageDetail.sentiment || '-'}</StyledTableCell>
                    <StyledTableCell align='center'>{messageDetail.bully_level}</StyledTableCell>
                    <StyledTableCell align='center'>{messageDetail.bully_type}</StyledTableCell>

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
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* {resultMessageDetail ? (
            <StyledDataGrid
              autoHeight
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={row => row.id}
              hideFooterPagination={true}
              disableColumnMenu={true}
              sx={{
                '.highlight': {
                  cursor: 'pointer',
                  bgcolor: '#00ff0038'
                }
              }}
              getRowClassName={params => {
                return params.row.parent ? 'highlight' : ''
              }}
              onRowClick={params => {
                if (params.row.parent) {
                  setMessageId(params.row.message_id)
                  setShowDialog(true)
                }
              }}
            />
          ) : (
            <Typography variant='body1' sx={{ textAlign: 'center' }}>
              There is no data
            </Typography>
          )} */}

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
        <DialogNetworkGraph
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
