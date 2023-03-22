// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, LinearProgress, TableBody, TableCell, TableContainer, Typography } from '@mui/material'
import { Table, TableRow, TableHead } from '@mui/material'

// ** Third Party Imports
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetShareOfVoice, GetSentimentLevel } from 'src/services/api/dashboards/overall/overallDashboardApi'
import { FacebookIcon, googleIcon, InstagramIcon, PantipIcon, TwitterIcon, YoutubeIcon } from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'
import { useEffect, useState } from 'react'
import NumberOfEachMessage from './NumberOfEachMessage'
import SentimentEachGraph from './SentimentEachGraph'

// import MuiTableCell from "@material-ui/core/TableCell";
// import { withStyles } from '@material-ui/core'

// const TableCell = withStyles({
//   root: {
//     borderBottom: "none"
//   }
// })(MuiTableCell);

const ShareOfVoices = ({ params, chartId, keywordsColor }: { params: any; chartId: string; keywordsColor: any }) => {
  const { resultShareOfVoice, loadingShareOfVoice } = GetShareOfVoice(
    params?.campaign,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordIds
  )
  const reportNo = '1.1.020'

  const { resultSentimentLevel } = GetSentimentLevel(
    params?.campaign,
    params?.platformId,
    params?.date,
    params?.endDate,
    params?.period,
    params?.previousDate,
    params?.previousEndDate,
    params?.keywordIds
  )

  const [tableData, setTableData] = useState<any[]>([])

  useEffect(() => {
    if (resultShareOfVoice && resultSentimentLevel) {
      const data: any = []

      for (let i = 0; i < resultShareOfVoice?.length; i++) {
        data.push({
          keyword_id: resultShareOfVoice[i]?.keyword_id,
          keyword_name: resultShareOfVoice[i]?.keyword_name,
          campaign_id: resultShareOfVoice[i]?.campaign_id,
          campaign_name: resultShareOfVoice[i]?.campaign_name,
          organization_id: resultShareOfVoice[i]?.organization_id,
          organization_name: resultShareOfVoice[i]?.organization_name,
          number_of_message: resultShareOfVoice[i]?.total,
          value: resultShareOfVoice[i]?.value,
          Negative: resultSentimentLevel[i]?.Negative,
          Neutral: resultSentimentLevel[i]?.Neutral,
          Positive: resultSentimentLevel[i]?.Positive
        })
      }

      setTableData(data)
    }
  }, [resultSentimentLevel, resultShareOfVoice])

  const ShareOfVoiceTable = (data: any) => {
    if (!data) return null

    const percentageData = data?.data?.value

    return (
      <>
        {(percentageData || []).map((percentage: any, index: number) => {
          return (
            <TableCell key={index} sx={{ textAlign: 'center' }}>
              <span style={{ border: percentage?.highlight ? '1px solid red' : '', padding: '4px' }}>
                {percentage?.percentage + '%'}
              </span>
            </TableCell>
          )
        })}
      </>
    )
  }

  const ShareOfVoiceTableHead = (data: any) => {
    if (!data) return null
    const tableHeader: any[] = []

    const headerData = data?.data

    for (let i = 0; i < headerData?.length; i++) {
      const value = headerData[i]?.value
      for (let j = 0; j < value?.length; j++) {
        tableHeader.push(value[j]?.channel)
      }
    }

    const filterData = [...new Set(tableHeader)]

    return (
      <>
        {(filterData || []).map((title: any, i: number) => {
          const imgPath =
            title === 'twitter'
              ? TwitterIcon
              : title === 'youtube'
              ? YoutubeIcon
              : title === 'facebook'
              ? FacebookIcon
              : title === 'instagram'
              ? InstagramIcon
              : title === 'pantip'
              ? PantipIcon
              : title === 'google'
              ? googleIcon
              : ''

          return (
            <TableCell key={i} sx={{ textAlign: 'center' }}>
              {imgPath ? (
                <img alt='logo' width={34} height={34} src={imgPath} />
              ) : (
                <Typography variant='caption' textTransform='uppercase'>
                  {title}
                </Typography>
              )}
            </TableCell>
          )
        })}
      </>
    )
  }

  const getKeywordColor = (shareofVoiceData: any) => {
    if (!shareofVoiceData) return ['#fff']

    const colors = []
    for (let i = 0; i < keywordsColor?.length; i++) {
      if (keywordsColor[i].keywordName === shareofVoiceData?.keyword_name) {
        colors.push(keywordsColor[i].color)
      }
    }

    return colors
  }

  return (
    <Card sx={{ minheight: 450 }}>
      {loadingShareOfVoice && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title={<Translations text='Share of Voice' />} titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip
          arrow
          title={
            <span>
              {chartId} <br /> {' Report Level 1(' + reportNo + ')'}
            </span>
          }
        >
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer>
              <Table size='small' sx={{ overflow: 'auto' }}>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Number of Messages</TableCell>
                    {resultShareOfVoice ? <ShareOfVoiceTableHead data={resultShareOfVoice} /> : ''}
                    <TableCell sx={{ textAlign: 'right' }}>Negative</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>Neutral</TableCell>
                    <TableCell>Positive</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(tableData || []).map((shareVoice: any, index: number) => {
                    return (
                      <TableRow key={index}>
                        <TableCell sx={{ textAlign: 'right', maxWidth: 120, paddingRight: '0px' }}>
                          {shareVoice?.keyword_name}
                        </TableCell>
                        <TableCell sx={{ minWidth: 100, maxWidth: 300, paddingLeft: '0px' }}>
                          <NumberOfEachMessage
                            keywordsColor={getKeywordColor(shareVoice)}
                            resultShareOfVoiceChart={shareVoice}
                          />
                        </TableCell>
                        <ShareOfVoiceTable data={shareVoice} />
                        <TableCell colSpan={3} sx={{ maxWidth: 300 }}>
                          <SentimentEachGraph resultSentimentLevel={shareVoice} />
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ShareOfVoices
