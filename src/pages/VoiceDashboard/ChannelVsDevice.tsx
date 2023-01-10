import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import { GetDeviceVsChannel } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'

const ChannelVsDevice = ({params, chartId} : {params:any, chartId: string}) => {
  const { resultDeviceVsChannel } = GetDeviceVsChannel(params?.campaign, params?.date, params?.endDate, params?.period);

  const [seriesData, setSeriesData ] = useState([]);
  const [labels, setLabels] = useState([]);

    const series = [{
        data: seriesData
      }];
    const options: ApexOptions = {
        chart: {
        type: 'bar',
        toolbar: { show: false }
        },
        
        // labels: ["Anriod", "Web", "iPhone"],
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
            categories: labels,
            labels: {
              style: {
                colors: ['#3B5998', '#6aa84f', '#cc0000'],
                fontSize: '12px'
              }
            }
          }
        };

    useEffect(() => {
      if(resultDeviceVsChannel) {
        setSeriesData(resultDeviceVsChannel?.data);
        setLabels(resultDeviceVsChannel?.labels);
      }
    },[resultDeviceVsChannel])

    return ( 
        
        <Card style={{ height: 455 }}>
            <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <CardHeader title="Channel vs Devices" titleTypographyProps={{ varient:'h6' }}
                    subheader="Period over Period Comparison"
                    subheaderTypographyProps={{ varient: 'h6' }}
                />
                <StyledTooltip arrow title={chartId || ""}>
                    <Information style={{marginTop: '22px', fontSize: '29px'}} />
                </StyledTooltip>
            </span>
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