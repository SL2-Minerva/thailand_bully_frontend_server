// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { Grid } from "@mui/material"

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { ThumbUp, ThumbDown, ThumbsUpDown } from 'mdi-material-ui'

const CommentSentiment  = ({resultSentimentType} : {resultSentimentType:any}) => {

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
      'Negative',
      'Neutral',
      'Positive'
    ],
    datasets: [{
      data: [resultSentimentType?.negative_percentage || 0 , resultSentimentType?.neutral_percentage || 0, resultSentimentType?.positive_percentage||0],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 3
    }]
  };

  return (
    <Card style={{ minHeight: '330px' }}>
      <CardHeader
        title='Comment Sentiment'
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <Doughnut data={data} options={options as any} height={194} />
            </Grid>
            <Grid item xs={4} mt={14}>
                <span><ThumbUp/> { "Positive " + resultSentimentType?.positive_percentage + "%"}</span>
                <br/>
                <span><ThumbsUpDown />  {"Neutral " + resultSentimentType?.neutral_percentage + "%"}</span>
                <br/>
                <span><ThumbDown />  {"Negative " + resultSentimentType?.negative_percentage + "%"}</span>
                
            </Grid>  
        </Grid>
        
      </CardContent>
    </Card>
  )
}

export default CommentSentiment
