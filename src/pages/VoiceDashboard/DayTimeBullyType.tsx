import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid, LinearProgress } from '@mui/material'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import { Information } from 'mdi-material-ui'
import { StyledTooltip } from '../dashboard/overall'
import DailyMessageDetail from '../dashboard/DailyMessageDetail'

interface Props {
  chartId: string
  params: any
  highlight: boolean
  resultDayByBullyType: any
  resultTimeByBullyType: any
  loadingDayByBullyType: boolean
}

const DayTimeBullyType = (props: Props) => {
  const { chartId, params, highlight, resultDayByBullyType, resultTimeByBullyType, loadingDayByBullyType } = props

  const [seriesHour, setSeriesHour] = useState([{ name: '', data: [] }])
  const [seriesDays, setSeriesDays] = useState([{ name: '', data: [] }])
  const [showDetail, setShowDetail] = useState<boolean>(false)

  const options_hours: ApexOptions = {
    chart: {
      height: 200,
      type: 'heatmap',
      toolbar: { show: false },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          console.log(config.w.config.labels[config.dataPointIndex], 'context', chartContext)
          setShowDetail(true)
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#548235'],
    xaxis: {
      categories: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '00'
      ]
    }
  }

  const options_type: ApexOptions = {
    chart: {
      height: 100,
      type: 'heatmap',
      toolbar: { show: false },
      events: {
        dataPointSelection: (event, chartContext, config) => {
          console.log(config.w.config.labels[config.dataPointIndex], 'context', chartContext)
          setShowDetail(true)
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    },
    colors: ['#548235']
  }

  useEffect(() => {
    if (resultDayByBullyType) {
      setSeriesDays(resultDayByBullyType)
    }
    if (resultTimeByBullyType) {
      const hourValue: any[] = []
      if (resultTimeByBullyType?.length > 0) {
        for (let i = 0; i < resultTimeByBullyType?.length; i++) {
          hourValue.push({
            name: '',
            data: resultTimeByBullyType[i]?.data
          })
        }
      }
      setSeriesHour(hourValue)
    }
  }, [resultDayByBullyType, resultTimeByBullyType])

  const reportNo = '2.2.019'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Card>
      {loadingDayByBullyType && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title='Day&Time by Bully Type '
          titleTypographyProps={{ variant: 'h4', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ReactApexcharts options={options_type} series={seriesDays} type='heatmap' height={220} />
          </Grid>
          <Grid item xs={8}>
            <ReactApexcharts options={options_hours} series={seriesHour} type='heatmap' height={220} />
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

export default DayTimeBullyType
