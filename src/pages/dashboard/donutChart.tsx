// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { Grid, LinearProgress } from '@mui/material'

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { Information } from 'mdi-material-ui'
import { StyledTooltip } from './overall'
import Translations from 'src/layouts/components/Translations'
import { Chart } from 'chart.js'
import * as DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne'

Chart.register(DoughnutLabel)

interface MessageData {
  params: any
  resultFilterData: any
  loadingFilterData: boolean
  keywordsColor: any
}

const DonutChart = (props: MessageData) => {
  const {resultFilterData, loadingFilterData, keywordsColor } = props

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

  const theme = useTheme()
  const labelColor = theme.palette.text.primary

  const options = {
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
            text: currentTotal || '',
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

  const optionsPrevious = {
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
            text: previousTotal || '',
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
    const labels: string[] = []
    const percentage: number[] = []
    for (let i = 0; i < data?.length; i++) {
      labels.push(data[i].keyword_name)

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

  useEffect(() => {
    if (resultFilterData) {
      const currentMessageData = resultFilterData?.prcentage_of_messages_current
      const previousMessageData = resultFilterData?.prcentage_of_messages_previous

      if (currentMessageData) {
        const currentDataset = chartDataset(currentMessageData, 'current')
        setCurrentData(currentDataset)

        if (currentMessageData?.length > 0) {
          setCurrentTotal(currentMessageData[0]?.total)
        }
      } else {
        setCurrentData(initValue)
        setCurrentTotal(0)
      }

      if (previousMessageData) {
        const previousDataset = chartDataset(previousMessageData, 'previous')
        setPreviousData(previousDataset)
        if (previousMessageData?.length > 0) {
          setPreviousTotal(previousMessageData[0]?.total)
        }
      } else {
        setPreviousData(initValue)
        setPreviousTotal(0)
      }
    }
  }, [resultFilterData])

  return (
    <Card sx={{ minHeight: 550, maxHeight: 550 }}>
      {loadingFilterData && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Percentage of Messages' />}
          titleTypographyProps={{ variant: 'h6' }}
          subheader='Period over Period Comparison'
          subheaderTypographyProps={{ variant: 'caption' }}
        />
        <StyledTooltip arrow title='Chart 1, Report Level 1(1.1.001)'>
          <Information fontSize='large' style={{ marginTop: '23px' }} />
        </StyledTooltip>
      </span>

      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Doughnut data={currentData} options={options as any} height={343} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Doughnut data={previousData} options={optionsPrevious as any} height={343} />
          </Grid>
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
    </Card>
  )
}

export default DonutChart
