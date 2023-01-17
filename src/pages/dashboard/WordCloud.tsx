import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Card, CardHeader } from "@mui/material";
import { StyledTooltip } from "./overall";
import { Information } from "mdi-material-ui";
import { GetWordClouds } from "src/services/api/dashboards/overall/overallDashboardApi";

const WordCloud = ({params, chartId} : {params: any, chartId: string} ) => {
    const { resultWordClouds } = GetWordClouds(params?.campaign, params?.platformId, params?.date, params?.endDate, params?.period, params?.previousDate, params?.previousEndDate);
    const reportNo = '1.2.021';

    const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

    return (
        <Card sx={{ maxHeight: 450,minHeight: 450 }}>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader
                    title='Word Clouds'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <StyledTooltip arrow title={chartTitle || ""}>
                    <Information style={{marginTop: '22px', fontSize: '29px'}} />
                </StyledTooltip>
            </span>
            <div style={{ height: 400, width: 600 }}>
                <ReactWordcloud words={resultWordClouds?.word_clouds || []} />
            </div>
        </Card>
    )
}

export default WordCloud