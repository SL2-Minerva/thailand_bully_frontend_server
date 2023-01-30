import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { SentimentAllColors } from 'src/utils/const'
import { LinearProgress } from '@mui/material'


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

const ChartDataSentiment = (data: any, type : string) => {
  if(!data) {
    return [];
  }
  const value : any[] = []
  if(data?.length > 0) {
    if(type === 'negative') {
      for(let i=0; i<data?.length; i++) {
        value.push(data[i].negative);
      }
    } else if(type==='neutral') {
      for(let i=0; i<data?.length; i++) {
        value.push(data[i].neutral);
      }
    } else if (type === 'positive') {
      for(let i=0; i<data?.length; i++) {
        value.push(data[i].positive);
      }
    }

  }

  return value;
}

const SentimentScorePercentage = ({highlight, resultSentimentScorePercentage, loadingSentimentScore } : {params: any, highlight: boolean, resultSentimentScorePercentage: any, loadingSentimentScore : boolean }) => {
  
  const chartLabels =  Labels(resultSentimentScorePercentage);
  const negativeData = ChartDataSentiment(resultSentimentScorePercentage, 'negative');
  const neutralData = ChartDataSentiment(resultSentimentScorePercentage, 'neutral');
  const positiveData = ChartDataSentiment(resultSentimentScorePercentage, 'positive');


  const series =  [{
    name: 'negative',
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
    colors: SentimentAllColors,
    xaxis: {
      categories: chartLabels,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "%"
        }
      }
    },
    fill: {
      opacity: 1,
      colors: SentimentAllColors,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  }

  return (
    <Card>
      {loadingSentimentScore && (
            <LinearProgress
                style={{ width: "100%" }}
            />
            )}
        <CardHeader
                title=''
                titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <CardContent>
            <ReactApexcharts type="bar" height={380} series={series} options={options} />
        </CardContent>
    </Card>
  )
}

export default SentimentScorePercentage