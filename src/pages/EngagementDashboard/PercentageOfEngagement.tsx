// ** MUI Imports
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, LinearProgress, Paper } from '@mui/material'

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import { Chart } from 'chart.js'
import * as DoughnutLabel from 'chartjs-plugin-doughnutlabel-rebourne'
import { EngagementTransChartColor } from 'src/utils/const'

Chart.register(DoughnutLabel)

interface MessageData {
  type: string
  chartId: string
  params: any
  highlight: boolean
  resultFilterData: any
  loadingFilterData: boolean
  keywordsColor: any
}

const PercentageOfEngangement = (props: MessageData) => {
  const { type, chartId, highlight, resultFilterData, loadingFilterData, keywordsColor } = props
  const colors = keywordsColor ?? EngagementTransChartColor
  const initValue = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: colors,
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

  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
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
       display: false
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

  const chartDataset = (data: any, type: string, keywordColor: any) => {
    if (!data) {
      const chartData = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: EngagementTransChartColor,
            hoverOffset: 4
          }
        ]
      }

      return chartData
    }
    const labels: string[] = []
    const percentage: number[] = []
    const colors = []

    for (let i = 0; i < data?.length; i++) {
      // labels.push(data[i].keyword_name);

      const percentageValue = data[i]?.value
      for (let j = 0; j < percentageValue?.length; j++) {
        percentage.push(data[i].value[j]?.percentage)
        labels.push(data[i].value[j]?.name)

        if (type === 'current') {
          setCurrentPeriod(data[i].value[j]?.date)
        } else {
          setPreviousPeriod(data[i].value[j]?.date)
        }
      }
    }
    for (let i = 0; i < labels?.length; i++) {
      for (let j = 0; j < keywordColor?.length; j++) {
        if (keywordColor[j]?.keywordName === labels[i]) {
          colors.push(keywordColor[j]?.color)
        }
      }
    }

    const returnData = {
      labels: labels,
      datasets: [
        {
          data: percentage,
          backgroundColor: colors,
          hoverOffset: 4
        }
      ]
    }

    return returnData
  }

  const title = type === 'transaction' ? 'Percentage of Engagement Trans' : 'Percentage of Engagement Type'

  const reportNo = '4.1.001'

  const chartTitle = chartId + ', Report Level 1(' + reportNo + ')'

  useEffect(() => {
    if (resultFilterData) {
      const currentMessageData = resultFilterData?.prcentage_of_engagement_current
      const previousMessageData = resultFilterData?.prcentage_of_engagement_previous

      if (currentMessageData) {
        const currentDataset = chartDataset(currentMessageData, 'current', keywordsColor)
        setCurrentData(currentDataset)

        if (currentMessageData?.length > 0) {
          setCurrentTotal(currentMessageData[0]?.value[0]?.total)
          setShowNoDataText(false)
        } else {
          setCurrentTotal(0)
          setShowNoDataText(true)
        }
      } else {
        setCurrentData(initValue)
        setCurrentTotal(0)
        setShowNoDataText(true)
      }

      if (previousMessageData) {
        const previousDataset = chartDataset(previousMessageData, 'previous', keywordsColor)
        setPreviousData(previousDataset)

        if (previousMessageData?.length > 0) {
          setPreviousTotal(previousMessageData[0]?.value[0]?.total)
          setShowNoDataTextPrevious(false)
        } else {
          setPreviousTotal(0)
          setShowNoDataTextPrevious(true)
        }
      } else {
        setPreviousData(initValue)
        setPreviousTotal(0)
        setShowNoDataTextPrevious(true)
      }
    } else {
      setCurrentData(initValue)
      setPreviousData(initValue)
      setPreviousTotal(0)
      setCurrentTotal(0)
      setShowNoDataText(true)
      setShowNoDataTextPrevious(true)
    }
  }, [resultFilterData, keywordsColor])

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1, minHeight: 600, maxHeight: 600 }} square variant='outlined'>
      {loadingFilterData && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text={title} />}
          titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
          subheader='Period over Period Comparison'
          subheaderTypographyProps={{ variant: 'caption', color: highlight ? 'green' : '#4c4e64de' }}
        />
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
              <Doughnut data={currentData} options={options as any} height={400} />
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
              <Doughnut data={previousData} options={optionsPrevious as any} height={400} />
            )}
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
    </Paper>
  )
}

export default PercentageOfEngangement
