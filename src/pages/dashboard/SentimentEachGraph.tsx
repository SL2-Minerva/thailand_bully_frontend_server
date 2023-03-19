// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import Translations from 'src/layouts/components/Translations'

const Labels = (data: any) => {
  if (!data) {
    return []
  }
  const labels: any[] = []
  labels.push(data?.keyword_name || "")

  return labels
}

const ChartDataPositive = (data: any, type: string) => {
  if (!data) {
    return []
  }
  const value: any[] = []
  if (type === 'positive') {
    value.push(data?.Positive)
  } else if (type === 'negative') {
    value.push(data?.Negative)
  } else if (type === 'neutral') {
    value.push(data?.Neutral)
  }

  return value
}

const SentimentEachGraph = ({ resultSentimentLevel }: { resultSentimentLevel: any }) => {
  
  const chartLabels = Labels(resultSentimentLevel)
  const positiveData = ChartDataPositive(resultSentimentLevel, 'positive')
  const neutralData = ChartDataPositive(resultSentimentLevel, 'neutral')
  const negativeData = ChartDataPositive(resultSentimentLevel, 'negative')

  console.log("chartLabels", resultSentimentLevel, chartLabels, "positive data", positiveData, 'negative', negativeData)
  const series = [
    {
      name: 'Negative',
      data: negativeData
    },
    {
      name: 'Neutral',
      data: neutralData
    },
    {
      name: 'Positive',
      data: positiveData
    }
  ]

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      stackType: '100%',
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: ''
    },
    colors: ['#C73E1D', '#FEB95F', '#63A375'],
    xaxis: {
      categories: chartLabels,
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + '%'
        }
      }
    },
    fill: {
      opacity: 1,
      colors: ['#C73E1D', '#FEB95F', '#63A375']
    },
    legend: {
      show: false
    }
  }

  return (
    <>
      {resultSentimentLevel ? (
        <>
          <ReactApexcharts type='bar' series={series} options={options} height={75} />
        </>
        ) : (
          <div
            style={{
              padding: '130px 0',
              textAlign: 'center',
              verticalAlign: 'middle',
              color: '#80808059'
            }}
          >
            <Translations text='no data' />
          </div>
        )}
    </>
  )
}

export default SentimentEachGraph
