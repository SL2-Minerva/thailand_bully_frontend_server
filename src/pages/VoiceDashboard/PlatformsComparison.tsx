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
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GetPlatformsComparison } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'


Chart.register(DoughnutLabel );
const PlatformsComparison  = ({params, chartId} : {params:any, chartId: string}) => {
  const {  resultPlatformComparison } = GetPlatformsComparison(params?.campaign, params?.date, params?.endDate, params?.period);

  const theme = useTheme()
  const labelColor = theme.palette.text.primary
  const initValue = {
    label: [],
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
    labels: currentData?.label || [],
    datasets: [{
        data: currentData?.data || [],
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
    labels: previousData?.label || [],
    datasets: [{
        data: previousData?.data || [],
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

  useEffect(()=>{
    if(resultPlatformComparison) {
        setCurrentData(resultPlatformComparison.current_period);
        setPreviousData(resultPlatformComparison.previous_period);
    }
  },[resultPlatformComparison]);

  return (
    <Card style={{ minHeight: '330px' }}>
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader title="Channel/Platforms" titleTypographyProps={{ varient:'h6' }}
                subheader="Period over Period Comparison"
                subheaderTypographyProps={{ varient: 'h6' }}
            />
          <StyledTooltip arrow title={chartId || ""}>
              <Information style={{marginTop: '22px', fontSize: '29px'}} />
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

export default PlatformsComparison
