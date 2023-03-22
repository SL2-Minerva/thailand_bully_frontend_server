import {
  Box,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetWordClouds } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'
import { useEffect, useState } from 'react'

const TotalMessageLists = ({ params, chartId }: { params: any; chartId: string }) => {
  const [pageCount, setPageCount] = useState<number>(0)
  const [page, setPage] = useState<number>(0)

  const { loadingWordClouds, resultWordClouds, total } = GetWordClouds(
    params?.campaign,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.topKeyword,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordIds,
    page
  )
  const reportNo = '1.2.022'

  useEffect(() => {
    if (total > 0) {
      setPageCount(Math.ceil(total / 10))
    }
  }, [total])

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1)
  }

  useEffect(() => {
    setPage(0)
  }, [params?.topKeyword])

  return (
    <Card sx={{ maxHeight: 470, minHeight: 470 }}>
      {loadingWordClouds && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Top 10 Match: Popular Words' />}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <StyledTooltip
          arrow
          title={
            <span>
              {chartId} <br /> {' Report Level 2(' + reportNo + ')'}
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <Typography variant='h5' sx={{ ml: 5 }}>
        {' '}
        <Translations text='Popular Word Total' /> : {total}
      </Typography>
      <CardContent>
        <TableContainer sx={{ maxHeight: 320, p: 2, pt: 0 }}>
          <Table size='small'>
            <TableHead sx={{ backgroundColor: 'lightgrey !important' }}>
              <TableRow>
                <TableCell variant='head'> No. </TableCell>
                <TableCell variant='head'>
                  {' '}
                  <Translations text='Popular Word' />{' '}
                </TableCell>
                <TableCell variant='head'>
                  {' '}
                  <Translations text='Amount' />{' '}
                </TableCell>
                <TableCell variant='head'> % </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(resultWordClouds?.word_clouds_table || [])?.map((keyword: any, index: any) => {
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ backgroundColor: '#d3d3d338 !important' }}>
                      <b>{index + 1 + page * 7}</b>
                    </TableCell>
                    <TableCell>
                      <span style={{ fontWeight: 'bold' }}>{keyword.keyword}</span>
                    </TableCell>
                    <TableCell>{keyword.total}</TableCell>
                    <TableCell>{keyword.percent} %</TableCell>
                  </TableRow>
                )
              })}
              {!resultWordClouds?.word_clouds_table || resultWordClouds?.word_clouds_table?.length == 0 ? (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                    <Translations text='no data' />
                  </TableCell>
                </TableRow>
              ) : (
                ''
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 0, display: 'flex', justifyContent: 'center' }}>
          {total > 0 && params?.topKeyword === 'all' ? (
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

export default TotalMessageLists
