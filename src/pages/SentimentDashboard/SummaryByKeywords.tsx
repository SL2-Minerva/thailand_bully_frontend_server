import { Grid, Button, LinearProgress } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import React, { useEffect, useState } from 'react'
import { DataGrid, GridValueGetterParams } from '@mui/x-data-grid'
import clsx from 'clsx'
import { createTheme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

const defaultTheme = createTheme()
const useStyles = makeStyles(
  () =>
    createStyles({
      root: {
        border: `1px solid #cccc00`,
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: 26,
        borderRadius: 2
      },
      value: {
        position: 'absolute',
        lineHeight: '24px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
      },
      bar: {
        height: '100%',
        '&.low': {
          backgroundColor: '#cccc00'
        },
        '&.medium': {
          backgroundColor: '#cccc00'
        },
        '&.high': {
          backgroundColor: '#cccc00'
        }
      }
    }),
  { defaultTheme }
)
interface ProgressBarProps {
  value: number
}

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value } = props
  const valueInPercent = value
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.value}>{`${valueInPercent.toLocaleString()} %`}</div>
      <div
        className={clsx(classes.bar, {
          low: valueInPercent < 30,
          medium: valueInPercent >= 30 && valueInPercent <= 70,
          high: valueInPercent > 70
        })}
        style={{ maxWidth: `${valueInPercent}%` }}
      />
    </div>
  )
})
export function renderProgress(params: any) {
  return <ProgressBar value={Number(params.value)!} />
}

const SummaryByKeywords = ({
  resultSummaryByKeywords,
  total,
  loadingSummaryByKeywords,
  chartId,
  highlight
}: {
  params: any
  chartId: string
  highlight: boolean
  resultSummaryByKeywords: any
  total: number
  loadingSummaryByKeywords: boolean
}) => {
  const [topKeyword, setTopKeyword] = useState<string>('all')

  // const [page, setPage] = useState(0);
  // const [pageCount, setPageCount] = useState<number>(0);

  const handleTopKeyword = (data: string) => {
    setTopKeyword(data)
  }

  // const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
  //     setPage(value-1);
  // };

  useEffect(() => {
    if (total > 0) {
      // setPageCount(Math.ceil(total / 10));
    }
  }, [total])

  const reportNo = '5.2.019'

  const title = chartId + ', Report Level 2(' + reportNo + ')'

  const columns = [
    { field: 'keyword_name', headerName: 'Keywords', flex: 1, sortable: false },
    { field: 'total_messages', headerName: 'Total Message', flex: 1 },
    {
      field: 'percentage',
      headerName: ' %',
      flex: 1,
      valueGetter: (params: GridValueGetterParams) => `${params.row.percentage + '%'}`
    },
    { field: 'positive', headerName: ' Positive', flex: 1, renderCell: renderProgress },
    { field: 'neutral', headerName: ' Neutral', flex: 1, renderCell: renderProgress },
    { field: 'negative', headerName: ' Negative', flex: 1, renderCell: renderProgress }
  ]

  return (
    <Card>
      {loadingSummaryByKeywords && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title='Sentiment Type by Keyword'
          titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip arrow title={title || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <Grid container spacing={3} mt={2} mb={3}>
          <Grid item xs={12} md={12} sx={{ display: 'flex', justifyContent: 'end' }}>
            <span style={{ marginTop: '7px', marginRight: '20px', fontSize: '20px' }}> Select </span>
            <Button
              variant='contained'
              color={topKeyword === 'top10' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeyword('top10')
              }}
            >
              {' '}
              Top 10
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'top20' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeyword('top20')
              }}
            >
              {' '}
              Top 20
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'top50' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeyword('top50')
              }}
            >
              {' '}
              Top 50
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'top100' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeyword('top100')
              }}
            >
              {' '}
              Top 100
            </Button>
            <Button
              variant='contained'
              color={topKeyword === 'all' ? 'warning' : 'inherit'}
              size='medium'
              sx={{ marginRight: '20px' }}
              onClick={() => {
                handleTopKeyword('all')
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
                            <TableCell variant="head"> Keywords </TableCell>
                            <TableCell variant="head"> Total Message </TableCell>
                            <TableCell variant="head"> % </TableCell>
                            <TableCell variant="head"> Positive </TableCell>
                            <TableCell variant="head"> Neutral </TableCell>
                            <TableCell variant="head"> Negative </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (resultSummaryByKeywords||[])?.map((summary: any, index:any) => {
                                return(
                                    <TableRow key={index}>
                                        <TableCell><b>{summary.keyword_name}</b></TableCell>
                                        <TableCell>{summary.total_messages}</TableCell>
                                        <TableCell>{summary.percentage}%</TableCell>
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
        {resultSummaryByKeywords ? (
          <DataGrid
            autoHeight
            rows={resultSummaryByKeywords}
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

export default SummaryByKeywords
