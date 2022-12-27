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

const KeywordComparisonByBullyType = ({resultKeywordComparisonByBullyType, chartId} : {resultKeywordComparisonByBullyType: any, chartId:string}) => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

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
            setLabels(resultKeywordComparisonByBullyType?.labels);
            setSeries(resultKeywordComparisonByBullyType?.data);
          }
      },[resultKeywordComparisonByBullyType]);
    
    return (
        <Card>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader 
                    title='Percentage of Keyword Comparison By Bully Type'
                    titleTypographyProps={{ variant: 'h6' }}
                />
                <StyledTooltip arrow title={chartId || ""}>
                    <Information style={{marginTop: '22px', fontSize: '29px'}} />
                </StyledTooltip>
            </span>
            <CardContent>
                <ReactApexcharts type='radar' options={options} series={series} height={350}/>
            </CardContent>
        </Card>
    )
}

export default KeywordComparisonByBullyType