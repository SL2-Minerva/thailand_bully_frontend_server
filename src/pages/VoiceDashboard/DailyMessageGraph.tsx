import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const DailyMessageGraph = () => {
    
    const series = [{
        name: 'Keyword 1',
        data: [44, 55, 41, 67, 22, 43, 21, 49]
      }, {
        name: 'Keyword 2',
        data: [13, 23, 20, 8, 13, 27, 33, 12]
      }, {
        name: 'Keyword 3',
        data: [11, 17, 15, 15, 21, 14, 15, 13]
      }, {
        name: 'Keyword 4',
        data: [44, 55, 41, 67, 22, 43, 21, 49]
      }, {
        name: 'Keyword 5',
        data: [13, 23, 20, 8, 13, 27, 33, 12]
      }
    ] ;

    const options : ApexOptions = {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: { show: false }
        },
        dataLabels: { enabled: false },

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
                title='Daily Messages'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <ReactApexcharts type='bar' options={options} series={series} height={350}/>
            </CardContent>
        </Card>
        
      )
}

export default DailyMessageGraph