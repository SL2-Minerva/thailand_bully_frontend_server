import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const ChannelVsDevice = () => {
    const series = [{
        data: [ 44, 50, 6 ]
      }];
    const options: ApexOptions = {
        chart: {
        type: 'bar',
        },
        labels: ["Anriod", "Web", "iPhone"],
        colors : ['#3B5998', '#6aa84f', '#cc0000'],
        plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
        xaxis: {
            categories: [
              ['Andriod', 'Facebook'],
              ['iPhone', 'Twitter'],
              ['Web', 'Youtube'],
            ],
            labels: {
              style: {
                colors: ['#3B5998', '#6aa84f', '#cc0000'],
                fontSize: '12px'
              }
            }
          }
        };

    return ( 
        
        <Card>
            <CardHeader title="Devices" titleTypographyProps={{ varient:'h6' }}
                subheader="Period over Period Comparison"
                subheaderTypographyProps={{ varient: 'h6' }}
            />
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} height={315}>
                         <ReactApexcharts type='bar' options={options} series={series} height={305}/>  
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        
    )
}

export default ChannelVsDevice