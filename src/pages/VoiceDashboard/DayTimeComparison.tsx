import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import DailyMessageDetail from '../dashboard/DailyMessageDetail'
import { LinearProgress } from '@mui/material'
import { TimeAxis } from 'src/utils/const'
import Translations from 'src/layouts/components/Translations'

const DayTimeComparison = ({
  params,
  chartId,
  highlight,
  resultDayTimeComparison,
  loadingDayTimeComparison
}: {
  params: any
  chartId: string
  highlight: boolean
  resultDayTimeComparison : any
  loadingDayTimeComparison : boolean
}) => {
  const [series, setSeries] = useState([])
  const [showDetail, setShowDetail] = useState<boolean>(false)
  const [yIndex, setYIndex] = useState();
  const [xIndex, setXIndex] = useState();

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'heatmap',
      toolbar: { show: false },
      events: {
        // dataPointSelection: (event, chartContext, config) => {
        //   console.log(config.w.config.labels, 'context', chartContext);
        //   console.log(event);
        //   console.log("xaxis", config.w.config.xaxis.categories[config.dataPointIndex]); //value
        //   console.log("yaxis", config.w.config.series[0].data[config.dataPointIndex]); //
          
        //   setShowDetail(true)
        // }, 

        click(event, chartContext, config) {
          setYIndex(config.seriesIndex); 
          setXIndex(config.dataPointIndex);
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#548235'],
    xaxis: {
      categories: TimeAxis
    },
    title: {
      text: ''
    }
  }

  useEffect(() => {
    if (resultDayTimeComparison) {
      setSeries(resultDayTimeComparison)
    } else {
      setSeries([])
    }
  }, [resultDayTimeComparison])

  useEffect(() => {
    if(yIndex === 0 || yIndex) {
      params.ylabel = resultDayTimeComparison[yIndex]?.name;
    }
    
    if(xIndex === 0 || xIndex) {
      params.label = TimeAxis[xIndex];
    }

    if(yIndex || xIndex || yIndex === 0 || xIndex === 0) {
      setShowDetail(true) 
    }
  }, [yIndex, xIndex])

  const reportNo = '2.2.016'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Card>
      {loadingDayTimeComparison && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Day & Time'/>}
          titleTypographyProps={{ variant: 'h4', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>
      <CardContent>
        <ReactApexcharts options={options} series={series} type='heatmap' height={350} />
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

export default DayTimeComparison
