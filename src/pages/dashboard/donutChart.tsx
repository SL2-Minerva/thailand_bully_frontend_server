// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { Grid } from "@mui/material"

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { useEffect } from 'react'

interface MessageData {
  filterData : any
}

const DonutChart = (props : MessageData) => {

  const { filterData } = props;

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
      }
    }
  }

  const data = {
    labels: [
      'Keyword1',
      'Keyword2',
      'Keyword3'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  useEffect(() =>{
    console.log("data");
  }, [filterData]);

  return (
    <Card>
      <CardHeader
        title='Percentage of Messages'
        titleTypographyProps={{ variant: 'h6' }}
        subheader='Period over Period Comparison'
        subheaderTypographyProps={{ variant: 'caption' }}
      />
      <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Doughnut data={data} options={options as any} height={320} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Doughnut data={data} options={options as any} height={320} />
            </Grid>  
            <Grid item xs={12} md={6}>  
                <p style={{ fontSize:'10px' }}> Current Period :</p>  
                <p style={{ fontSize:'10px' }}> 01/10/2022 - 10/10/2022 </p>                  
            </Grid>
            <Grid item xs={12} md={6}>
                 <p style={{ fontSize:'10px' }}> Previous Period : </p>  
                 <p style={{ fontSize:'10px' }}>  01/09/2022 - 10/09/2022 </p>  

            </Grid>  
        </Grid>
        
      </CardContent>
    </Card>
  )
}

export default DonutChart
