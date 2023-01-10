import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GetSentimentLevel } from 'src/services/api/dashboards/channel/ChannelDashboardApi'


const Labels = (data: any) => {
  if(!data) {
    return [];
  }
  const labels : any[] = []
  if(data?.length > 0) {
    for(let i=0; i<data?.length; i++) {
      labels.push(data[i].keyword_name);
    }
  }

  return labels;
}

const ChartDataPositive = (data: any, type : string) => {
  if(!data) {
    return [];
  }
  const value : any[] = []
  if(data?.length > 0) {
    if(type === 'positive') {
      for(let i=0; i<data?.length; i++) {
        value.push(data[i].positive);
      }
    } else if(type==='negative') {
      for(let i=0; i<data?.length; i++) {
        value.push(data[i].negative);
      }
    } else if (type === 'neutral') {
      for(let i=0; i<data?.length; i++) {
        value.push(data[i].neutral);
      }
    }

  }

  return value;
}

const SentimentLevelChart = ({params, chartId} : {params: any, chartId: string}) => {
  const { resultSentimentLevel } = GetSentimentLevel(params?.campaign, params?.date, params?.endDate, params?.period, params?.previousDate, params?.previousEndDate);
  
  const chartLabels =  Labels(resultSentimentLevel);
  const positiveData = ChartDataPositive(resultSentimentLevel, 'positive');
  const neutralData = ChartDataPositive(resultSentimentLevel, 'neutral');
  const negativeData = ChartDataPositive(resultSentimentLevel, 'negative');


  const series =  [{
    name: 'Negative',
    data: negativeData
  }, {
    name: 'Neutral',
    data: neutralData
  }, {
    name: 'Positive',
    data: positiveData
  }]

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: '100%',
      toolbar: {show: false}
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: ''
    },
    colors: ['#FF0000', '#F47B20', '#008000'],
    xaxis: {
      categories: chartLabels,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "K"
        }
      }
    },
    fill: {
      opacity: 1,
      colors: ['#FF0000', '#F47B20', '#008000'],
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  }

  return (
    <Card>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
                  title='Sentiment Level'
                  titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip arrow title={chartId}>
              <Information style={{marginTop: '22px', fontSize: '29px'}} />
          </StyledTooltip>
        </span>
        <CardContent>
            <ReactApexcharts type="bar" height={276} series={series} options={options} />
        </CardContent>
    </Card>
  )
}

export default SentimentLevelChart