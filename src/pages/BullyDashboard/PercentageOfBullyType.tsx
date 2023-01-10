// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { Grid } from "@mui/material"

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { BullyDashboardColors } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { FilterBullyTypeByCampaignId } from 'src/services/api/dashboards/bully/BullyDashboardAPI'

interface MessageData {
  params : any,
  type: string,
  chartId: string 
}

const PercentageOfBully = (props : MessageData) => {

  const { params, type, chartId } = props;
  const colors = BullyDashboardColors;
  const {resultBullyTypeFilterData} = FilterBullyTypeByCampaignId(params?.campaign, params?.date, params?.endDate, params?.period);
  
  const [ previousData, setPreviousData ] = useState<any>({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: colors,
      hoverOffset: 4
    }]
  });
  const [ currentData, setCurrentData ] = useState<any>({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: colors,
      hoverOffset: 4
    }]
  });
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
        if(data[i].bully_level) {
            labels.push(data[i].bully_level);  
        } else  if (data[i].bully_type) {
             labels.push(data[i].bully_type);
        }

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
        backgroundColor: colors,
        hoverOffset: 4
      }]
    };
    
    return returnData;
  }

  const title =  type === 'level' ? 'Percentage of Bully Level' : "Percentage of Bully Type";

  useEffect(() =>{
    if (resultBullyTypeFilterData) {
      const currentMessageData = resultBullyTypeFilterData?.percentage_of_bully_current;
      const previousMessageData = resultBullyTypeFilterData?.percentage_of_bully_previous;
      
      if(currentMessageData) {
        const currentDataset = chartDataset(currentMessageData, 'current');
        setCurrentData(currentDataset);

        const previousDataset = chartDataset(previousMessageData, 'previous');
        setPreviousData(previousDataset);

      }
    }
  }, [resultBullyTypeFilterData]);

  return (
    <Card>
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
            title= {title}
            titleTypographyProps={{ variant: 'h6' }}
            subheader='Period over Period Comparison'
            subheaderTypographyProps={{ variant: 'caption' }}
        />
        <StyledTooltip arrow title={chartId}>
            <Information style={{marginTop: '22px', fontSize: '29px'}} />
        </StyledTooltip>
      </span>
      <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <Doughnut data={currentData} options={options as any} height={330} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Doughnut data={previousData} options={options as any} height={330} />
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

export default PercentageOfBully
