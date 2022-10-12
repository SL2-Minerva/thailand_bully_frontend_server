import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const DayTimeComparison = () => {

    const series = [{
        name: 'Mon.',
        data: [10,20,30,40,50,60,70,80,90,100,10,20,30,40,50,60,70,80,90,100,10,20,30,40]
      },
      {
        name: 'Tue.',
        data: [10,20,30,20,60,100,70,40,90,140,20,20,100,70,40,90,140,80,10,20,30,20,60,100]
      },
      {
        name: 'Wed.',
        data: [10,20,20,20,60,100,20,20,30,20,60,100,100,70,90,100,10,80,10,20,90,140,20,20]
      },
      {
        name: 'Thu.',
        data: [10,20,20,20,60,100,20,20,30,20,60,100,100,70,90,100,10,80,10,20,90,140,20,20]
      },
      {
        name: 'Fri.',
        data: [10,20,30,40,50,60,70,80,90,100,10,20,30,40,50,60,70,80,90,100,10,20,30,40]
      },
      {
        name: 'Sat.',
        data: [10,20,30,20,60,100,70,40,90,140,20,20,100,70,40,90,140,80,10,20,30,20,60,100]
      },
      {
        name: 'Sun.',
        data: [10,20,20,20,60,100,20,20,30,20,60,100,100,70,90,100,10,80,10,20,90,140,20,20]
      }
    ];

    const options : ApexOptions = {
        chart: {
          height: 350,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#548235"],
        title: {
          text: 'Day&Time'
        },
      };

      return (
        <Card>
            <CardHeader tilte="Day & Time " titleTypographyProps={{ varient: 'h4' }}/>
            <CardContent>
                <ReactApexcharts options={options} series={series} type="heatmap" height={350} />    
            </CardContent>
        </Card>
      )
}

export default DayTimeComparison