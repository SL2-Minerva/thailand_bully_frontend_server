// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { Grid, LinearProgress } from "@mui/material"

// ** Third Party Imports

import { Doughnut } from 'react-chartjs-2'
import { ThumbUp, ThumbDown, ThumbsUpDown, Information } from 'mdi-material-ui'
import { StyledTooltip } from './overall'
import { GetSentimentType } from 'src/services/api/dashboards/overall/overallDashboardApi'

const CommentSentiment  = ({params, chartId} : {params:any, chartId: string}) => {
  const {resultSentimentType, loadingFilterData} = GetSentimentType(params?.campaign, params?.platformId, params?.date, params?.endDate, params?.period, params?.previousDate, params?.previousEndDate);
  const reportNo = '1.1.019';

  const chartTitle = chartId + ", Report Level 1(" + reportNo + ")";

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
      backgroundColor: ['#C73E1D','#FEB95F', '#63A375'],
      hoverOffset: 3
    }]
  };

  return (
    <Card style={{ minHeight: '340px' }}>
      {loadingFilterData && (
          <LinearProgress
            style={{ width: "100%" }}
          />
        )}
      <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <CardHeader
            title='Comment Sentiment'
            titleTypographyProps={{ variant: 'h6' }}
          />
          <StyledTooltip arrow title={chartTitle || ""}>
              <Information  style={{marginTop: '22px', fontSize: '29px'}} />
          </StyledTooltip>
      </span>
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
