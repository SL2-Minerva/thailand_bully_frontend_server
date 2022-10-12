import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const InfluencerGraph = () => {
    const series = [{
        name: 'Influencer 1',
        data: [13, 23, 20, 8, 13, 27, 33, 12]
      }, {
        name: 'Influencer 2',
        data: [11, 17, 15, 15, 21, 14, 15, 13]
      }, {
        name: 'Influencer 3',
        data: [30, 27, 25, 25, 24, 44, 65, 32]
      }, {
        name: 'Influencer 4',
        data: [44, 55, 41, 67, 22, 43, 21, 49]
      }, {
        name: 'Influencer 5',
        data: [23, 43, 40, 8, 30, 52, 32, 72]
      }
    ] ;

    const options : ApexOptions = {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          stackType: '100%'
        },
        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        xaxis: {
          categories: ['01/10/2022', '02/10/2022', '03/10/2022', '04/10/2022', '05/10/2022', '06/10/2022',
            '07/10/2022', '08/10/2022'
          ],
        },
        colors : ['#ed7d31', '#ffc000', '#5b9bd5', '#70ad47', '#c00000'],
        fill: {
          opacity: 1,
          colors : ['#ed7d31', '#ffc000', '#5b9bd5', '#70ad47', '#c00000']
        },
        legend : {
            position: 'top',
            itemMargin: {
                horizontal: 5,
                vertical: 0
            },
        }
      };

      return (
        <Card>
            <CardHeader 
                title='Number of Influencer'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <ReactApexcharts type='bar' options={options} series={series} height={350}/>
            </CardContent>
        </Card>
        
      )
}

export default InfluencerGraph