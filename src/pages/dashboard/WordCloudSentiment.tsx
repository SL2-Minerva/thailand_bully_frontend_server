import ReactWordcloud from "react-wordcloud";
import Words from "src/types/dashboard/words";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Button, Card, CardHeader, Grid } from "@mui/material";

const WordCloudSentiment = () => {

    return (
        <Card sx={{ maxHeight: 500,minHeight: 500 }}>
            <CardHeader
                title='Word Clouds'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <Grid container spacing={2}>
                <Grid item sm={8} xs={8} ml={4}>
                    <Button variant="contained" color="inherit" size="medium" style={{ marginRight: '6px' }}> Positive </Button>
                    <Button variant="contained" color="error" size="medium" > Negative </Button>

                </Grid>
            </Grid>
            <div style={{ height: 400, width: 600 }}>
                <ReactWordcloud words={Words} />
            </div>
        </Card>
    )
}

export default WordCloudSentiment