import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const DeviceComparison = () => {
    const series = [ 60, 20, 41];
    const options: ApexOptions = {
        chart: {
        type: 'donut',
        },
        labels: ["Anriod", "Web App", "iPhone"],
        colors : ['#3B5998', '#cc0000', '#6aa84f'],
        fill : {
            colors : ['#3B5998', '#cc0000', '#6aa84f'],
        },
        legend : {
            position: 'top',
            itemMargin: {
                horizontal: 5,
                vertical: 0
            },
        }
    }

    return ( 
        
        <Card>
            <CardHeader title="Devices" titleTypographyProps={{ varient:'h6' }}
                subheader="Period over Period Comparison"
                subheaderTypographyProps={{ varient: 'h6' }}
            />
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6} height={315}>
                         <ReactApexcharts type='donut' options={options} series={series} height={305}/>  
                         <p style={{ textAlign: 'center' }}>
                            Current Period
                         </p>
                    </Grid>
                    <Grid item xs={12} md={6}>
                         <ReactApexcharts type='donut' options={options} series={series} height={305}/>  
                         <p style={{ textAlign: 'center' }}>
                            Previous Period
                         </p>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        
    )
}

export default DeviceComparison