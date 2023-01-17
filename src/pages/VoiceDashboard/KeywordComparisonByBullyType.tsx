import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GetKeywordComparisonByBullyType } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'

const KeywordComparisonByBullyType = ({params, chartId, highlight} : {params: any, chartId:string, highlight?:boolean}) => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);
  const { resultKeywordComparisonByBullyType } = GetKeywordComparisonByBullyType(params?.campaign, params?.date, params?.endDate, params?.period);

  const options: ApexOptions = {
      chart: {
          height: 350,
          type: 'radar',
          dropShadow: {
            enabled: true,
            blur: 1,
            left: 1,
            top: 1
          },
          toolbar: {show: false}

        },
        stroke: {
          width: 2
        },
        fill: {
          opacity: 0
        },
        markers: {
          size: 0
        },
        xaxis: {
          categories: labels
        },
        colors: ["#787EFF", 'green', 'yellow', 'pink', 'purple', 'red']
      };
    
      useEffect(() => {
          if (resultKeywordComparisonByBullyType) {
            setLabels(resultKeywordComparisonByBullyType?.labels ? resultKeywordComparisonByBullyType?.labels : []);
            setSeries(resultKeywordComparisonByBullyType?.data ? resultKeywordComparisonByBullyType?.data : []);
          }
      },[resultKeywordComparisonByBullyType]);

      const reportNo = '2.2.028';

      const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";
    
    return (
        <Card>
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
                <ReactApexcharts type='radar' options={options} series={series} height={350}/>
            </CardContent>
        </Card>
    )
}

export default KeywordComparisonByBullyType