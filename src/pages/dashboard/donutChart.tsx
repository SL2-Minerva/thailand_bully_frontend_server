// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { Grid } from "@mui/material"

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { GraphicColors } from 'src/utils/const'
import { Information } from 'mdi-material-ui'
import { StyledTooltip } from './overall'
import { FilterByCampaignId } from 'src/services/api/dashboards/overall/overallDashboardApi'

interface MessageData {
  params : any
}

const DonutChart = (props : MessageData) => {

  const { params } = props;
  const { resultFilterData } = FilterByCampaignId(params?.campaign, params?.platformId, params?.date, params?.endDate, params?.period, params?.previousDate, params?.previousEndDate);
  const initValue = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: GraphicColors,
      hoverOffset: 4
    }]
  };

  const [ previousData, setPreviousData ] = useState<any>(initValue);
  const [ currentData, setCurrentData ] = useState<any>(initValue);
  const [ currentPeriod, setCurrentPeriod ] = useState<string>('');
  const [ previousPeriod, setPreviousPeriod ] = useState<string>('');

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

  const chartDataset = (data:any, type: string) => {
    if (!data) 
    {
      const chartData = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: GraphicColors,
          hoverOffset: 4
        }]
      };

      return chartData;
    }
    const labels : string[] =[];
    const percentage: number[] = [];
    for(let i =0; i<data?.length; i++ ) {
      labels.push(data[i].keyword_name);

      const percentageValue = data[i]?.value;
      for(let j = 0 ; j<percentageValue?.length; j++) {
        percentage.push(data[i].value[j]?.percentage);
        if (type === 'current') {
          setCurrentPeriod(data[i].value[j]?.date)
        } else {
          setPreviousPeriod(data[i].value[j]?.date);
        }
      }
    }
    const returnData = {
      labels: labels,
      datasets: [{
        data: percentage,
        backgroundColor: GraphicColors,
        hoverOffset: 4
      }]
    };
    
    return returnData;
  }

  useEffect(() =>{
    if (resultFilterData) {
      const currentMessageData = resultFilterData?.prcentage_of_messages_current;
      const previousMessageData = resultFilterData?.prcentage_of_messages_previous;
      
      if(currentMessageData) {
        const currentDataset = chartDataset(currentMessageData, 'current');
        setCurrentData(currentDataset);
      } else {
        setCurrentData(initValue);
      }

      if(previousMessageData) {
        const previousDataset = chartDataset(previousMessageData, 'previous');
        setPreviousData(previousDataset);
      } else {
        setPreviousData(initValue);
      }
    }
  }, [resultFilterData]);

  return (
    <Card>
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title='Percentage of Messages'
            titleTypographyProps={{ variant: 'h6' }}
            subheader='Period over Period Comparison'
            subheaderTypographyProps={{ variant: 'caption' }}
          />
          <StyledTooltip arrow title="Chart 1">
              <Information fontSize='large' style={{marginTop: '23px'}} />
          </StyledTooltip>
      </span>
      
      <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Doughnut data={currentData} options={options as any} height={343} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Doughnut data={previousData} options={options as any} height={343} />
            </Grid>  
            <Grid item xs={12} md={6}>  
                <p style={{ fontSize:'10px' }}> Current Period :</p>  
                <p style={{ fontSize:'10px' }}> {currentPeriod} </p>                  
            </Grid>
            <Grid item xs={12} md={6}>
                 <p style={{ fontSize:'10px' }}> Previous Period : </p>  
                 <p style={{ fontSize:'10px' }}>  {previousPeriod} </p>  

            </Grid>  
        </Grid>
        
      </CardContent>
    </Card>
  )
}

export default DonutChart
