import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Button, Card, CardHeader, Grid } from "@mui/material";
import { useState } from "react";
import { StyledTooltip } from "./overall";
import { Information } from "mdi-material-ui";
import { GetWordCloudsSentiment } from "src/services/api/dashboards/overall/overallDashboardApi";

const WordCloudSentiment = ({params, chartId} : {params: any, chartId: string}) => {
    const [ sentiment, setSentiment ] = useState('');
    const { resultWordCloudsSentiment } = GetWordCloudsSentiment(params?.campaign, params?.platformId, params?.date, params?.endDate, params?.period, params?.previousDate, params?.previousEndDate);

    const chooseSentiment = (value: string) =>{ 
        setSentiment(value);
    } 

    return (
        <Card sx={{ maxHeight: 500,minHeight: 500 }}>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Word Clouds'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <StyledTooltip arrow title={chartId}>
                    <Information style={{marginTop: '22px', fontSize: '29px'}} />
                </StyledTooltip>
            </span>
            <Grid container spacing={2}>
                <Grid item sm={8} xs={8} ml={4}>
                    <Button variant="contained" color={sentiment ==='positive' ? 'warning' : 'inherit'} size="medium" 
                    style={{ marginRight: '6px' }} onClick={() => {chooseSentiment('positive')}}> 
                        Positive 
                    </Button>
                    <Button variant="contained" color={sentiment ==='negative' ? 'error' : 'inherit'}
                     size="medium" onClick={() => {chooseSentiment('negative')}}>
                         Negative
                    </Button>

                </Grid>
            </Grid>
            <div style={{ height: 400, width: 600 }}>
                <ReactWordcloud words={resultWordCloudsSentiment?.word_clouds_position || [] } />
            </div>
        </Card>
    )
}

export default WordCloudSentiment