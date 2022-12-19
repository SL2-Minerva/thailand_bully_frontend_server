import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { useEffect, useState } from 'react'

const DayTimeComparison = ({dayTimeComparison} : {dayTimeComparison: any}) => {

    const [series, setSeries] = useState([]) ;

    const options : ApexOptions = {
        chart: {
          height: 350,
          type: 'heatmap',
          toolbar: { show: false }
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#548235"],
        xaxis: {
          categories: ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00']
        },
        title: {
          text: 'Day&Time'
        },
      };

      useEffect(() => {
        if(dayTimeComparison) {
          setSeries(dayTimeComparison);
        }
      }, [dayTimeComparison])

      return (
        <Card>
            <CardHeader tilte="Day & Time " titleTypographyProps={{ varient: 'h4' }}/>
            <CardContent>
                <ReactApexcharts options={options} series={series} type="heatmap" height={350} />    
            </CardContent>
        </Card>
      )
}

export default DayTimeComparison