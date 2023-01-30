// ** MUI Imports
import Paper from '@mui/material/Paper'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { Grid, LinearProgress } from "@mui/material"

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { EngagementTransChartColor, EngagementTypeColors } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'

interface MessageData {
  type: string
  chartId : string,
  params: any,
  highlight: boolean
  resultEngagementType: any
  loadingEngagementType : boolean
}

const PercentageOfEngangementType = (props : MessageData) => {

  const { type, chartId, highlight,resultEngagementType, loadingEngagementType } = props;
  const colors = type === 'transaction' ? EngagementTransChartColor : EngagementTypeColors;
  const reportNo = '4.1.011';
  const chartTitle = chartId + ", Report Level 1(" + reportNo + ")";
  const initValue = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: colors,
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
          backgroundColor: colors,
          hoverOffset: 4
        }]
      };

      return chartData;
    }
    const labels : string[] =[];
    const percentage: number[] = [];
    for(let i =0; i<data?.length; i++ ) {
      labels.push(data[i].name);
      const percentageValue = data[i]?.value;
      percentage.push(percentageValue?.percentage)
      if (type === 'current') {
        setCurrentPeriod(percentageValue?.date)
        
      } else {
        setPreviousPeriod(percentageValue?.date);

      }
    }
    const returnData = {
      labels: labels,
      datasets: [{
        data:percentage,
        backgroundColor: colors,
        hoverOffset: 4
      }]
    };
    
    return returnData;
  }

  const title =  type === 'transaction' ? 'Percentage of Engagement Trans' : "Percentage of Engagement Type";

  useEffect(() =>{
    if (resultEngagementType) {
      const currentMessageData = resultEngagementType?.prcentage_of_engagement_current;
      const previousMessageData = resultEngagementType?.prcentage_of_engagement_previous;
      
      if(currentMessageData || previousMessageData) {
        const currentDataset = chartDataset(currentMessageData, 'current');
        setCurrentData(currentDataset);

        const previousDataset = chartDataset(previousMessageData, 'previous');
        setPreviousData(previousDataset);

      } else {
        setCurrentData(initValue);
        setPreviousData(initValue);
      }
    } else {
      setCurrentData(initValue);
      setPreviousData(initValue);
    }
  }, [resultEngagementType]);

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1}} square variant='outlined'>
      {loadingEngagementType && (
        <LinearProgress
            style={{ width: "100%" }}
        />
        )}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title= {title}
            titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
            subheader='Period over Period Comparison'
            subheaderTypographyProps={{ variant: 'caption', color: highlight ? 'green' : '#4c4e64de' }}
          />
          <StyledTooltip arrow title={chartTitle || ""}>
              <Information style={{marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de'}} />
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
    </Paper>
  )
}

export default PercentageOfEngangementType
