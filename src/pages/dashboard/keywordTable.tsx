import { Table, TableRow, TableHead, TableCell, TableBody, TableContainer, LinearProgress } from '@mui/material'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetKeyWords } from 'src/services/api/dashboards/overall/overallDashboardApi'
import Translations from 'src/layouts/components/Translations'

const cellStyle = {
  width: 250,
  maxWidth: 250,
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  borderStyle: 'border-box',
  backgroundColor: 'lightgrey !important'
}

const KeywordTable = ({ params, chartId }: { params: any; chartId: string }) => {
  const { resultKeywords, loadingFilterData } = GetKeyWords(
    params?.campaign,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordIds
  )

  const reportNo = '1.1.008'

  return (
    <Card>
      {loadingFilterData && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title={<Translations text='Keyword Summary' />} titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip
          arrow
          title={
            <span>
              {chartId} <br /> {'Report Level 1(' + reportNo + ')'}
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <TableContainer sx={{ maxHeight: 250 }}>
          <Table size='small' stickyHeader={true}>
            <TableHead sx={{ backgroundColor: 'lightgrey !important' }}>
              <TableRow>
                <TableCell variant='head' style={{ backgroundColor: 'white' }}>
                  {' '}
                </TableCell>
                <TableCell variant='head'> Message </TableCell>
                <TableCell variant='head'> Engagement </TableCell>
                <TableCell variant='head'> Accounts </TableCell>
                <TableCell variant='head'> Average message per day </TableCell>
                <TableCell variant='head'> Average Engagement per day </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(resultKeywords || [])?.map((keyword: any, index: any) => {
                return (
                  <TableRow key={index}>
                    <TableCell sx={cellStyle}>
                      <b>{keyword.keyword}</b>
                    </TableCell>
                    <TableCell>{keyword.message}</TableCell>
                    <TableCell>{keyword.engagement}</TableCell>
                    <TableCell>{keyword.accounts}</TableCell>
                    <TableCell>{keyword.average_message}</TableCell>
                    <TableCell>{keyword.average_engagement}</TableCell>
                  </TableRow>
                )
              })}

              {!resultKeywords || resultKeywords.length == 0 ? (
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
      </CardContent>
    </Card>
  )
}

export default KeywordTable
