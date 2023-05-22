import { Grid, Button, LinearProgress } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { useEffect } from 'react'
import { changeToFixedValue, renderProgress } from './SummaryByKeywords'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import Translations from 'src/layouts/components/Translations'

const SummaryByAccount = ({
  resultSummaryByAccount,
  total,
  loadingSummaryByAccount,
  chartId,
  highlight,
  topAccount,
  setTopAccount
}: {
  params: any
  chartId: string
  highlight: boolean
  resultSummaryByAccount: any
  total: number
  loadingSummaryByAccount: boolean
  topAccount: string
  setTopAccount: any
}) => {
  // const [page, setPage] = useState(0);
  // const [pageCount, setPageCount] = useState<number>(0);

  const handleTopAccounts = (data: string) => {
    setTopAccount(data)
  }

  // const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
  //     setPage(value-1);
  // };

  useEffect(() => {
    if (total > 0) {
      // setPageCount(Math.ceil(total / 10));
    }
  }, [total])

  const reportNo = '5.2.017'

  const columns: GridColDef[] = [
    { field: 'infulencer', headerName: 'Influencer', flex: 1, sortable: false },
    {
      field: 'sentiment_score',
      headerName: 'Sentiment Score ',
      flex: 1,
      renderCell: changeToFixedValue,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'positive',
      headerName: ' Positive',
      flex: 1,
      renderCell: renderProgress,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'neutral',
      headerName: ' Neutral',
      flex: 1,
      renderCell: renderProgress,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'negative',
      headerName: ' Negative',
      flex: 1,
      renderCell: renderProgress,
      align: 'center',
      headerAlign: 'center'
    }
  ]

  return (
    <Card>
      {loadingSummaryByAccount && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Summary Sentiment Score by Account' />}
          titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip
          arrow
          title={
            <span>
              {chartId} <br /> {' Report Level 2(' + reportNo + ')'}
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <Grid container spacing={3} mt={2} mb={3}>
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <span style={{ marginTop: '7px', marginRight: '20px', fontSize: '20px' }}> Select </span>
            <Button
              variant='contained'
              color={topAccount === 'top10' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopAccounts('top10')
              }}
            >
              {' '}
              Top 10
            </Button>
            <Button
              variant='contained'
              color={topAccount === 'top20' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopAccounts('top20')
              }}
            >
              {' '}
              Top 20
            </Button>
            <Button
              variant='contained'
              color={topAccount === 'top50' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopAccounts('top50')
              }}
            >
              {' '}
              Top 50
            </Button>
            <Button
              variant='contained'
              color={topAccount === 'top100' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopAccounts('top100')
              }}
            >
              {' '}
              Top 100
            </Button>
            <Button
              variant='contained'
              color={topAccount === 'all' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopAccounts('all')
              }}
            >
              {' '}
              ALL{' '}
            </Button>
          </Grid>
        </Grid>

        {resultSummaryByAccount ? (
          <DataGrid
            autoHeight
            rows={resultSummaryByAccount}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={row => row.id}
          />
        ) : (
          'There is no data'
        )}
      </CardContent>
    </Card>
  )
}

export default SummaryByAccount
