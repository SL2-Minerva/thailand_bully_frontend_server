import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GetKeywordComparisonByBullyLevel } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'
import { getChartData, initValue } from './KeywordComparisonByBullyType'
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
import { LinearProgress } from '@mui/material'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const KeywordComparisonByBullyLevel = ({params, chartId, highlight} : {params:any, chartId: string, highlight:boolean}) => {
  const [ charData, setChartData ] = useState(initValue);

  const { resultKeywordComparisonByBullyLevel, loadingKeywordComparisonByBullyLevel } = GetKeywordComparisonByBullyLevel(params?.campaign, params?.date, params?.endDate, params?.period);

      useEffect(() => {
          if (resultKeywordComparisonByBullyLevel) {
            const seriesData = getChartData(resultKeywordComparisonByBullyLevel?.value);
            setChartData({
              labels: resultKeywordComparisonByBullyLevel?.labels ? resultKeywordComparisonByBullyLevel?.labels : [],
              datasets: seriesData
            })
          }
          
      },[resultKeywordComparisonByBullyLevel]);

      const reportNo = '2.2.027';

    const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

    return (
        <Card>
          {loadingKeywordComparisonByBullyLevel && (
            <LinearProgress
              style={{ width: "100%" }}
            />
          )}
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader 
                    title='Percentage of Keyword Comparison By Bully Level'
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

export default KeywordComparisonByBullyLevel