import { Table, TableRow, TableHead, TableCell, TableContainer, TableBody, LinearProgress } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useState } from 'react'
import DailyMessageDetail from './DailyMessageDetail'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import { tableCellStyle } from './TopSiteList'

interface Props {
  params: any
  chartId: string
  resultTopKeywords: any
  loadingTopKeywords: boolean
}

const MainKeyWordTable = ({ params, resultTopKeywords, loadingTopKeywords, chartId }: Props) => {
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [keywordId, setKeywordId] = useState<number>()

  const reportNo = '1.2.009'

  return (
    <Card sx={{ maxHeight: 360, minHeight: 360 }}>
      {loadingTopKeywords && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title={<Translations text='Main Keyword' />} titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip
          arrow
          title={
            <span>
              {chartId} <br />
              {' Report Level 2(' + reportNo + ')'}
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
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
              {(resultTopKeywords?.main_keyword || [])?.map((keyword: any, index: any) => {
                return (
                  <TableRow
                    style={{ cursor: 'pointer' }}
                    key={index}
                    onClick={() => {
                      setShowDetail(true)
                      setKeywordId(keyword?.keyword_id)
                    }}
                  >
                    <TableCell sx={tableCellStyle}>{keyword?.keyword}</TableCell>
                    <TableCell>{keyword?.no_of_message}</TableCell>
                    <TableCell>{keyword?.percentage}</TableCell>
                  </TableRow>
                )
              })}

              {!resultTopKeywords?.main_keyword || resultTopKeywords?.main_keyword?.length == 0 ? (
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                    <Translations text='no data' />
                  </TableCell>
                </TableRow>
              ) : (
                ''
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {params?.campaign && showDetail ? (
          <DailyMessageDetail
            show={showDetail}
            setShow={setShowDetail}
            params={params}
            keywordId={keywordId}
            setKeywordId={setKeywordId}
            reportNo={reportNo}
            title='Main Keyword: Message Transactions'
            networkTitle='Main Keyword: Social Network Analysis'
          />
        ) : (
          ''
        )}
      </CardContent>
    </Card>
  )
}

export default MainKeyWordTable
