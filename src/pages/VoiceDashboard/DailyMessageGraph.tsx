import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { GraphicColors } from 'src/utils/const' 
import { StyledTooltip } from '../dashboard/overall'
import { Information } from 'mdi-material-ui'

interface Props {
  dailyData: any
  type: string
  chartId : string
}
export const getSeries = (seriesData: any) => {
  if(!seriesData) return [];

  const series : any[] = [];
  if (seriesData && seriesData?.length>0) {
    for(let i= 0 ; i<seriesData?.length; i++) {
      series.push({
        name: seriesData[i].name,
        data: seriesData[i].data
      })
    }
  }

  return series;
}

export const getXaxisData = (seriesData: any) => {
  if(!seriesData) return [];

  let data : any[] = [];
  if (seriesData && seriesData?.length>0) {
      data = seriesData[0]?.date
  }

  return data;
}

const DailyMessageGraph = ( props : Props) => {
    const {dailyData, type, chartId} = props;
    const series = getSeries(dailyData);

    const options : ApexOptions = {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: { show: false }
        },
        dataLabels: { enabled: false },

        responsive: [{
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }],
        xaxis: {
          categories: getXaxisData(dailyData),
        },
        colors : GraphicColors,
        fill: {
          opacity: 1,
          colors : GraphicColors
        },
        legend : {
            position: 'top',
            itemMargin: {
                horizontal: 5,
                vertical: 0
            },
        }
      };

      return (
        <Card>
          <span style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {
              type === 'message' ?
              <CardHeader 
                  title='Daily Messages'
                  titleTypographyProps={{ variant: 'h6' }}
              />
              :
              type === 'channel' ?
              <CardHeader 
                  title='Daily Channel'
                  titleTypographyProps={{ variant: 'h6' }}
              />
              : ""
            }
            <StyledTooltip arrow title={chartId}>
                <Information  style={{marginTop: '22px', fontSize: '29px'}} />
            </StyledTooltip>
        </span>  
          <CardContent>
              <ReactApexcharts type='bar' options={options} series={series} height={350}/>
          </CardContent>
        </Card>
        
      )
}

export default DailyMessageGraph