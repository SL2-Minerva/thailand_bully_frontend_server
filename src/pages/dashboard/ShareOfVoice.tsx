// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, LinearProgress, TableBody, TableCell, Typography } from '@mui/material'
import { Table, TableRow, TableHead } from '@mui/material'

// ** Third Party Imports
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetShareOfVoice } from 'src/services/api/dashboards/overall/overallDashboardApi'
import {
  FacebookIcon,
  googleIcon,
  InstagramIcon,
  PantipIcon,
  TwitterIcon,
  YoutubeIcon
} from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'
import { useEffect, useState } from 'react'
import SentimentLevelChart from './SentimentLevelChart'
import NumberOfMessage from './NumberOfMessage'

// import MuiTableCell from "@material-ui/core/TableCell";
// import { withStyles } from '@material-ui/core'

// const TableCell = withStyles({
//   root: {
//     borderBottom: "none"
//   }
// })(MuiTableCell);

const ShareOfVoice = ({ params, chartId, keywordsColor }: { params: any; chartId: string; keywordsColor: any }) => {
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

  const chartTitle = chartId + ', Report Level 1(' + reportNo + ')'
  const [colors, setColors] = useState<string[]>([])


  useEffect(() => {
    if (keywordsColor?.length > 0) {
      const getColors: string[] = []
      for (let i = 0; i < keywordsColor?.length; i++) {
        getColors.push(keywordsColor[i].color)
      }
      setColors(getColors)
    }
  }, [keywordsColor])

  const ShareOfVoiceTable = (data: any) => {
    if (!data) return null

    const percentageData = data?.data?.value

    return (
      <>
        {(percentageData || []).map((percentage: any, index: number) => {
          return (
            <TableCell key={index}>
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
            <TableCell key={i}>
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

  return (
    <Card sx={{ minheight: 450 }}>
      {loadingShareOfVoice && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title={<Translations text='Share of Voice' />} titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center', color: 'white' }}>Share of Voice</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center' }}>Number of Messages</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow></TableRow>
              </TableBody>
            </Table>

            {/* {resultShareOfVoiceChart ? (
              <Bar
                data={chartData}
                options={{ indexAxis: 'y', plugins: { legend: { display: false } } }}
                height={250}
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
            )} */}

            <Grid container mt={-6}>
              <Grid item xs={12}>
                {colors?.length > 0 ? <NumberOfMessage params={params} keywordsColor={colors} /> : ''}
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4} xs={12} sx={{ maxHeight: 550, overflow: 'auto', mt: 7.3 }}>
            <Table size='small'>
              <TableHead>
                <TableRow>{resultShareOfVoice ? <ShareOfVoiceTableHead data={resultShareOfVoice} /> : ''}</TableRow>
              </TableHead>
              {(resultShareOfVoice || []).map((shareVoice: any, index: number) => {
                return (
                  <TableBody key={index}>
                    <TableRow>
                      <ShareOfVoiceTable data={shareVoice} />
                    </TableRow>
                  </TableBody>
                )
              })}
            </Table>
          </Grid>

          <Grid item md={4} xs={12}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3} sx={{ textAlign: 'center' }}>
                    Sentiment
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Negative</TableCell>
                  <TableCell>Neutral</TableCell>
                  <TableCell>Positive</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow></TableRow>
              </TableBody>
            </Table>
            <Grid container mt={-6.3}>
              <Grid item xs={12}>
                <SentimentLevelChart params={params} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ShareOfVoice
