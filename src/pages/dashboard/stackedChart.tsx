// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'

interface LineProps {
  white: string
  warning: string
  primary: string
  success: string
  labelColor: string
  borderColor: string
  gridLineColor: string
}

const StackedChart = (props: LineProps) => {
  // ** Props
  const { white, primary, success, warning, labelColor, borderColor, gridLineColor } = props

  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor,
          color: gridLineColor
        },
        stacked: true
      },
      y: {
        min: 0,
        max: 400,
        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: labelColor
        },
        grid: {
          borderColor,
          color: gridLineColor
        },

        // stacked: true
        
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: {
          padding: 25,
          boxWidth: 10,
          color: labelColor,
          usePointStyle: true
        }
      }
    }
  }

  const data = {
    labels: ['01/09', '02/09', '03/09', '04/09', '05/09', '06/09', '07/09', '08/09', '09/09', '10/09', '11/09', '12/09', '13/09', '14/09', '15/09'],
    datasets: [
      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: 'Keyword 1',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: primary,
        backgroundColor: primary,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: primary,
        data: [30, 50, 30, 150, 80, 100, 160, 202, 265, 210, 170, 150, 190, 260, 275]
      },
      {
        fill: false,
        tension: 0.5,
        label: 'Keyword 2',
        pointRadius: 1,
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: warning,
        backgroundColor: warning,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: warning,
        data: [45, 60, 50, 200, 120, 195, 190, 230, 290, 300, 220, 170, 210, 280, 280]
      },
      {
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: 'Keyword 3',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        borderColor: success,
        backgroundColor: success,
        pointHoverBorderWidth: 5,
        pointHoverBorderColor: white,
        pointBorderColor: 'transparent',
        pointHoverBackgroundColor: success,
        data: [80, 99, 82, 90, 230, 200, 250, 205, 240, 300, 350, 280, 190, 290, 300]
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='Daily Message'
        titleTypographyProps={{ variant: 'h6' }}
        subheader='KeyWords'
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <CardContent>
        <Bar data={data} options={options as any} height={400} />
      </CardContent>
    </Card>
  )
}

export default StackedChart
