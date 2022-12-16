// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { Grid } from "@mui/material"

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { Chart} from "chart.js";
import * as DoughnutLabel from "chartjs-plugin-doughnutlabel-rebourne";


Chart.register(DoughnutLabel );
const DailyMessagePieChart  = () => {

  const theme = useTheme()
  const labelColor = theme.palette.text.primary
  
  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
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
      },
        doughnutlabel: {
                paddingPercentage: 5,
                labels: [
                    {
                    text: 40392,
                    font: {
                        size: '50',
                        family: 'Arial, Helvetica, sans-serif',
                        weight: 'bold',
                    },
                    color: '#434343',
                    },
                ],
            },
    }
  }

  const data = {
    labels: [
        'keyword1',
        'keyword2',
        'keyword3'
      ],
    datasets: [{
        data: [400, 300, 500],
      backgroundColor: [
        "#299b82",
        "#1640a1c4",
        "#d8df20",
        "#e02916",
        "#ffca25",
        "#C0D3DF",
      ],
      hoverOffset: 3
    }]
  };

  return (
    <Card style={{ minHeight: '330px' }}>
      <CardHeader title="Percentage of Message" titleTypographyProps={{ varient:'h6' }}
                subheader="Period over Period Comparison"
                subheaderTypographyProps={{ varient: 'h6' }}
            />
      <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Doughnut data={data} options={options as any} height={290} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Doughnut data={data} options={options as any} height={290} />
            </Grid>
        </Grid>
        <Grid container spacing={3} mt={3}>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
               Current Period
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                Previous Period
            </Grid>
        </Grid>
        
      </CardContent>
    </Card>
  )
}

export default DailyMessagePieChart
