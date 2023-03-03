// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { Grid, LinearProgress, Paper } from '@mui/material'

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { Chart } from 'chart.js'
import * as DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne'
import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'

interface Props {
  params: any
  type: string
  chartId: string
  highlight: boolean
  resultPercentageChannelCurrent: any
  resultPercentageChannelPrevious: any
  loadingPercentageChannel: boolean
  keywordsColor: any
}
Chart.register(DoughnutLabel)
const DailyMessagePieChart = (props: Props) => {
  const {
    type,
    chartId,
    highlight,
    resultPercentageChannelCurrent,
    resultPercentageChannelPrevious,
    loadingPercentageChannel,
    keywordsColor
  } = props

  const theme = useTheme()
  const labelColor = theme.palette.text.primary
  const initValue = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: keywordsColor,
        hoverOffset: 4
      }
    ]
  }
  const [previousData, setPreviousData] = useState<any>(initValue)
  const [currentData, setCurrentData] = useState<any>(initValue)
  const [currentPeriod, setCurrentPeriod] = useState<string>('')
  const [previousPeriod, setPreviousPeriod] = useState<string>('')

  const [currentTotal, setCurrentTotal] = useState<number>()
  const [previousTotal, setPreviousTotal] = useState<number>()
  const [showNoDataText, setShowNoDataText] = useState<boolean>(false)
  const [showNoDataTextPrevious, setShowNoDataTextPrevious] = useState<boolean>(false)

  const chartDataset = (data: any, type: string) => {
    if (!data) {
      const chartData = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: keywordsColor,
            hoverOffset: 4
          }
        ]
      }

      return chartData
    }
    const labels: any[] = []
    const percentage: number[] = []
    for (let i = 0; i < data?.length; i++) {
      labels.push(data[i].source_name)

      const percentageValue = data[i]?.value
      for (let j = 0; j < percentageValue?.length; j++) {
        percentage.push(data[i].value[j]?.percentage)
        if (type === 'current') {
          setCurrentPeriod(data[i].value[j]?.date)
        } else {
          setPreviousPeriod(data[i].value[j]?.date)
        }
      }
    }
    const returnData = {
      labels: labels,
      datasets: [
        {
          data: percentage,
          backgroundColor: keywordsColor,
          hoverOffset: 4
        }
      ]
    }

    return returnData
  }

  const currentPeriodOptions = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: labelColor,
          usePointStyle: true
        }
      },
      doughnutlabel: {
        paddingPercentage: 5,
        labels: [
          {
            text: currentTotal && currentTotal != 0 ? currentTotal : '',
            font: {
              size: '50',
              family: 'Arial, Helvetica, sans-serif',
              weight: 'bold'
            },
            color: '#434343'
          }
        ]
      }
    }
  }

  const previousPeriodOptions = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: labelColor,
          usePointStyle: true
        }
      },
      doughnutlabel: {
        paddingPercentage: 5,
        labels: [
          {
            text: previousTotal && previousTotal !=0 ? previousTotal : '',
            font: {
              size: '50',
              family: 'Arial, Helvetica, sans-serif',
              weight: 'bold'
            },
            color: '#434343'
          }
        ]
      }
    }
  }

  // const options = {
  //   responsive: true,
  //   backgroundColor: false,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       align: 'end',
  //       position: 'top',
  //       labels: {
  //         padding: 25,
  //         boxWidth: 10,
  //         color: labelColor,
  //         usePointStyle: true
  //       }
  //     }
  //   }
  // }

  useEffect(() => {
    if (resultPercentageChannelCurrent) {
      const currentMessageData = resultPercentageChannelCurrent
      const currentDataset = chartDataset(currentMessageData, 'current')
      setCurrentData(currentDataset)
      if (currentMessageData?.length > 0) {
        setCurrentTotal(currentMessageData[0]?.total)
      } else {
        setCurrentTotal(0)
      }
      setShowNoDataText(false)
    } else {
      setCurrentData(initValue)
      setCurrentTotal(0)
      setShowNoDataText(true)
    }

    if (resultPercentageChannelPrevious) {
      const previousMessageData = resultPercentageChannelPrevious
      const previousDataset = chartDataset(previousMessageData, 'previous')
      setPreviousData(previousDataset)
      if (previousMessageData?.length > 0) {
        setPreviousTotal(previousMessageData[0]?.total)
      } else {
        setPreviousTotal(0)
      }
      setShowNoDataTextPrevious(false)
    } else {
      setPreviousData(initValue)
      setPreviousTotal(0)
      setShowNoDataTextPrevious(true)
    }
  }, [resultPercentageChannelCurrent, resultPercentageChannelPrevious])

  const reportNo = '3.1.001'

  const chartTitle = chartId + ', Report Level 1(' + reportNo + ')'

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 550, maxHeight: 550 }} square variant='outlined'>
      {loadingPercentageChannel && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        {type === 'message' ? (
          <CardHeader
            title={<Translations text='Percentage of Channel' />}
            titleTypographyProps={{ varient: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
            subheader='Period over Period Comparison'
            subheaderTypographyProps={{ varient: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
          />
        ) : (
          <CardHeader
            title={<Translations text='Percentage of Channel' />}
            titleTypographyProps={{ varient: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
            subheader='Period over Period Comparison'
            subheaderTypographyProps={{ varient: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
          />
        )}
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>

      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {showNoDataText ? (
              <div
                style={{
                  height: 300,
                  padding: '150px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                <Translations text='no data' />
              </div>
            ) : (
              <Doughnut data={currentData} options={currentPeriodOptions as any} height={270} />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {showNoDataTextPrevious ? (
              <div
                style={{
                  height: 300,
                  padding: '150px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                <Translations text='no data' />
              </div>
            ) : (
              <Doughnut data={previousData} options={previousPeriodOptions as any} height={270} />
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={6}>
            <p style={{ fontSize: '10px' }}> Current Period :</p>
            <p style={{ fontSize: '10px' }}> {currentPeriod} </p>
          </Grid>
          <Grid item xs={12} md={6}>
            <p style={{ fontSize: '10px' }}> Previous Period : </p>
            <p style={{ fontSize: '10px' }}> {previousPeriod} </p>
          </Grid>
        </Grid>
      </CardContent>
    </Paper>
  )
}

export default DailyMessagePieChart
