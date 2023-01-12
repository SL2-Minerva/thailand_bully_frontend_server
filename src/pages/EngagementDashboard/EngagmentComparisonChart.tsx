import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { GetComparisonEngagement } from 'src/services/api/dashboards/engagement/EngagementApi'


const Labels = (data: any) => {
  if(!data) {
    return [];
  }
  const labels : any[] = []
  if(data?.length > 0) {
    for(let i=0; i<data?.length; i++) {
      labels.push(data[i].keyword_name);
    }
  }

  return labels;
}

const ChartDataEngagement = (data: any, type : string) => {
  if(!data) {
    return [];
  }
  const value : any[] = []
  if(data?.length > 0) {
    if(type === 'share') {
      for(let i=0; i<data?.length; i++) {
        value.push(data[i].share);
      }
    } else if(type==='comment') {
      for(let i=0; i<data?.length; i++) {
        value.push(data[i].comment);
      }
    } else if (type === 'reaction') {
      for(let i=0; i<data?.length; i++) {
        value.push(data[i].reaction);
      }
    }

  }

  return value;
}

const EngagmentComparisonChart = ({params, highlight} : {params: any, highlight:boolean}) => {
  const { resultComparison }  = GetComparisonEngagement(params?.campaign, params?.date, params?.endDate, params?.period);
  
  const chartLabels =  Labels(resultComparison);
  const shareData = ChartDataEngagement(resultComparison, 'share');
  const commentData = ChartDataEngagement(resultComparison, 'comment');
  const reactionData = ChartDataEngagement(resultComparison, 'reaction');


  const series =  [{
    name: 'Share',
    data: shareData
  }, {
    name: 'Comment',
    data: commentData
  }, {
    name: 'Reaction',
    data: reactionData
  }]

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      stackType: '100%',
      toolbar: {show: false}
    },
    dataLabels: { enabled: false },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: ''
    },
    colors: ['#c46627','#ed7d31','#f4b9a4'],
    xaxis: {
      categories: chartLabels,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + "K"
        }
      }
    },
    fill: {
      opacity: 1,
      colors: ['#c46627','#ed7d31','#f4b9a4'],
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  }

  return (
    <Card>
        <CardHeader
                title=''
                titleTypographyProps={{ variant: 'h6', color: highlight ? 'green' : '#4c4e64de' }}
        />
        <CardContent>
            <ReactApexcharts type="bar" height={486} series={series} options={options} />
        </CardContent>
    </Card>
  )
}

export default EngagmentComparisonChart