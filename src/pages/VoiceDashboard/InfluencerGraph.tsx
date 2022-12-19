import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { getSeries, getXaxisData } from './DailyMessageGraph'

const InfluencerGraph = ({numberOfAccounts}: {numberOfAccounts: any}) => {
    const series = getSeries(numberOfAccounts);

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
          categories: getXaxisData(numberOfAccounts),
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
                title='Number of Accounts'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <ReactApexcharts type='bar' options={options} series={series} height={350}/>
            </CardContent>
        </Card>
        
      )
}

export default InfluencerGraph