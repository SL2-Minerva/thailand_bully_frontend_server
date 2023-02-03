import { LinearProgress } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid'
import Translations from 'src/layouts/components/Translations'

const EngagementSummary = ({
  resultSummary,
  loadingSummary,
  chartId,
  highlight
}: {
  topKeyword: string
  params: any
  chartId: string
  highlight: boolean
  resultSummary: any
  loadingSummary: boolean
}) => {
  // const [page, setPage] = useState(0);
  // const [pageCount, setPageCount] = useState<number>(0);

  // const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
  //     setPage(value-1);
  // };

  // useEffect(()=> {
  //     if (totalSummary > 0) {
  //     //  setPageCount(Math.ceil(totalSummary / 10));
  //     }
  // }, [totalSummary]);

  const reportNo = '4.2.025'

  const title = chartId + ', Report Level 2(' + reportNo + ')'

  const columns = [
    { field: 'infulencer', headerName: 'Influencer', flex: 1, sortable: false },
    { field: 'total', headerName: 'Total', flex: 1 },
    { field: 'share', headerName: 'Share', flex: 1 },
    { field: 'comment', headerName: 'Comment', flex: 1 },
    { field: 'reaction', headerName: 'Reaction', flex: 1 },

    {
      field: 'period_over_preiod',
      headerName: 'Period over Period',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => `${params.row.period_over_preiod}`
    },

    {
      field: 'period_over_period_percentage',
      headerName: 'Period over Period (%)',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => `${params.row.period_over_period_percentage}`
    }
  ]

  return (
    <Card>
      {loadingSummary && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Summary Engagement By Account'/>}
          titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip arrow title={title || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        {/* <TableContainer sx={{ maxHeight: 250 }}>
            <Table size="small" stickyHeader={true}>
                    <TableHead style={{ backgroundColor: "green"}}>
                        <TableRow>
                            <TableCell variant="head"> Influencer </TableCell>
                            <TableCell variant="head"> Total </TableCell>
                            <TableCell variant="head"> Share </TableCell>
                            <TableCell variant="head"> Comment </TableCell>
                            <TableCell variant="head"> Reaction </TableCell>
                            <TableCell variant="head"> Period over Period </TableCell>
                            <TableCell variant="head"> Period over Period (%) </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (resultSummary||[])?.map((summary: any, index:any) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell><b>{summary.infulencer}</b></TableCell>
                                        <TableCell>{summary.total}</TableCell>
                                        <TableCell>{summary.share}</TableCell>
                                        <TableCell>{summary.comment}</TableCell>
                                        <TableCell>{summary.reaction}</TableCell>
                                        <TableCell>{summary.period_over_preiod}</TableCell>
                                        <TableCell>{summary.period_over_period_percentage} %</TableCell>

                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    
            </Table>
            </TableContainer>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center'}}> 
            {
                totalSummary > 0 ? 
                <Pagination count={pageCount} page={page+1} onChange={handleChangePagination} variant='outlined' color='primary'/>
                : ""
            }
            </Box> */}
        {resultSummary ? (
          <DataGrid
            autoHeight
            rows={resultSummary}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={row => row.message_id}
          />
        ) : (
          ''
        )}
      </CardContent>
    </Card>
  )
}

export default EngagementSummary
