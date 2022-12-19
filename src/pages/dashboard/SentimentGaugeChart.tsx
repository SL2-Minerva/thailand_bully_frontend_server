import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from "@mui/material";
import dynamic from 'next/dynamic'
import { GetSentimentScore } from 'src/services/api/dashboards/overall/overallDashboardApi';

// import GaugeChart from 'react-gauge-chart'

const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

const SentimentGaugeChart = ({value} : {value:any}) => {
    
    const {resultSentimentScore} = GetSentimentScore();

    return(
        <Card style={{ maxHeight: '330px' }}>
            <CardHeader
                title='Sentiment Score'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <Grid container spacing={4}>
                    <Grid item xs={8}>

                        <GaugeChart 
                            id="gauge-chart"
                            animate={false} 
                             nrOfLevels={value}
                             arcsLength={[0.5, 0.3, 0.2]}
                             colors={['#5BE12C', '#F5CD19', '#EA4228']}
                             percent={resultSentimentScore?.sentiment_percentage/100 || 0}
                             arcPadding={0.01}
                             needleColor="#4c4e64de"
                             textColor={"grey"}
                            />

                    </Grid>
                    <Grid item xs={4}>
                        <h1>{resultSentimentScore?.neutral_value}</h1>
                        <p>Neutral</p>
                    </Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={12} sx={{ display:'flex', justifyContent: 'center' }}>
                        <h2 style={{ marginTop: '1.8rem', marginRight: '1rem' }}>Previous Period Score</h2>
                        <h1>{resultSentimentScore?.pervious_sentiment}</h1>
                    </Grid>
                </Grid>
                
            </CardContent>
            
        </Card>
        
    )
}

export default SentimentGaugeChart
