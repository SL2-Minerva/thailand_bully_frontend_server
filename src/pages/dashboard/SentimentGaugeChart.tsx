import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from "@mui/material";
import GaugeChart from 'react-gauge-chart'

const SentimentGaugeChart = () => {
    
    return(
        <Card>
            <CardHeader
                title='Sentiment Score'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <Grid container spacing={4}>
                    <Grid item xs={8} pb={6}>
                        <GaugeChart id="gauge-chart" 
                             nrOfLevels={420}
                             arcsLength={[0.3, 0.5, 0.2]}
                             colors={['#5BE12C', '#F5CD19', '#EA4228']}
                             percent={0.67}
                             arcPadding={0.02}
                             textColor={"grey"}
                            />
                    </Grid>
                    <Grid item xs={4}>
                        <h1>3.20</h1>
                        <p>Neutral</p>
                    </Grid>
                </Grid>
                
            </CardContent>
            
        </Card>
        
    )
}

export default SentimentGaugeChart
