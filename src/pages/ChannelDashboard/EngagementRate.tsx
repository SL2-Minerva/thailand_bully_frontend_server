import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { GraphicColors } from 'src/utils/const' 

interface Props {
  rateData: any
  type: string
}
export const getSeries = (seriesData: any) => {
  if(!seriesData) return [];
console.log('seriesdata', seriesData);
  let series : any[] = [];
  if (seriesData?.data) {
    const chartData = seriesData?.data;
    series = [
        {
            name: "current period",
            data: chartData?.current_period ? chartData?.current_period : []
        },
        {
            name: "previous period",
            data: chartData?.previous_period ? chartData?.previous_period : []
        },
    ]
  }

  return series;
}

export const getXaxisData = (seriesData: any) => {
  if(!seriesData) return [];

  let data : any[] = [];
  if (seriesData) {
      data = seriesData?.labels
  }

  return data;
}

const EngagementRate = ( props : Props) => {
    const {rateData, type} = props;
    const series = getSeries(rateData);

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
          categories: getXaxisData(rateData),
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
          {
            type === 'engagement' ?
            <CardHeader 
                title='Engagement Rate'
                titleTypographyProps={{ variant: 'h6' }}
            />
            :
            type === 'sentiment' ?
            <CardHeader 
                title='Sentiment Score'
                titleTypographyProps={{ variant: 'h6' }}
            />
            : ""
          }
            
            <CardContent>
                <ReactApexcharts type='bar' options={options} series={series} height={350}/>
            </CardContent>
        </Card>
        
      )
}

export default EngagementRate