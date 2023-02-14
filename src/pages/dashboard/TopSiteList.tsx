import { Table, TableRow, TableHead, TableCell, TableContainer, TableBody, LinearProgress } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetTopKeywords } from 'src/services/api/dashboards/overall/overallDashboardApi'

// import { useState } from 'react'
// import DailyMessageDetail from './DailyMessageDetail'

interface Props {
  params: any
  chartId: string
}

const TopSiteList = ({ params, chartId }: Props) => {
  // const [showDetail, setShowDetail] = useState<boolean>(false)
  // const [keywordId, setKeywordId] = useState<number>()
  const { resultTopKeywords, loadingFilterData } = GetTopKeywords(
    params?.campaign,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordIds
  )

  const reportNo = '1.2.012'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Card sx={{ maxHeight: 360, minHeight: 360 }}>
      {loadingFilterData && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title='Top Sites' titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '21px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <TableContainer sx={{ maxHeight: 250, minHeight: 250 }}>
          <Table stickyHeader={true} size='small'>
            <TableHead sx={{ backgroundColor: 'lightgrey !important' }}>
              <TableRow>
                <TableCell variant='head' sx={{ backgroundColor: 'white !important' }}>
                  {' '}
                </TableCell>
                <TableCell variant='head'> No. of Messages </TableCell>
                <TableCell variant='head'> % </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(resultTopKeywords?.top_sites || [])?.map((topsite: any, index: any) => {
                return (
                  <TableRow
                    key={index}
                    onClick={() => {
                      // setShowDetail(true)
                      // setKeywordId(topsite?.keyword_id)
                    }}
                    
                    // style={{ cursor: 'pointer' }}
                  >
                    <TableCell sx={{ backgroundColor: 'lightslategrey !important', color: 'white' }}>
                      {topsite?.site_domain}
                    </TableCell>
                    <TableCell>{topsite?.no_of_message}</TableCell>
                    <TableCell>{topsite?.percentage}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {/* {params?.campaign ? (
          <DailyMessageDetail
            show={showDetail}
            setShow={setShowDetail}
            params={params}
            keywordId={keywordId}
            setKeywordId={setKeywordId}
            reportNo={reportNo}
            title='Top Site: Messages Transaction'
            networkTitle='Top Site: Social Network Analysis'
          />
        ) : (
          ''
        )} */}
      </CardContent>
    </Card>
  )
}

export default TopSiteList
