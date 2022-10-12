import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const SentimentLevelChart = () => {
    
  const series =  [{
    name: 'Negative',
    data: [44, 55, 41, 37, 22, 43]
  }, {
    name: 'Neutral',
    data: [53, 32, 33, 52, 13, 43]
  }, {
    name: 'Positive',
    data: [12, 17, 11, 9, 15, 11]
  }]

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: '100%'
    },
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
      text: '100% Stacked Bar'
    },
    colors: ['#FF0000', '#F47B20', '#008000'],
    xaxis: {
      categories: ["All", "keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5"],
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
            <ReactApexcharts type="bar" height={294} series={series} options={options} />
        </CardContent>
    </Card>
  )
}

export default SentimentLevelChart