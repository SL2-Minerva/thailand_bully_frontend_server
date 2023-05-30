import { Box, LinearProgress, Pagination, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'
import Translations from 'src/layouts/components/Translations'
import { useEffect } from 'react'

const EngagementSummary = ({
  resultSummary,
  loadingSummary,
  highlight,
  page, 
  setPage, 
  pageCount, 
  setPageCount
}: {
  topKeyword: string
  params: any
  chartId: string
  highlight: boolean
  resultSummary: any
  loadingSummary: boolean
  page: number
  setPage: any
  pageCount: number
  setPageCount: any
}) => {
  
  // const reportNo = '4.2.025'

  const columns: GridColDef[] = [
    {
      field: 'infulencer',
      headerName: 'Influencer',
      flex: 1,
      sortable: false,
      headerAlign: 'center'
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.total?.toLocaleString('en-US')}`
    },
    { field: 'share', headerName: 'Share', flex: 1, headerAlign: 'center' },
    { field: 'comment', headerName: 'Comment', flex: 1, headerAlign: 'center' },
    { field: 'reaction', headerName: 'Reaction', flex: 1, headerAlign: 'center' },

    {
      field: 'period_over_preiod',
      headerName: 'Period over Period',
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.period_over_preiod}`
    },

    {
      field: 'period_over_period_percentage',
      headerName: 'Period over Period (%)',
      flex: 1,
      headerAlign: 'center',
      valueGetter: (params: GridValueGetterParams) => `${params.row.period_over_period_percentage}`
    }
  ]

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  useEffect(() => {
    if (resultSummary?.total > 0) {
      setPageCount(Math.ceil(resultSummary?.total / 10))
    }
  }, [resultSummary])

  return (
    <Card>
      {loadingSummary && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Summary Engagement By Account' />}
          titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip
          arrow
          title={
            <span>
              <span>
                <Typography variant='h6' sx={{ color: 'white' }}>
                  <Translations text='engagementChart21Title' />
                </Typography>
                <Typography variant='body2' sx={{ color: 'white' }}>
                  <Translations text='engagementChart21Description' />
                </Typography>
              </span>
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        {resultSummary ? (
          <>
            <DataGrid
              autoHeight
              rows={resultSummary?.data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              hideFooterPagination={true}
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

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {resultSummary?.total > 0 ? (
            <Pagination
              count={pageCount}
              page={page + 1}
              onChange={handleChangePagination}
              variant='outlined'
              color='primary'
            />
          ) : (
            ''
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default EngagementSummary
