import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const EngagementTransaction = () => {
    
    const series = [{
        name: 'Engagement 1',
        data: [44, 55, 41, 67, 22, 43, 21, 4]
      }, {
        name: 'Engagement 2',
        data: [13, 23, 20, 8, 13, 27, 33, 3]
      }, {
        name: 'Engagement 3',
        data: [11, 17, 15, 15, 21, 14, 15, 3]
      }, {
        name: 'Engagement 4',
        data: [44, 55, 41, 67, 22, 43, 21, 19]
      }, {
        name: 'Engagement 5',
        data: [13, 23, 20, 8, 13, 27, 33, 2]
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
        colors : ['#ed7d31', '#B6B623', '#23B6B6', '#23B66C', '#B62323'],
        fill: {
          opacity: 1,
          colors : ['#B66D23', '#B6B623', '#23B6B6', '#23B66C', '#B62323']
        },
        legend : {
            show: false
        }
      };

      return (
        <Card>
            <CardHeader 
                title='Engagement Tans.'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <ReactApexcharts type='bar' options={options} series={series} height={350}/>
            </CardContent>
        </Card>
        
      )
}

export default EngagementTransaction