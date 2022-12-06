import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from "@mui/material";

// import Speedometer, {
//     Arc,
//     Needle,
//     Progress,
//     Indicator,
//   } from 'react-speedometer';
// import { Text } from 'mdi-material-ui';

import GaugeChart from 'react-gauge-chart'

const SentimentGaugeChart = ({value} : {value:any}) => {

    // const value = 30;
    // const accentColor = value < 30 ? 'green' : value < 65 ? 'orange' : 'red' ;

    return(
        <Card>
            <CardHeader
                title='Sentiment Score'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <Grid container spacing={4}>
                    <Grid item xs={8}>

                        <GaugeChart 
                            id="gauge-chart"
                             nrOfLevels={value}
                             arcsLength={[0.3, 0.5, 0.2]}
                             colors={['#5BE12C', '#F5CD19', '#EA4228']}
                             percent={value/10000}
                             arcPadding={0.02}
                             needleColor="#F35725"
                             textColor={"grey"}
                            />

                        {/* <Speedometer
                            value={54}
                            max={100}
                            angle={160}
                            fontFamily='squada-one'
                            lineCap="round"
                            accentColor={accentColor}
                            >
                            <Background angle={180} />
                            <Arc arcWidth={40} />
                            <Progress arcWidth={40} />
                            <Needle color='orange'/>
                            <Progress/>
                            <Marks/> 
                            <Indicator>
                                {(value, textProps) => (
                                <Text
                                    {...textProps}
                                    fontSize='large'
                                    fill="#555"
                                    x={250 / 2}
                                    y={210}
                                    textAnchor="middle"
                                    fontFamily='squada-one'
                                >
                                    {value}k/m
                                </Text>
                                )}
                            </Indicator>
                        </Speedometer> */}
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
