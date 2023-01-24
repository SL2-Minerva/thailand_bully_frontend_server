import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GetKeywordComparisonByBullyType } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'

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
import { BullyDashboardColors } from 'src/utils/const'
import { LinearProgress } from '@mui/material'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const datasets : any [] = [];
export const initValue = {
  labels: [],
  datasets: datasets
}

export const getChartData = (data: any) => {
  if(!data) return [];
  
  const seriesData : any[] = [];

  if(data) {
    for (let i=0; i<data?.length; i++) {
      seriesData.push({
        label: data[i].keyword_name || "",
        data: data[i].data || [],
        backgroundColor: 'rgba(0,0,0,0.01)',
        borderColor: BullyDashboardColors[i],
        borderWidth: 1,
      },);
    }
  }
  
  return seriesData;
}

const KeywordComparisonByBullyType = ({params, chartId, highlight} : {params: any, chartId:string, highlight?:boolean}) => {
  const [ charData, setChartData ] = useState(initValue);
  const { resultKeywordComparisonByBullyType, loadingKeywordComparisonByBullyType } = GetKeywordComparisonByBullyType(params?.campaign, params?.date, params?.endDate, params?.period, params?.keywordIds);

  useEffect(() => {
      if (resultKeywordComparisonByBullyType) {
        const seriesData = getChartData(resultKeywordComparisonByBullyType?.value);
        setChartData({
          labels: resultKeywordComparisonByBullyType?.labels ? resultKeywordComparisonByBullyType?.labels : [],
          datasets: seriesData
        })
      }
      
  },[resultKeywordComparisonByBullyType]);

  const reportNo = '2.2.028';

  const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";
    
    return (
        <Card>
          {loadingKeywordComparisonByBullyType && (
            <LinearProgress
              style={{ width: "100%" }}
            />
          )}
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader 
                    title='Percentage of Keyword Comparison By Bully Type'
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

export default KeywordComparisonByBullyType