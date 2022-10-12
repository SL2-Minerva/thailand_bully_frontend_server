import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const DayTimeBullyType = () => {
    const series_hour = [{
        name: '',
        data: [10,20,30,40,50,60,70,80,90,100,10,20,30,40,50,60,70,80,90,100,10,20,30,40]
      },
      {
        name: '',
        data: [10,20,30,20,60,100,70,40,90,140,20,20,100,70,40,90,140,80,10,20,30,20,60,100]
      },
      {
        name: '',
        data: [10,20,20,20,60,100,20,20,30,20,60,100,100,70,90,100,10,80,10,20,90,140,20,20]
      },
      {
        name: '',
        data: [10,20,30,40,50,60,70,80,90,100,10,20,30,40,50,60,70,80,90,100,10,20,30,40]
      },
      {
        name: '',
        data: [10,20,30,20,60,100,70,40,90,140,20,20,100,70,40,90,140,80,10,20,30,20,60,100]
      },
    ];

    const series_type = [{
        name: 'Hate Speech',
        data: [10,20,30,40,50,60,70]
      },
      {
        name: 'Exclusion',
        data: [10,20,30,20,60,100,70]
      },
      {
        name: 'Harassment',
        data: [10,20,20,20,60,100,20]
      },
      {
        name: 'Gossip',
        data: [10,20,30,20,60,100,74]
      },
      {
        name: 'No Bully',
        data: [10,20,30,20,60,100,70]
      },
    ];

    const options_hours : ApexOptions = {
        chart: {
          height: 200,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#548235"]
      };

      const options_type : ApexOptions = {
        chart: {
          height: 100,
          type: 'heatmap',
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#548235"]
      };

      return (
        <Card>
            <CardHeader title="Day&Time by Bully Type " titleTypographyProps={{ 'varient': 'h4' }}/>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ReactApexcharts options={options_type} series={series_type} type="heatmap" height={220} />  
                    </Grid>
                    <Grid item xs={8}>
                        <ReactApexcharts options={options_hours} series={series_hour} type="heatmap" height={220} />  
                    </Grid>
                </Grid>  
            </CardContent>
        </Card>
      )
}

export default DayTimeBullyType