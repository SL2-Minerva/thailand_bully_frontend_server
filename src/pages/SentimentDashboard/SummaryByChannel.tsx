import { Grid, Button, LinearProgress } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { useEffect } from 'react'
import { changeToFixedValue, renderProgress } from './SummaryByKeywords'
import { DataGrid } from '@mui/x-data-grid'
import Translations from 'src/layouts/components/Translations'

const SummaryByChannel = ({
  resultSummaryByChannel,
  total,
  loadingSummaryByChannel,
  chartId,
  highlight,
  topChannel,
  setTopChannel
}: {
  params: any
  chartId: string
  highlight: boolean
  resultSummaryByChannel: any
  total: number
  loadingSummaryByChannel: boolean
  topChannel: string
  setTopChannel: any
}) => {
  // const [page, setPage] = useState(0);
  // const [pageCount, setPageCount] = useState<number>(0);
  const handleTopChannels = (data: string) => {
    setTopChannel(data)
  }

  // const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
  //     setPage(value-1);
  // };

  useEffect(() => {
    if (total > 0) {
      // setPageCount(Math.ceil(total / 10));
    }
  }, [total])

  const reportNo = '5.2.018'

  const columns = [
    { field: 'channel', headerName: 'Channel', flex: 1, sortable: false },
    { field: 'sentiment_score', headerName: 'Sentiment Score ', flex: 1, renderCell: changeToFixedValue },
    { field: 'positive', headerName: ' Positive', flex: 1, renderCell: renderProgress },
    { field: 'neutral', headerName: ' Neutral', flex: 1, renderCell: renderProgress },
    { field: 'negative', headerName: ' Negative', flex: 1, renderCell: renderProgress }
  ]

  return (
    <Card>
      {loadingSummaryByChannel && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Summary Sentiment Score by Channel' />}
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
              color={topChannel === 'top10' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopChannels('top10')
              }}
            >
              {' '}
              Top 10
            </Button>
            <Button
              variant='contained'
              color={topChannel === 'top20' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopChannels('top20')
              }}
            >
              {' '}
              Top 20
            </Button>
            <Button
              variant='contained'
              color={topChannel === 'top50' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopChannels('top50')
              }}
            >
              {' '}
              Top 50
            </Button>
            <Button
              variant='contained'
              color={topChannel === 'top100' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopChannels('top100')
              }}
            >
              {' '}
              Top 100
            </Button>
            <Button
              variant='contained'
              color={topChannel === 'all' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopChannels('all')
              }}
            >
              {' '}
              ALL{' '}
            </Button>
          </Grid>
        </Grid>
        {/* <TableContainer sx={{ maxHeight: 500 }}>
            <Table size="small" stickyHeader={true}>
                    <TableHead style={{ backgroundColor: "green"}}>
                        <TableRow>
                            <TableCell variant="head"> Channel </TableCell>
                            <TableCell variant="head"> Sentiment Score </TableCell>
                            <TableCell variant="head"> Positive </TableCell>
                            <TableCell variant="head"> Neutral </TableCell>
                            <TableCell variant="head"> Negative </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (resultSummaryByChannel||[])?.map((summary: any, index:any) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell><b>{summary.channel}</b></TableCell>
                                        <TableCell>{summary.sentiment_score}</TableCell>
                                        <TableCell>
                                            <LinearProgressBar value={summary.positive} />
                                        </TableCell>
                                        <TableCell>
                                            <LinearProgressBar value={summary.neutral} />
                                        </TableCell>
                                        <TableCell>
                                             <LinearProgressBar value= {summary.negative} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    
            </Table>
            </TableContainer>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center'}}> 
                {
                    total > 0 ? 
                    <Pagination count={pageCount} page={page+1} onChange={handleChangePagination} variant='outlined' color='primary'/>
                    : ""
                }
            </Box> */}
        {resultSummaryByChannel ? (
          <DataGrid
            autoHeight
            rows={resultSummaryByChannel}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={row => row.id}
          />
        ) : (
          ''
        )}
      </CardContent>
    </Card>
  )
}

export default SummaryByChannel
