import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from "@mui/material";
import dynamic from 'next/dynamic'

// import GaugeChart from 'react-gauge-chart'

const GaugeChart = dynamic(() => import("react-gauge-chart"), { ssr: false });

const SentimentGaugeChart = ({resultSentimentScore} : {resultSentimentScore:any}) => {
    
    return(
        <Card style={{ maxHeight: '340px' }}>
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
                        <h2 style={{ marginTop: '1.8rem', marginRight: '1rem' }}>Previous Period Score</h2>
                        <h1>{resultSentimentScore?.pervious_sentiment}</h1>
                    </Grid>
                </Grid>
                
            </CardContent>
            
        </Card>
        
    )
}

export default SentimentGaugeChart
