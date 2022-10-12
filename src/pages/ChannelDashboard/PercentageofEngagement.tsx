import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const PercentageOfEngagement = () => {

    const series = [ 44, 55, 41, 17, 15];
    const options: ApexOptions = {
        chart: {
        type: 'donut',
        },
        labels: ["Engagement 1", "Engagement 2", "Engagement 3", "Engagement 4", "Engagement 5"],
        colors : ['#ed7d31', '#ffc000', '#5b9bd5', '#70ad47', '#c00000'],
        fill : {
            colors : ['#ed7d31', '#ffc000', '#5b9bd5', '#70ad47', '#c00000'],
        },
        legend : {
           show: false
        }
    }

    return ( 
        
        <Card>
            <CardHeader title="Percentage of Engagement Trans." titleTypographyProps={{ varient:'h6' }}
                subheader="Period over Period Comparison"
                subheaderTypographyProps={{ varient: 'h6' }}
            />
            <CardContent>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6} >
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

export default PercentageOfEngagement