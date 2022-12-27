import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { Grid } from '@mui/material'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import { Information } from 'mdi-material-ui'
import { StyledTooltip } from '../dashboard/overall'

interface Props{
  hour : any[]
  day : any[]
  chartId : string
}

const DayTimeBullyType = (props: Props) => {
  const {day, hour, chartId } = props;

  const [seriesHour, setSeriesHour ] = useState([{name: '', data:[]}]);
  const [seriesDays, setSeriesDays ] = useState([{name: '', data:[]}]);

    const options_hours : ApexOptions = {
        chart: {
          height: 200,
          type: 'heatmap',
          toolbar: { show: false }
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#548235"],
        xaxis: {
          categories: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00'],
        }
      };

      const options_type : ApexOptions = {
        chart: {
          height: 100,
          type: 'heatmap',
          toolbar: { show: false }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
        },
        colors: ["#548235"]
      };

      useEffect(() =>{
        if(day) {
          setSeriesDays(day);
        } 
        if (hour) {
          const hourValue:any[] = [];
          if(hour?.length> 0) {
            for(let i=0; i<hour?.length; i++ ) {
              hourValue.push({
                name: '',
                data: hour[i]?.data
              })
            }
          }
          setSeriesHour(hourValue);
        }
      }, [day, hour])

      return (
        <Card>
          <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <CardHeader title="Day&Time by Bully Type " titleTypographyProps={{ 'variant': 'h4' }}/>
              <StyledTooltip arrow title={chartId || ""}>
                  <Information style={{marginTop: '22px', fontSize: '29px'}} />
              </StyledTooltip>
          </span>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ReactApexcharts options={options_type} series={seriesDays} type="heatmap" height={220} />  
                    </Grid>
                    <Grid item xs={8}>
                        <ReactApexcharts options={options_hours} series={seriesHour} type="heatmap" height={220} />  
                    </Grid>
                </Grid>  
            </CardContent>
        </Card>
      )
}

export default DayTimeBullyType