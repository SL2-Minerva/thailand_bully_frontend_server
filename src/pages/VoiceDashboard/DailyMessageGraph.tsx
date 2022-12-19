import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

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

const DailyMessageGraph = ({dailyMessages}: {dailyMessages: any}) => {
    
    const series = getSeries(dailyMessages);

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
          categories: getXaxisData(dailyMessages),
        },
        colors : ['#ed7d31', '#ffc000', '#5b9bd5', '#70ad47', '#c00000'],
        fill: {
          opacity: 1,
          colors : ['#ed7d31', '#ffc000', '#5b9bd5', '#70ad47', '#c00000']
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
            <CardHeader 
                title='Daily Messages'
                titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent>
                <ReactApexcharts type='bar' options={options} series={series} height={350}/>
            </CardContent>
        </Card>
        
      )
}

export default DailyMessageGraph