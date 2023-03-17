// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { LinearProgress } from '@mui/material'

// ** Third Party Imports
// import { Bar } from 'react-chartjs-2'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import Translations from 'src/layouts/components/Translations'
import { ChannelColors } from 'src/utils/const'
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { ApexOptions } from 'apexcharts'

const ChartLabels = (data: any) => {
  if (!data) return []
  const keywordData = data

  const labels: any[] = []

  for (let i = 0; i < keywordData?.length; i++) {
    labels.push(keywordData[i].keyword_name)
  }

  return labels
}

const ChartData = (data: any) => {
  if (!data) return []

  const chartDatas: any[] = []
  for (let i = 0; i < data?.length; i++) {
    chartDatas.push(data[i]?.total_value)
  }

  return chartDatas
}

const ChannelBySentiment = ({
  chartId,
  highlight,
  resultBy,
  loading
}: {
  params: any
  chartId: string
  highlight: boolean
  resultBy?: any
  loading?: boolean
}) => {
  const labels = resultBy ? ChartLabels(resultBy) : []

  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       axis: 'y',
  //       label: '',
  //       data: ChartData(resultBy),
  //       fill: false,
  //       backgroundColor: ChannelColors,
  //       borderColor: ChannelColors,
  //       borderWidth: 1
  //     }
  //   ]
  // }

  const series = [
    {
      name: 'Total ',
      data:  ChartData(resultBy)
    }
  ]

  const data : ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false }
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true
      }
    },
    colors: ChannelColors,
    xaxis: {
      categories: labels
    },
    legend: {
      show: false
    }
  }

  const reportNo = '3.2.015'

  const chartTitle = chartId + ', Report Level 2(' + reportNo + ')'

  return (
    <Card sx={{ minHeight: 460 }}>
      {loading && <LinearProgress style={{ width: '100%' }} />}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
          title={<Translations text='Channel by Sentiement' />}
          titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <StyledTooltip arrow title={chartTitle || ''}>
          <Information style={{ marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
        </StyledTooltip>
      </span>
      <CardContent>
          {!resultBy ? (
            <div
              style={{
                height: 200,
                padding: '170px 0',
                textAlign: 'center',
                verticalAlign: 'middle',
                color: '#80808059',
                alignItems: 'center'
              }}
            >
              <Translations text='no data' />
            </div>
          ) : (

            // <Bar data={data} options={{ indexAxis: 'y', plugins:{legend: {display: false}} }} height={140} />

            <ReactApexcharts type='bar' series={series} options={data} height={300} />
          )}
      </CardContent>
    </Card>
  )
}

export default ChannelBySentiment
