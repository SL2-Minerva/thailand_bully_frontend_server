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
  resultTimeByBullyLevel: any
  resultDayByBullyLevel: any
  loadingByBullyLevel: boolean
}

const DayTimeBullyLevel = (props: Props) => {
  const { chartId, params, highlight, resultTimeByBullyLevel, resultDayByBullyLevel, loadingByBullyLevel } = props

  const [seriesHour, setSeriesHour] = useState([{ name: '', data: [] }])
  const [seriesDays, setSeriesDays] = useState([{ name: '', data: [] }])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [yIndex, setYIndex] = useState();
  const [xIndex, setXIndex] = useState();
  const [yIndexTime, setYIndexTime ] = useState();
  const [xIndexTime, setXIndexTime ] = useState();
  const [ylabels, setYlabels] = useState<any>([]);

  const Days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]

  const options_hours: ApexOptions = {
    chart: {
      height: 200,
      type: 'heatmap',
      toolbar: { show: false },
      events: {
        click(event, chartContext, config) {
          setYIndexTime(config.seriesIndex); 
          setXIndexTime(config.dataPointIndex);
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

  const options_level: ApexOptions = {
    chart: {
      height: 100,
      type: 'heatmap',
      toolbar: { show: false },
      events: {
        click(event, chartContext, config) {
          setYIndex(config.seriesIndex); 
          setXIndex(config.dataPointIndex);
        }
      }
    },
    xaxis: {
      categories: Days
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#548235']
  }

  useEffect(() => {
    const bullyLevelLabels = [];
    if (resultDayByBullyLevel) {
      setSeriesDays(resultDayByBullyLevel)
      if(resultDayByBullyLevel?.length > 0) {
       
        for (let i=0; i<= resultDayByBullyLevel?.length; i++) {
          bullyLevelLabels.push(resultDayByBullyLevel[i]?.name)
        }
        setYlabels(bullyLevelLabels);
      }
    } else {
      setSeriesDays([{ name: '', data: [] }])
    }
    if (resultTimeByBullyLevel) {
      const hourValue: any[] = []
      if (resultTimeByBullyLevel?.length > 0) {
        for (let i = 0; i < resultTimeByBullyLevel?.length; i++) {
          hourValue.push({
            name: bullyLevelLabels[i],
            data: resultTimeByBullyLevel[i]?.data
          })
        }
      }
      setSeriesHour(hourValue)
    } else {
      setSeriesHour([{ name: '', data: [] }])
    }
  }, [resultTimeByBullyLevel, resultDayByBullyLevel])
  const reportNo = '2.2.018'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  useEffect(() => {
    if(yIndex === 0 || yIndex) {
      params.ylabel = ylabels[yIndex];
    }
    
    if(xIndex === 0 || xIndex) {
      
      params.label = Days[xIndex];
    }

    if(yIndex || xIndex || yIndex === 0 || xIndex === 0) {
      setShowDetail(true) 
    }
  }, [yIndex, xIndex]);

  useEffect(() => {
    if(yIndexTime  === 0 || yIndexTime) {
      params.ylabel = ylabels[yIndexTime]
    }
    
    if(xIndexTime === 0 || xIndexTime) {
      console.log("x " , xIndexTime);
      params.label = TimeAxis[xIndexTime];
    }

    if(yIndexTime === 0 || xIndexTime === 0 || yIndexTime || xIndexTime ) {
      setShowDetail(true) 
    }
  }, [yIndexTime, xIndexTime]);

  return (
    <Card>
      {loadingByBullyLevel && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text="Day & Time by Bully Level"/>}
          titleTypographyProps={{ variant: 'h4', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ReactApexcharts options={options_level} series={seriesDays} type='heatmap' height={200} />
          </Grid>
          <Grid item xs={8}>
            <ReactApexcharts options={options_hours} series={seriesHour} type='heatmap' height={200} />
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

export default DayTimeBullyLevel
