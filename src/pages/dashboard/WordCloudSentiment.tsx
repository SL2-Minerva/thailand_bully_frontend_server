import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Button, Card, CardHeader, Grid } from "@mui/material";
import { useState } from "react";

const WordCloudSentiment = ({resultWordClouds} : {resultWordClouds: any}) => {
    const [ sentiment, setSentiment ] = useState('');

    const chooseSentiment = (value: string) =>{ 
        setSentiment(value);
    } 

    return (
        <Card sx={{ maxHeight: 500,minHeight: 500 }}>
            <CardHeader
                title='Word Clouds'
                titleTypographyProps={{ variant: 'h6' }}
            />
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
                <ReactWordcloud words={resultWordClouds?.word_clouds_position || [] } />
            </div>
        </Card>
    )
}

export default WordCloudSentiment