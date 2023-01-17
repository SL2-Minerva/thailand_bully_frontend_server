import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'
import DailyMessageDetail from '../dashboard/DailyMessageDetail'
import { GetDayTimeComparison } from 'src/services/api/dashboards/voice/VoiceDashboardAPIs'

const DayTimeComparison = ({params, chartId, highlight} : { params: any, chartId: string, highlight: boolean}) => {
  const { resultDayTimeComparison } = GetDayTimeComparison(params?.campaign, params?.date, params?.endDate, params?.period);
    const [series, setSeries] = useState([]) ;
    const [ showDetail , setShowDetail ] = useState<boolean>(false);
  
    const options : ApexOptions = {
        chart: {
          height: 350,
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
        colors: ["#548235"],
        xaxis: {
          categories: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00']
        },
        title: {
          text: ''
        },
      };

      useEffect(() => {
        if(resultDayTimeComparison) {
          setSeries(resultDayTimeComparison);
        }
      }, [resultDayTimeComparison])

      const reportNo = '2.2.016';

    const chartTitle = chartId + ", Report Level 2(" + reportNo + ")";

      return (
        <Card>
          <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <CardHeader title="Day&Time " titleTypographyProps={{ variant: 'h4',color: highlight ? 'green' : '#4c4e64de' }}/>
              <StyledTooltip arrow title={chartTitle || ""}>
                  <Information style={{marginTop: '22px', fontSize: '29px',color: highlight ? 'green' : '#4c4e64de'}} />
              </StyledTooltip>
          </span>
            <CardContent>
                <ReactApexcharts options={options} series={series} type="heatmap" height={350} /> 
                {
                  showDetail ? 
                  <DailyMessageDetail 
                      show={showDetail}
                      setShow={setShowDetail}
                      params = {params}
                      reportNo = {reportNo}
                      
                      // keywordId = {keywordId}
                      // setKeywordId={setKeywordId}
                  /> : ""
                }  
                
            </CardContent>
        </Card>
      )
}

export default DayTimeComparison