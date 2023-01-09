import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from "@mui/material";
import dynamic from 'next/dynamic'
import { StyledTooltip } from './overall';
import { Information } from 'mdi-material-ui';
import { GetSentimentScore } from 'src/services/api/dashboards/overall/overallDashboardApi';

// import GaugeChart from 'react-gauge-chart'

const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

const SentimentGaugeChart = ({params, chartId} : {params:any, chartId: string}) => {
    const {resultSentimentScore} = GetSentimentScore(params?.campaign, params?.platformId, params?.date, params?.endDate, params?.period, params?.previousDate, params?.previousEndDate);
    
    return(
        <Card style={{ maxHeight: '340px' }}>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Sentiment Score'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <StyledTooltip arrow title={chartId}>
                    <Information  style={{marginTop: '22px', fontSize: '29px'}} />
                </StyledTooltip>
            </span>
            <CardContent>
                <Grid container spacing={4}>
                    <Grid item xs={8}>

                        <GaugeChart 
                            id="gauge-chart"
                            animate={false} 
                             nrOfLevels={3}
                             arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
                             colors={['#EA4228','#ff9800', '#ffc107', '#ffeb3b','#5BE12C', ]}
                             percent={resultSentimentScore?.sentiment_percentage/100 || 0}
                             arcPadding={0.01}
                             needleColor="#4c4e64de"
                             hideText={true}
                            />

                    </Grid>
                    <Grid item xs={4}>
                        <h1>{resultSentimentScore?.neutral_value}</h1>
                        <p>Neutral</p>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={12} sx={{ display:'flex', justifyContent: 'center' }}>
                        <h2 style={{ marginTop: '0.5rem', marginRight: '1rem' }}>Previous Period Score {  resultSentimentScore?.pervious_sentiment}</h2>
                        <h1></h1>
                    </Grid>
                </Grid>
                
            </CardContent>
            
        </Card>
        
    )
}

export default SentimentGaugeChart
