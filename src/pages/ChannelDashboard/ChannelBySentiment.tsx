// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from "@mui/material"

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'

const ChartLabels = (data: any) => {
  if (!data) return [];
  const keywordData = data;

  const labels : any[] = [];

  for (let i = 0; i<keywordData?.length ; i ++) {
    labels.push(keywordData[i].keyword_name)
  }
  
  return labels;
}

const ChannelBySentiment  = ({resultShareOfVoice, chartId} : {resultShareOfVoice: any, chartId: string}) => {

  const labels = resultShareOfVoice ? ChartLabels(resultShareOfVoice) : [];
  const data = {
  labels: labels,
  datasets: [{
      axis: 'y',
      label: 'Number of Messages',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      backgroundColor: ['rgb(54, 162, 235)'],
      borderColor: [
      'rgb(54, 162, 235)'
      ],
      borderWidth: 1
  }]
  };  


  return (
    <Card>
        <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title='Channel by Sentiment'
            titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip arrow title={chartId}>
              <Information style={{marginTop: '22px', fontSize: '29px'}} />
          </StyledTooltip>
        </span>
      <CardContent>
        <Grid container spacing={3}>
            <Bar data={data} options={{ indexAxis: 'y' }} height={140}/>
        </Grid>
        
      </CardContent>
    </Card>
  )
}

export default ChannelBySentiment
