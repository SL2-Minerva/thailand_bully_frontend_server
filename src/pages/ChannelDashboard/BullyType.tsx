import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const BullyType = () => {
    const series = [{
        name: 'Bully Type',
        data: [55, 42, 33, 28, 2]
      }];
    
    const options: ApexOptions = {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#98d5e2"]
          }
        },
        fill : {
            colors: ["#98d5e2"]
        },
        
        xaxis: {
          categories: ["No Bully", "Gossip", "Harassment", "Exclusion", 'Hate'],
          position: 'bottom',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: true
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#98d5e2',
                colorTo: '#98d5e2',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        }
        
      }

      return (
        <Card>
            <CardHeader 
                title='Bulley Type'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <ReactApexcharts type='bar' options={options} series={series} height={350}/>
            </CardContent>
        </Card>
      )
}

export default BullyType