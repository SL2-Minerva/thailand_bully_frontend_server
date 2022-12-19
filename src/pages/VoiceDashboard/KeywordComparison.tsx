import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'

const KeywordComparisonByChannel = ({resultKeywordComparisonByChannel} : {resultKeywordComparisonByChannel:any}) => {
    
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
            if (resultKeywordComparisonByChannel) {
              setLabels(resultKeywordComparisonByChannel?.labels);
              setSeries(resultKeywordComparisonByChannel?.data);
            }
        },[resultKeywordComparisonByChannel]);
    
    return (
        <Card>
            <CardHeader 
                title='Percentage of Keyword Comparison By Channel'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <ReactApexcharts type='radar' options={options} series={series} height={350}/>
            </CardContent>
        </Card>
    )
}

export default KeywordComparisonByChannel