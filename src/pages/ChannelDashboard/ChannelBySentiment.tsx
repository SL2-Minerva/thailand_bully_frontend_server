// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from "@mui/material"

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'

const ChartLabels = (data: any) => {
  if (!data) return [];
  const keywordData = data;

  const labels : any[] = [];

  for (let i = 0; i<keywordData?.length ; i ++) {
    labels.push(keywordData[i].keyword_name)
  }
  
  return labels;
}

const ChannelBySentiment  = ({resultShareOfVoice} : {resultShareOfVoice: any}) => {

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
      <CardHeader
        title='Channel by Sentiment'
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container spacing={3}>
            <Bar data={data} options={{ indexAxis: 'y' }} height={140}/>
        </Grid>
        
      </CardContent>
    </Card>
  )
}

export default ChannelBySentiment
