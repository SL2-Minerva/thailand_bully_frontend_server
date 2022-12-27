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
import { useEffect, useState } from 'react'
import { GraphicColors } from 'src/utils/const' 
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'

interface Props {
  percentData : any
  type : string
  chartId : string
}
Chart.register(DoughnutLabel );
const DailyMessagePieChart  = ( props : Props) => {
  const { percentData, type, chartId } = props;

  const theme = useTheme()
  const labelColor = theme.palette.text.primary
  const initValue = {
    labels: [],
    data: [],
    total: 0
  }
  const [previousData, setPreviousData ] = useState(initValue);
  const [currentData, setCurrentData] = useState(initValue);
  
  const currentPeriodOptions = {
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
                    text: currentData?.total || 0,
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

  const currentPeriodData = {
    labels: currentData?.labels || [],
    datasets: [{
        data: currentData?.data || [],
      backgroundColor: GraphicColors,
      hoverOffset: 3
    }]
  };

  const previousPeriodOptions = {
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
                    text: previousData?.total || 0,
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

  const previousPeriodData = {
    labels: previousData?.labels || [],
    datasets: [{
        data: previousData?.data || [],
      backgroundColor: GraphicColors,
      hoverOffset: 3
    }]
  };

  useEffect(()=>{
    if(percentData) {
        setCurrentData(percentData.current_period);
        setPreviousData(percentData.previous_period);
    }
  },[percentData]);

  return (
    <Card style={{ minHeight: '330px' }}>
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          {
            type === "message" ?
            <CardHeader title="Percentage of Message" titleTypographyProps={{ varient:'h6' }}
                    subheader="Period over Period Comparison"
                    subheaderTypographyProps={{ varient: 'h6' }}
                />
            :
            <CardHeader title="Percentage of Channel" titleTypographyProps={{ varient:'h6' }}
                    subheader="Period over Period Comparison"
                    subheaderTypographyProps={{ varient: 'h6' }}
                />
          }
          <StyledTooltip arrow title={chartId}>
              <Information  style={{marginTop: '22px', fontSize: '29px'}} />
          </StyledTooltip>
      </span>
      
      <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Doughnut data={currentPeriodData} options={currentPeriodOptions as any} height={290} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Doughnut data={previousPeriodData} options={previousPeriodOptions as any} height={290} />
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
