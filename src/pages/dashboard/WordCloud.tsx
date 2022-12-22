import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Card, CardHeader } from "@mui/material";

const WordCloud = ({resultWordClouds} : {resultWordClouds: any} ) => {

    return (
        <Card sx={{ maxHeight: 450,minHeight: 450 }}>
            <CardHeader
                title='Word Clouds'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <div style={{ height: 400, width: 600 }}>
                <ReactWordcloud words={resultWordClouds?.word_clouds || []} />
            </div>
        </Card>
    )
}

export default WordCloud