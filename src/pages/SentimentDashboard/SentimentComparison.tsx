// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Box, Grid, LinearProgress, Pagination, Typography } from '@mui/material'
import { Table, TableRow, TableHead, TableCell } from '@mui/material'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GetSentimentComparison } from 'src/services/api/dashboards/sentiment/sentimentDashboard'
import { useEffect, useState } from 'react'
import Translations from 'src/layouts/components/Translations'

const SentimentComparisonTable = ({
  params,
  chartId,
  highlight
}: {
  params: any
  chartId: string
  highlight: boolean
}) => {
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState<number>(0)
  const [apiParams, setApiParams] = useState<any>()

  const { resultSentimentComparison, total, loadingSentimentComparison } = GetSentimentComparison(
    apiParams
  )
  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  useEffect(() => {
    if (total > 0) {
      setPageCount(Math.ceil(total / 10))
      console.log(resultSentimentComparison)
    }
  }, [total])
  const reportNo = '5.2.016'

  useEffect(() => {
    if (params?.period !== 'customrange') {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        fillter_keywords: params?.keywordIds,
        page: page,
        limit: 10
      })
    }
    if (
      params?.period === 'customrange' &&
      params?.endDate &&
      params?.previousEndDate &&
      params?.date !== params?.endDate &&
      params?.previousDate !== params?.previousEndDate
    ) {
      setApiParams({
        campaign_id: params?.campaign,
        source: params?.platformId,
        start_date: params?.date,
        end_date: params?.endDate,
        period: params?.period,
        start_date_period: params?.previousDate,
        end_date_period: params?.previousEndDate,
        fillter_keywords: params?.keywordIds,
        page: page,
        limit: 10
      })
    }
  }, [params])

  return (
    <Card>
      {loadingSentimentComparison && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Sentiment Type Comparison: Period over Period' />}
          titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
          subheader='Period over Period'
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
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ overflow: 'auto' }}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell variant='head'></TableCell>
                  <TableCell variant='head' align='center'>
                    Total
                  </TableCell>
                  <TableCell variant='head' align='center'>
                    Comparison with previous
                  </TableCell>
                  <TableCell variant='head' align='center'>
                    Positive
                  </TableCell>
                  <TableCell variant='head' align='center'>
                    Neutral
                  </TableCell>
                  <TableCell variant='head' align='center'>
                    Negative
                  </TableCell>
                </TableRow>
              </TableHead>
              {(resultSentimentComparison || []).map((comparison: any, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{comparison.keyword_name}</TableCell>
                    <TableCell align='center'>
                      <Typography variant='h5'>{comparison.total}</Typography>
                    </TableCell>
                    <TableCell align='left'>
                      <span style={{ display: 'flex', justifyContent: 'center' }}>
                        {comparison.comparison?.value ? (
                          <>
                            {comparison.comparison?.type === 'plus' ? (
                              <ChevronUp
                                fontSize='large'
                                sx={{ color: 'green', marginTop: '10px', marginRight: '10px' }}
                              />
                            ) : (
                              <ChevronDown
                                fontSize='large'
                                sx={{ color: 'red', marginTop: '10px', marginRight: '10px' }}
                              />
                            )}
                            <Typography variant='h5'>
                              {comparison.comparison?.value}
                              <Typography variant='h6'>{comparison.comparison?.percentage} %</Typography>
                            </Typography>
                          </>
                        ) : (
                          <Typography variant='h5'>
                            {comparison.comparison?.value ? comparison.comparison?.value : 0}
                            <Typography variant='h6'>
                              {comparison.comparison?.percentage ? comparison.comparison?.percentage : 0} %
                            </Typography>
                          </Typography>
                        )}
                      </span>
                    </TableCell>
                    <TableCell align='left'>
                      <span style={{ display: 'flex', justifyContent: 'center' }}>
                        {comparison.positive?.value ? (
                          <>
                            {comparison.positive?.type === 'plus' ? (
                              <ChevronUp
                                fontSize='large'
                                sx={{ color: 'green', marginTop: '10px', marginRight: '10px' }}
                              />
                            ) : (
                              <ChevronDown
                                fontSize='large'
                                sx={{ color: 'red', marginTop: '10px', marginRight: '10px' }}
                              />
                            )}
                            <Typography variant='h5'>
                              {comparison.positive?.value}
                              <Typography variant='h6'>{comparison.positive?.percentage} %</Typography>
                            </Typography>
                          </>
                        ) : (
                          <Typography variant='h5'>
                            {comparison.positive?.value ? comparison.positive?.value : 0}
                            <Typography variant='h6'>
                              {comparison.positive?.percentage ? comparison.positive?.percentage : 0} %
                            </Typography>
                          </Typography>
                        )}
                      </span>
                    </TableCell>
                    <TableCell align='left'>
                      <span style={{ display: 'flex', justifyContent: 'center' }}>
                        {comparison.neutral?.value ? (
                          <>
                            {comparison.neutral?.type === 'plus' ? (
                              <ChevronUp
                                fontSize='large'
                                sx={{ color: 'green', marginTop: '10px', marginRight: '10px' }}
                              />
                            ) : (
                              <ChevronDown
                                fontSize='large'
                                sx={{ color: 'red', marginTop: '10px', marginRight: '10px' }}
                              />
                            )}
                            <Typography variant='h5'>
                              {comparison.neutral?.value}
                              <Typography variant='h6'>{comparison.neutral?.percentage} %</Typography>
                            </Typography>
                          </>
                        ) : (
                          <Typography variant='h5'>
                            {comparison.neutral?.value ? comparison.neutral?.value : 0}
                            <Typography variant='h6'>
                              {comparison.neutral?.percentage ? comparison.neutral?.percentage : 0} %
                            </Typography>
                          </Typography>
                        )}
                      </span>
                    </TableCell>
                    <TableCell align='left'>
                      <span style={{ display: 'flex', justifyContent: 'center' }}>
                        {comparison.negative?.value ? (
                          <>
                            {comparison.negative?.type === 'plus' ? (
                              <ChevronUp
                                fontSize='large'
                                sx={{ color: 'green', marginTop: '10px', marginRight: '10px' }}
                              />
                            ) : (
                              <ChevronDown
                                fontSize='large'
                                sx={{ color: 'red', marginTop: '10px', marginRight: '10px' }}
                              />
                            )}
                            <Typography variant='h5'>
                              {comparison.negative?.value}
                              <Typography variant='h6'>{comparison.negative?.percentage} %</Typography>
                            </Typography>
                          </>
                        ) : (
                          <Typography variant='h5'>
                            {comparison.negative?.value ? comparison.negative?.value : 0}
                            <Typography variant='h6'>
                              {comparison.negative?.percentage ? comparison.negative?.percentage : 0} %
                            </Typography>
                          </Typography>
                        )}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
              {resultSentimentComparison?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                    <Translations text='no data' />
                  </TableCell>
                </TableRow>
              ) : (
                ''
              )}
            </Table>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              {total > 0 ? (
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
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default SentimentComparisonTable
