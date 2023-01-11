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
import DailyMessageDetail from '../dashboard/DailyMessageDetail'
import { GetDayTimeByBullyLevel } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'

interface Props{
  chartId : string,
  params : any,
  highlight: boolean
}

const DayTimeBullyLevel = (props : Props) => {
    const { chartId, params, highlight } = props;

    const [seriesHour, setSeriesHour ] = useState([{name: '', data:[]}]);
    const [seriesDays, setSeriesDays ] = useState([{name: '', data:[]}]);
    const [ showDetail , setShowDetail ] = useState<boolean>(false);
    const { resultTimeByBullyLevel, resultDayByBullyLevel } = GetDayTimeByBullyLevel(params?.campaign, params?.date, params?.endDate, params?.period);

    const options_hours : ApexOptions = {
        chart: {
          height: 200,
          type: 'heatmap',
          toolbar: { show: false },
          events: {
            dataPointSelection: (event, chartContext, config) => {
              console.log(config.w.config.labels[config.dataPointIndex], "context", chartContext);
              setShowDetail(true);
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00'],
        },
        colors: ["#548235"]
      };

      const options_level : ApexOptions = {
        chart: {
          height: 100,
          type: 'heatmap',
          toolbar: { show: false },
          events: {
            dataPointSelection: (event, chartContext, config) => {
              console.log(config.w.config.labels[config.dataPointIndex], "context", chartContext);
              setShowDetail(true);
            }
          }
        },
        xaxis: {
          categories: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#548235"]
      };

      useEffect(() =>{
        if(resultTimeByBullyLevel) {
          setSeriesDays(resultTimeByBullyLevel);
        } 
        if (resultDayByBullyLevel) {
          const hourValue:any[] = [];
          if(resultDayByBullyLevel?.length> 0) {
            for(let i=0; i<resultDayByBullyLevel?.length; i++ ) {
              hourValue.push({
                name: '',
                data: resultDayByBullyLevel[i]?.data
              })
            }
          }
          setSeriesHour(hourValue);
        }
      }, [resultTimeByBullyLevel, resultDayByBullyLevel])

      return (
        <Card>
          <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <CardHeader title="Day&Time by Bully Level " titleTypographyProps={{ 'variant': 'h4',color: highlight ? 'green' : '#4c4e64de' }}/>
              <StyledTooltip arrow title={chartId || ""}>
                  <Information style={{marginTop: '22px', fontSize: '29px',color: highlight ? 'green' : '#4c4e64de'}} />
              </StyledTooltip>
          </span>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <ReactApexcharts options={options_level} series={seriesDays} type="heatmap" height={200} />  
                    </Grid>
                    <Grid item xs={8}>
                        <ReactApexcharts options={options_hours} series={seriesHour} type="heatmap" height={200} />  
                    </Grid>
                </Grid>  
                {
                  showDetail ? 
                  <DailyMessageDetail 
                      show={showDetail}
                      setShow={setShowDetail}
                      params = {params}

                      // keywordId = {keywordId}
                      // setKeywordId={setKeywordId}
                  /> : ""
                }
            </CardContent>
        </Card>
      )
}

export default DayTimeBullyLevel