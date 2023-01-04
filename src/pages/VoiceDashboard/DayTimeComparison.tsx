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

const DayTimeComparison = ({dayTimeComparison, params, chartId} : {dayTimeComparison: any, params: any, chartId: string}) => {

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
        if(dayTimeComparison) {
          setSeries(dayTimeComparison);
        }
      }, [dayTimeComparison])

      return (
        <Card>
          <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <CardHeader title="Day&Time " titleTypographyProps={{ 'variant': 'h4' }}/>
              <StyledTooltip arrow title={chartId || ""}>
                  <Information style={{marginTop: '22px', fontSize: '29px'}} />
              </StyledTooltip>
          </span>
            <CardContent>
                <ReactApexcharts options={options} series={series} type="heatmap" height={350} />   
                <DailyMessageDetail 
                    show={showDetail}
                    setShow={setShowDetail}
                    params = {params}

                    // keywordId = {keywordId}
                    // setKeywordId={setKeywordId}
                /> 
            </CardContent>
        </Card>
      )
}

export default DayTimeComparison