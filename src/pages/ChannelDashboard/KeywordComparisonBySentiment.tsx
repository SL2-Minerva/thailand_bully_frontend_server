import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const KeywordComparisonBySentiment = () => {
    const series = [{
        name: 'Keyword 1',
        data: [80, 50, 100],
      }, {
        name: 'Keyword 2',
        data: [20, 40, 10]
      }, {
        name: 'Keyword 3',
        data: [44, 76, 45],
      }, {
        name: 'Keyword 4',
        data: [20, 30, 12],
      }, {
        name: 'Keyword 5',
        data: [45, 26, 30],
    }];

    const options: ApexOptions = {
        chart: {
            height: 350,
            type: 'radar',
            dropShadow: {
              enabled: true,
              blur: 1,
              left: 1,
              top: 1
            }
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
            categories: ['Positive', 'Negative', 'Neutral' ]
          }
        };
    
    return (
        <Card>
            <CardHeader 
                title='Percentage of Keyword Comparison By Sentiment'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <ReactApexcharts type='radar' options={options} series={series} height={350}/>
            </CardContent>
        </Card>
    )
}

export default KeywordComparisonBySentiment