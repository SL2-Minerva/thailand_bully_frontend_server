// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, LinearProgress, TableBody, TableCell, Typography } from '@mui/material'
import { Table, TableRow, TableHead } from '@mui/material'

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'
import { StyledTooltip } from './overall'
import { Information } from 'mdi-material-ui'
import { GetShareOfVoice, GetShareOfVoiceChart } from 'src/services/api/dashboards/overall/overallDashboardApi'
import {
  FacebookIcon,
  googleIcon,
  GraphicColors,
  InstagramIcon,
  PantipIcon,
  TwitterIcon,
  YoutubeIcon
} from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'
import { useEffect, useState } from 'react'
import SentimentLevelChart from './SentimentLevelChart'

// import MuiTableCell from "@material-ui/core/TableCell";
// import { withStyles } from '@material-ui/core'

// const TableCell = withStyles({
//   root: {
//     borderBottom: "none"
//   }
// })(MuiTableCell);

const ChartLabels = (data: any) => {
  if (!data) return []
  const keywordData = data

  const labels: any[] = []

  for (let i = 0; i < keywordData?.length; i++) {
    labels.push(keywordData[i].keyword_name)
  }

  return labels
}

const ChartData = (data: any) => {
  if (!data) return []

  const chartDatas: any[] = []
  for (let i = 0; i < data?.length; i++) {
    chartDatas.push(data[i]?.number_of_massage)
  }

  return chartDatas
}

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
  const { resultShareOfVoiceChart, loadingShareOfVoiceChart } = GetShareOfVoiceChart(
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
  const labels = resultShareOfVoiceChart ? ChartLabels(resultShareOfVoiceChart) : []

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        axis: 'y',
        label: 'Number of Messages',
        data: [],
        fill: false,
        backgroundColor: ['rgb(54, 162, 235)'],
        borderColor: ['rgb(54, 162, 235)'],
        borderWidth: 1
      }
    ]
  })

  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       axis: 'y',
  //       label: 'Number of Messages',
  //       data: ChartData(resultShareOfVoiceChart),
  //       fill: false,
  //       backgroundColor: ['rgb(54, 162, 235)'],
  //       borderColor: ['rgb(54, 162, 235)'],
  //       borderWidth: 1
  //     }
  //   ]
  // }

  useEffect(() => {
    if (keywordsColor?.length > 0) {
      const colors = []
      for (let i = 0; i < keywordsColor?.length; i++) {
        for (let j = 0; j < resultShareOfVoiceChart?.length; j++) {
          if (keywordsColor[i]?.keywordName === resultShareOfVoiceChart[j]?.keyword_name) {
            colors.push(keywordsColor[i]?.color)
          }
        }
      }
      setChartData({
        labels: labels,
        datasets: [
          {
            axis: 'y',
            label: 'Number of Messages',
            data: ChartData(resultShareOfVoiceChart),
            fill: false,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
          }
        ]
      })
    } else {
      setChartData({
        labels: labels,
        datasets: [
          {
            axis: 'y',
            label: 'Number of Messages',
            data: ChartData(resultShareOfVoiceChart),
            fill: false,
            backgroundColor: GraphicColors,
            borderColor: GraphicColors,
            borderWidth: 1
          }
        ]
      })
    }
  }, [keywordsColor, resultShareOfVoiceChart])

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
      {loadingShareOfVoice && loadingShareOfVoiceChart && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title={<Translations text='Share of Voice' />} titleTypographyProps={{ variant: 'h6' }} />
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant='caption'> Number of Message</Typography>
            {resultShareOfVoiceChart ? (
              <Bar
                data={chartData}
                options={{ indexAxis: 'y', plugins: { legend: { display: false } } }}
                height={245}
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
          </Grid>
          <Grid item xs={4}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  {resultShareOfVoice ? <ShareOfVoiceTableHead data={resultShareOfVoice} /> : ''}
                </TableRow>
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
          <Grid item xs={4} mt={-10}>
          <Table size='small'>
              <TableHead>
                <TableRow>
                    <TableCell colSpan={3} sx={{textAlign: 'center'}}>Sentiment</TableCell>
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
            <SentimentLevelChart params={params} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ShareOfVoice
