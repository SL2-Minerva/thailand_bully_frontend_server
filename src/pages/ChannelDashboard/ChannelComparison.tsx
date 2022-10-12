import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const ChannelComparison = () => {
    
    const series = [ 44, 55, 41, 17, 15];
    const options: ApexOptions = {
        chart: {
        type: 'donut',
        },
        labels: ["Facebook", "Instagram", "Pantip", "Twitter", "Youtube"],
        colors : ['#3B5998', '#98B0E2', '#1041a9', '#bcbcbc', '#5b5b5b'],
        fill : {
            colors : ['#3B5998', '#98B0E2', '#1041a9', '#bcbcbc', '#5b5b5b'],
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
            <CardHeader title="Channels/Platforms" titleTypographyProps={{ varient:'h6' }}
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

export default ChannelComparison