import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, LinearProgress } from '@mui/material'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import DailyMessageDetail from '../dashboard/DailyMessageDetail'
import { TimeAxis } from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'

interface Props {
  chartId: string
  params: any
  highlight: boolean
  resultDayBySentiment: any
  resultTimeBySentiment: any
  loadingBySentiment: boolean
}

const DayTimeSentiment = (props: Props) => {
  const { chartId, params, highlight, resultDayBySentiment, resultTimeBySentiment, loadingBySentiment } = props

  const [seriesHour, setSeriesHour] = useState([{ name: '', data: [] }])
  const [seriesDays, setSeriesDays] = useState([{ name: '', data: [] }])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [yIndex, setYIndex] = useState()
  const [xIndex, setXIndex] = useState()
  const [yIndexTime, setYIndexTime] = useState()
  const [xIndexTime, setXIndexTime] = useState()
  const Days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']

  const options_hours: ApexOptions = {
    chart: {
      height: 200,
      type: 'heatmap',
      toolbar: { show: false },
      events: {
        click(event, chartContext, config) {
          setYIndexTime(config.seriesIndex)
          setXIndexTime(config.dataPointIndex)
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: TimeAxis
    },
    colors: ['#548235']
  }

  const options_days: ApexOptions = {
    chart: {
      height: 100,
      type: 'heatmap',
      toolbar: { show: false },
      events: {
        click(event, chartContext, config) {
          setYIndex(config.seriesIndex)
          setXIndex(config.dataPointIndex)
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: Days
    },
    colors: ['#548235']
  }

  useEffect(() => {
    if (resultDayBySentiment) {
      setSeriesDays(resultDayBySentiment)
    } else {
      setSeriesDays([{ name: '', data: [] }])
    }
    if (resultTimeBySentiment) {
      const hourValue: any[] = []
      if (resultTimeBySentiment?.length > 0) {
        for (let i = 0; i < resultTimeBySentiment?.length; i++) {
          hourValue.push({
            name: resultDayBySentiment[i]?.name,
            data: resultTimeBySentiment[i]?.data
          })
        }
      }
      setSeriesHour(hourValue)
    } else {
      setSeriesHour([{ name: '', data: [] }])
    }
  }, [resultDayBySentiment, resultTimeBySentiment])

  useEffect(() => {
    if (yIndex === 0 || yIndex) {
      params.ylabel = resultDayBySentiment[yIndex]?.name
    }

    if (xIndex === 0 || xIndex) {
      params.label = Days[xIndex]
    }

    if (yIndex || xIndex || yIndex === 0 || xIndex === 0) {
      setShowDetail(true)
    }
  }, [yIndex, xIndex])

  useEffect(() => {
    if (yIndexTime === 0 || yIndexTime) {
      params.ylabel = resultDayBySentiment[yIndexTime]?.name
    }

    if (xIndexTime === 0 || xIndexTime) {
      console.log('x ', xIndexTime)
      params.label = TimeAxis[xIndexTime]
    }

    if (yIndexTime === 0 || xIndexTime === 0 || yIndexTime || xIndexTime) {
      setShowDetail(true)
    }
  }, [yIndexTime, xIndexTime])

  const reportNo = '2.2.017'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Card>
      {loadingBySentiment && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Day & Time by Sentiment' />}
          titleTypographyProps={{ variant: 'h4', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {!resultDayBySentiment ? (
              <div
                style={{
                  height: 300,
                  padding: '100px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                There is no data
              </div>
            ) : (
              <ReactApexcharts options={options_days} series={seriesDays} type='heatmap' height={170} />
            )}
          </Grid>
          <Grid item xs={8}>
            {!resultTimeBySentiment ? (
              <div
                style={{
                  height: 300,
                  padding: '100px 0',
                  textAlign: 'center',
                  verticalAlign: 'middle',
                  color: '#80808059'
                }}
              >
                There is no data
              </div>
            ) : (
              <ReactApexcharts options={options_hours} series={seriesHour} type='heatmap' height={170} />
            )}
          </Grid>
        </Grid>
        {showDetail ? (
          <DailyMessageDetail
            show={showDetail}
            setShow={setShowDetail}
            params={params}
            reportNo={reportNo}

            // keywordId = {keywordId}
            // setKeywordId={setKeywordId}
          />
        ) : (
          ''
        )}
      </CardContent>
    </Card>
  )
}

export default DayTimeSentiment
