import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GetKeywordComparisonBySentiment } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

import { Radar } from 'react-chartjs-2';
import { getChartData, initValue } from './KeywordComparisonByBullyType'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const KeywordComparisonBySentiment = ({params, chartId, highlight} : {params:any, chartId: string, highlight?: boolean}) => {
  const [ charData, setChartData ] = useState(initValue);

  const { resultKeywordComparisonBySentiment } = GetKeywordComparisonBySentiment(params?.campaign, params?.date, params?.endDate, params?.period);

  useEffect(() => {
    if (resultKeywordComparisonBySentiment) {
      const seriesData = getChartData(resultKeywordComparisonBySentiment?.value);
      setChartData({
        labels: resultKeywordComparisonBySentiment?.labels ? resultKeywordComparisonBySentiment?.labels : [],
        datasets: seriesData
      })

    }
},[resultKeywordComparisonBySentiment]);

      const reportNo = '2.2.026';

      const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

    return (
        <Card>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader 
                    title='Percentage of Keyword Comparison By Sentiment'
                    titleTypographyProps={{ variant: 'h6',color: highlight ? 'green' : '#4c4e64de' }}
                />
                <StyledTooltip arrow title={chartTitle || ""}>
                    <Information style={{marginTop: '22px', fontSize: '29px',color: highlight ? 'green' : '#4c4e64de'}} />
                </StyledTooltip>
            </span>
            <CardContent>
                  <Radar data={charData} height={100}/>
            </CardContent>
        </Card>
    )
}

export default KeywordComparisonBySentiment