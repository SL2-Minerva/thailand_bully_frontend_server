import { LinearProgress } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetWordClouds } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'
import { DataGrid } from '@mui/x-data-grid'

const TotalMessageLists = ({ params, chartId }: { params: any; chartId: string }) => {
  const { loadingWordClouds, wordCloudTable } = GetWordClouds(
    params?.campaign,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.topKeyword,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordIds
  )
  const reportNo = '1.2.022'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'keyword', headerName: 'Keyword', flex: 1 },
    { field: 'total', headerName: ' จํานวน Keyword ', flex: 1 },
    { field: 'percent', headerName: ' %', flex: 1 }
  ]

  return (
    <Card sx={{ maxHeight: 450, minHeight: 450 }}>
      {loadingWordClouds && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Top10 Match: Keyword vs. Message' />}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <StyledTooltip arrow title={chartTitle}>
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        {/* <TableContainer sx={{ maxHeight: 300 , p: 4}}>
          <Table size='small' stickyHeader={true}>
            <TableHead sx={{ backgroundColor: 'lightgrey !important' }}>
              <TableRow>
                <TableCell variant='head'> No. </TableCell>
                <TableCell variant='head'> Keyword </TableCell>
                <TableCell variant='head'> จํานวน Keyword </TableCell>
                <TableCell variant='head'> % </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(resultWordClouds?.word_clouds_table || [])?.map((keyword: any, index: any) => {
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ backgroundColor: 'lightgrey !important' }}>
                      <b>{index + 1}</b>
                    </TableCell>
                    <TableCell> {keyword.keyword}</TableCell>
                    <TableCell>{keyword.total}</TableCell>
                    <TableCell>{keyword.percent} %</TableCell>
                  </TableRow>
                )
              })}
              {!resultWordClouds?.word_clouds_table || resultWordClouds?.word_clouds_table?.length == 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                    There is no data
                  </TableCell>
                </TableRow>
              ) : (
                ''
              )}
            </TableBody>
          </Table>
        </TableContainer> */}

        {wordCloudTable.length > 0 ? (
          <DataGrid
            autoHeight
            rows={wordCloudTable}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={row => row.id}
          />
        ) : (
          <div
            style={{
              padding: '130px 0',
              textAlign: 'center',
              verticalAlign: 'middle',
              color: '#80808059'
            }}
          >
            <Translations text='no data' />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TotalMessageLists
