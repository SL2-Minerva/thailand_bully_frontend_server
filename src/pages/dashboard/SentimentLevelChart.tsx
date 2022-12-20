import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'


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

const SentimentLevelChart = ({sentimentLevel} : {sentimentLevel: any}) => {
  
  const chartLabels =  Labels(sentimentLevel);
  const positiveData = ChartDataPositive(sentimentLevel, 'positive');
  const neutralData = ChartDataPositive(sentimentLevel, 'neutral');
  const negativeData = ChartDataPositive(sentimentLevel, 'negative');


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
        <CardHeader
                title='Sentiment Level'
                titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent>
            <ReactApexcharts type="bar" height={274} series={series} options={options} />
        </CardContent>
    </Card>
  )
}

export default SentimentLevelChart