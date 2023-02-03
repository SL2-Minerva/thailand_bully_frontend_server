// ** MUI Imports
import Paper from '@mui/material/Paper'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { Grid, LinearProgress } from "@mui/material"

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { BullyTypeColors } from 'src/utils/const'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { BullyTypePercentage } from 'src/services/api/dashboards/bully/BullyDashboardAPI'
import { useTranslation } from 'react-i18next'

interface MessageData {
  params : any,
  type: string,
  chartId: string
  highlight : boolean 
}

const PercentageOfBullyType = (props : MessageData) => {
  const {t} = useTranslation()
  const { params, type, chartId, highlight } = props;
  const colors = BullyTypeColors;
  const { resultBullyTypePercentage, loadingBullyTypePercentage } = BullyTypePercentage(params?.campaign, params?.date, params?.endDate, params?.period, params?.keywordIds);
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
        if(data[i].bully_level) {
            labels.push(t(data[i].bully_level));  
        } else  if (data[i].bully_type) {
             labels.push(t(data[i].bully_type));
        }

      // const percentageValue = data[i]?.value;
      // for(let j = 0 ; j<percentageValue?.length; j++) {
        
      // }

      percentage.push(data[i].value?.percentage);
        if (type === 'current') {
          setCurrentPeriod(data[i].value?.date)
        } else {
          setPreviousPeriod(data[i].value?.date);
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
    if (resultBullyTypePercentage) {

      // const currentMessageData = resultBullyTypePercentage?.percentage_of_bully_current;
      // const previousMessageData = resultBullyTypePercentage?.percentage_of_bully_previous;

      const currentMessageData = resultBullyTypePercentage?.prcentage_of_messages_current;
      const previousMessageData = resultBullyTypePercentage?.prcentage_of_messages_previous;
      if(currentMessageData) {
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
  }, [resultBullyTypePercentage,t]);

  const reportNo = '6.1.011';

  const chartTitle = chartId + ", Report Level 1(" + reportNo + ")";

  return (
    <Paper sx={{ border: `3px solid #fff`, borderRadius: 1}} square variant='outlined'>
       {loadingBullyTypePercentage && (
            <LinearProgress
                style={{ width: "100%" }} 
            />
            )} 
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <CardHeader
            title= {title}
            titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de'  }}
            subheader='Period over Period Comparison'
            subheaderTypographyProps={{ variant: 'caption', color: highlight ? 'green' : '#4c4e64de'  }}
        />
        <StyledTooltip arrow title={chartTitle || ""}>
            <Information style={{marginTop: '22px', fontSize: '29px', color: highlight ? 'green' : '#4c4e64de' }} />
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
    </Paper>
  )
}

export default PercentageOfBullyType
