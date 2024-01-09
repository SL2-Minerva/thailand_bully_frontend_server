import { LinearProgress, Typography, Paper } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Translations from 'src/layouts/components/Translations'
import { useEffect } from 'react'
import { GetEngagementPostMonitoring } from 'src/services/api/dashboards/monitoring/MonitoringDashboard'

// import { Box, LinearProgress, Pagination, Typography, Paper } from '@mui/material'

const EngagementMonitoring = ({
  page,
  setPageCount,
  apiParams,
  topKeyword
}: //   params
// setPage,
//   pageCount,
{
  topKeyword: string
  params: any
  chartId: string
  highlight: boolean
  page: number
  setPage: any
  pageCount: number
  setPageCount: any
  apiParams: any
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
      field: 'message_detail',
      headerName: 'Message Detail',
      flex: 1,
      headerAlign: 'center'

      //   valueGetter: (params: GridValueGetterParams) => `${params.row.total?.toLocaleString('en-US')}`
    },
    { field: 'post_time', headerName: 'Post Time', flex: 1, headerAlign: 'center' },
    { field: 'engagement', headerName: 'Engagement', flex: 1, headerAlign: 'center' },
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

  //   const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
  //     setPage(value)
  //   }

  useEffect(() => {
    // if (resultSummary?.total > 0) {
    //   setPageCount(Math.ceil(resultSummary?.total / 10))
    // }
    console.log('result Summary', resultSummary)
    if (resultSummary?.length > 0) {
      setPageCount(Math.ceil(resultSummary?.length / 10))
    }
  }, [resultSummary])

  return (
    <Paper style={{ border: `3px solid #fff`, borderRadius: 7 }}>
      {loadingSummary && <LinearProgress style={{ width: '100%' }} />}
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
    </Paper>
  )
}

export default EngagementMonitoring
