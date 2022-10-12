import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const BullyLevel = () => {
    const series = [{
        name: 'Bully Level',
        data: [10, 20, 30, 40]
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
            colors: ["#a598e2"]
          }
        },
        fill : {
            colors: ["#a598e2"]
        },
        
        xaxis: {
          categories: ["Level 0", "Level 1", "Level 2", "Level 3"],
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
                colorFrom: '#a598e2',
                colorTo: '#CB889E',
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
                title='Bulley Level'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <ReactApexcharts type='bar' options={options} series={series} height={350}/>
            </CardContent>
        </Card>
      )
}

export default BullyLevel