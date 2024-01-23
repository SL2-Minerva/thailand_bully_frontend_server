import { LinearProgress, Typography, Paper, Button } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Translations from 'src/layouts/components/Translations'
import { useEffect, useState } from 'react'
import { GetEngagementPostMonitoring } from 'src/services/api/dashboards/monitoring/MonitoringDashboard'
import DetailPostEgagement from './DetailPostEngagement'
import ExportExcel from '../VoiceDashboard/ExportExcel'

// import { Box, LinearProgress, Pagination, Typography, Paper } from '@mui/material'

const EngagementMonitoring = ({
  page,
  setPageCount,
  apiParams,
  topKeyword,
  params, 
  select, 
  setAnchorEl,
  setIsLoading
}:
{
  topKeyword: string
  params: any
  chartId: string
  highlight: boolean
  page: number
  setPage: any
  pageCount: number
  setPageCount: any
  apiParams: any,
  setAnchorEl: any, 
  select: any,
  setIsLoading: any
}) => {
  // const reportNo = '4.2.025'

  const columns: GridColDef[] = [
    {
      field: 'account_name',
      headerName: 'Account Name',
      flex: 1,
      sortable: false,
      headerAlign: 'center'
    },
    {
      field: 'full_message',
      headerName: 'Message Detail',
      flex: 1,
      headerAlign: 'center'

      //   valueGetter: (params: GridValueGetterParams) => `${params.row.total?.toLocaleString('en-US')}`
    },
    { field: 'post_time', headerName: 'Post Time', flex: 1, headerAlign: 'center' },
    { field: 'total_engagement', headerName: 'Total Engagement', flex: 1, headerAlign: 'center' },
    { field: 'sentiment', headerName: 'Sentiment', flex: 1, headerAlign: 'center' },

    {
      field: 'bully_level',
      headerName: 'Bully Level',
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.bully_level}`
    },

    {
      field: 'bully_type',
      headerName: 'Bully Type',
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.bully_type}`
    }
  ]

  const { resultSummary, loadingSummary } = GetEngagementPostMonitoring(apiParams, topKeyword, page)
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [messageId, setMessageId] = useState<string>('')

  //   const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
  //     setPage(value)
  //   }

  const handleRowClick = (
    params: any // GridRowParams
    // event: any, // MuiEvent<React.MouseEvent<HTMLElement>>
    // details: any // GridCallbackDetails
  ) => {
    const message_id = params?.row?.id
    if (message_id) {
      setShowDetail(true)
      setMessageId(message_id)
    }
  }

  useEffect(() => {
    if (resultSummary?.length > 0) {
      setPageCount(Math.ceil(resultSummary?.length / 10))
    }
  }, [resultSummary])

  return (
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
      {loadingSummary && <LinearProgress style={{ width: '100%' }} />}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title={<Translations text='Summary Engagement of Post Monitoring' />}
            titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip
            arrow
            title={
              <span>
                <span>
                  <Typography variant='h6' sx={{ color: 'white' }}>
                    <Translations text='Engagement of Post Monitoring' />
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'white' }}>
                    <Translations text='Engagement of Post Monitoring' />
                  </Typography>
                </span>
              </span>
            }
          >
            <Information style={{ marginTop: '22px', fontSize: '29px' }} />
          </StyledTooltip>
        </span>

        <Button variant='contained' color='warning' sx={{ m: 2 }} size='small'>
          <ExportExcel
            setIsLoading={setIsLoading}
            params={params}
            apiParams={apiParams}
            reportNo={''}
            setAnchorEl={setAnchorEl}
            select={select}
            fileName='Summary Engagement of Post Monitoring.xlsx'
            apiPath='/dashboard-monitoring/engagements/export'
          />
        </Button>
      </div>

      <CardContent>
        {resultSummary?.length > 0 ? (
          <>
            <DataGrid
              autoHeight
              rows={resultSummary}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              hideFooterPagination={false}
              getRowId={row => row.message_id}
              sx={{
                '& .MuiDataGrid-cell': {
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center'
                }
              }}
              onRowClick={handleRowClick}
            />
          </>
        ) : (
          <div
            style={{
              height: 300,
              padding: '170px 0',
              textAlign: 'center',
              verticalAlign: 'middle',
              color: '#80808059'
            }}
          >
            <Translations text='no data' />
          </div>
        )}

        {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {resultSummary?.length > 0 ? (
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChangePagination}
              variant='outlined'
              color='primary'
            />
          ) : (
            ''
          )}
        </Box> */}
      </CardContent>

      {showDetail && messageId ? (
        <DetailPostEgagement show={showDetail} setShow={setShowDetail} messageId={messageId} params={apiParams} />
      ) : (
        ''
      )}
    </Paper>
  )
}

export default EngagementMonitoring
